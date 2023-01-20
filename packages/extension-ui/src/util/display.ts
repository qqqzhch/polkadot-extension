// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Bignumber from 'bignumber.js';

export default function display (amount: string) {
  console.log('display1');
  const bigAmount = new Bignumber(amount);
  const num = bigAmount.div(new Bignumber(10e11));

  return num.toFixed(6) + ' Dol';
}
