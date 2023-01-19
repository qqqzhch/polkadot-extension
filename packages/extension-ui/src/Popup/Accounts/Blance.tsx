// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountJson } from '@polkadot/extension-base/background/types';

import BN from 'bn.js';
import { MantaUtilities } from 'manta.js-kg-dev/dist/index.js';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';
import { canDerive } from '@polkadot/extension-base/utils';
import { ThemeProps } from '@polkadot/extension-ui/types';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import useBlance from '../../hooks/useBlance';
import AssetType from '../../types/AssetType';
import Balance from '../../types/Balance';

interface Props extends AccountJson {
  className?: string;
  parentName?: string;
}

function Blance ({ address, children, className }: Props): React.ReactElement<Props> {
  // need chain name
  const accountblance = useBlance({ address });

  return (<div
    className='accountBlance'
    style={{ marginLeft: 70 }}
  >
    {accountblance ? accountblance.toDisplayString() : 'loading'}
  </div>);
}

export default styled(Blance)(({ theme }: ThemeProps) => `
 // todo why not work 
  .accountBlance {
    margin-left: 50px;
  }

`);
