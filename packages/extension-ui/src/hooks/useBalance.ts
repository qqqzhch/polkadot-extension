// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ApiPromise, WsProvider } from '@polkadot/api';

import { getApipromise, getBalance } from '../messaging';
import AssetType from '../types/AssetType';
import Balance from '../types/Balance';

// wss://ws.calamari.seabird.systems
// wss://ws.calamari.systems

interface Props {
  address: string;

}

export default function useBlance ({ address }: Props): string|null {
  const [accountblance, setaccountblance] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-empty-function

    const getuserinfo = async () => {
      console.log('getuserinfo');

      const data = await getBalance(address);

      // eslint-disable-next-line  @typescript-eslint/no-unsafe-argument
      setaccountblance(data.free);
    };

    // eslint-disable-next-line  @typescript-eslint/no-floating-promises
    getuserinfo();
    const Intervalflag = setInterval(() => {
      // eslint-disable-next-line  @typescript-eslint/no-floating-promises
      getuserinfo();
    }, 1000 * 10);

    return () => {
      clearInterval(Intervalflag);
    };
  }, [address]);

  return accountblance;
}
