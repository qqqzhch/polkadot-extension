// Copyright 2019-2023 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringPair } from '@polkadot/keyring/types';

import BN from 'bn.js';

import { ApiPromise, WsProvider } from '@polkadot/api';

import { sendMessage } from '../../page/index';
import { RequestTransactionSend } from '../types';

interface pro {
  from: string;
  to: string;
  amount: string;
  api: ApiPromise;
  keypair: KeyringPair
}

export default async function ({ amount, api, from, keypair, to }: pro): Promise<string> {
  if (!api?.isConnected) {
    return '';
  }

  const tx = api.tx.balances.transfer(to, amount);
  const signedBlock = await api.rpc.chain.getBlock();
  const currentHeight = signedBlock.block.header.number;
  const era = api.createType('ExtrinsicEra', { current: currentHeight, period: 10 });
  const blockHash = signedBlock.block.header.hash;

  const genesisHash = api.genesisHash;
  const specVersion = api.runtimeVersion.specVersion;

  const { nonce } = await api.query.system.account(from);
  // const { nonce,data: balance } = await api.query.system.account(newPair.address);

  const signer = api.createType('SignerPayload', {
    blockHash: api.genesisHash,
    genesisHash: api.genesisHash,
    method: tx,
    nonce: nonce as string,
    runtimeVersion: api.runtimeVersion,
    version: api.extrinsicVersion
  });

  // serialize, assuming we are taking it somewhere else
  const { signature } = api.createType('ExtrinsicPayload', signer.toPayload(),
    { version: api.extrinsicVersion }).sign(keypair);

  tx.addSignature(keypair.address, signature, signer.toPayload());
  let txhash = '';

  try {
    const hash = await tx.send();

    txhash = hash.toHex();
  } catch (error) {
    console.error(error);
  }

  return txhash;
}
