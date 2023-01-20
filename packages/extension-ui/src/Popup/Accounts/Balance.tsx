// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountJson } from '@polkadot/extension-base/background/types';

import Bignumber from 'bignumber.js';
import BN from 'bn.js';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { canDerive } from '@polkadot/extension-base/utils';
import { ThemeProps } from '@polkadot/extension-ui/types';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import useBalance from '../../hooks/useBalance';
import AssetType from '../../types/AssetType';
import Balance from '../../types/Balance';
import display from '../../util/display';

interface Props extends AccountJson {
  className?: string;
  parentName?: string;
}

function Blance ({ address, children, className }: Props): React.ReactElement<Props> {
  // need chain name
  const accountbalance = useBalance({ address });

  return (<div
    className='accountBalance'
    style={{ marginLeft: 70 }}
  >
    <span
      className='balance'
      style={{ display: 'inline-block', width: 300 }}
    >
      {accountbalance !== undefined ? display(accountbalance) : 'loading'}
    </span>
    <span
      className='send'
      style={{ marginLeft: 5 }}
    >
    send
    </span>

  </div>);
}

export default styled(Blance)(({ theme }: ThemeProps) => `
 // todo why not work 
  .accountBalance {
    margin-left: 50px;
  }
  .balance{
    display: inline-block;
    width: 100px;
  }
  .send{
    display: inline-block;
    width: 100px;
  }

`);
