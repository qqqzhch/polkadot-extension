// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import { MantaUtilities } from 'manta.js-kg-dev/dist/index.js';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ApiPromise, WsProvider } from '@polkadot/api';

import AssetType from '../types/AssetType';
import Balance from '../types/Balance';

// wss://ws.calamari.seabird.systems
// wss://ws.calamari.systems

const wsProvider = new WsProvider('wss://ws.calamari.seabird.systems');
const assetType: AssetType = {
  assetId: 1,
  baseName: 'Dolphin',
  baseTicker: 'DOL',
  coingeckoId: 'dolphin',
  existentialDeposit: new BN('174876e800', 16),
  icon: '/static/media/dolphin.5c3361ea.svg',
  isNativeToken: true,
  isPrivate: false,
  logicalTicker: 'KMA',
  name: 'Test Dolphin',
  numberOfDecimals: 12,
  publicExistentialDeposit: new BN('174876e800', 16),
  ticker: 'DOL'
};

const fetchPublicBalance = async (address: string, assetType: AssetType, api: ApiPromise) => {
  if (!api?.isConnected || !address || !assetType) {
    return null;
  }

  const balanceRaw = await MantaUtilities.getPublicBalance(
    api, new BN(assetType.assetId), address
  );
  const balance = balanceRaw ? new Balance(assetType, balanceRaw) : null;

  return balance;
};

interface Props {
  address: string;

}

export default function useBlance ({ address }: Props): Balance|null {
  const [accountblance, setaccountblance] = useState<Balance | null>(null);

  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-empty-function
    let unsubscribe: () => void = function () {};

    const getBalance = async () => {
      const api = await ApiPromise.create({ provider: wsProvider });

      const fetchBalance = async () => {
        const data = await fetchPublicBalance(address, assetType, api);

        setaccountblance(data);
        console.log('blance', data);
      };

      // eslint-disable-next-line  @typescript-eslint/no-floating-promises
      fetchBalance();
      unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
        // eslint-disable-next-line  @typescript-eslint/no-floating-promises
        fetchBalance();
      });
    };

    // eslint-disable-next-line  @typescript-eslint/no-floating-promises
    getBalance();

    return () => {
      unsubscribe();
    };
  }, [address]);

  return accountblance;
}
