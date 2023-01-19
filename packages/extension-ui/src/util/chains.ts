// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MetadataDefBase } from '@polkadot/extension-inject/types';

import { selectableNetworks } from '@polkadot/networks';

// https://github.com/paritytech/ss58-registry/blob/HEAD/ss58-registry.json

// add manta network  to selectableNetworks
const selectableNetworksNew = selectableNetworks.concat({
  decimals: [9],
  displayName: 'Dolphin',
  genesisHash: ['0x79372c8ed25b51c0d3c1f085becb264c93f1ecbc71dcf387fdb5c294fd823a08'], // Need to be replaced with real genesisHash
  hasLedgerSupport: false,
  icon: 'substrate',
  isIgnored: false,
  isTestnet: true,
  network: 'Dolphin',
  prefix: 42,
  slip44: 1955,
  standardAccount: 'Sr25519',
  symbols: ['DOL'],
  website: 'https://www.manta.network/'

});
const hashes: MetadataDefBase[] = selectableNetworksNew
  .filter(({ genesisHash }) => !!genesisHash.length)
  .map((network) => ({
    chain: network.displayName,
    genesisHash: network.genesisHash[0],
    icon: network.icon,
    ss58Format: network.prefix
  }));

export default hashes;
