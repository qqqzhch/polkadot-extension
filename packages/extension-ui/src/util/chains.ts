// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MetadataDefBase } from '@polkadot/extension-inject/types';

import { selectableNetworks } from '@polkadot/networks';
console.log('selectableNetworks',selectableNetworks)
console.log('selectableNetworks',JSON.stringify(selectableNetworks[selectableNetworks.length-1]))

//https://github.com/paritytech/ss58-registry/blob/HEAD/ss58-registry.json
/***
 * {
	"prefix": 55,
	"network": "xxnetwork",
	"displayName": "xx network",
	"symbols": ["XX"],
	"decimals": [9],
	"standardAccount": "*25519",
	"website": "https://xx.network",
	"slip44": 1955,
	"hasLedgerSupport": true,
	"genesisHash": ["0x50dd5d206917bf10502c68fb4d18a59fc8aa31586f4e8856b493e43544aa82aa"],
	"icon": "substrate",
	"isTestnet": false,
	"isIgnored": false
}
*/

//add manta network  to selectableNetworks
selectableNetworks.push({
	"prefix": 42,
	"network": "Dolphin",
	"displayName": "Dolphin",
	"symbols": ["DOL"],
	"decimals": [9],
	"standardAccount": "Sr25519",
	"website": "https://www.manta.network/",
	"slip44": 1955,
	"hasLedgerSupport": false,
	"genesisHash": ["0x50dd5d206917bf10502c68fb4d18a59fc8aa31586f4e8856b493e43544aa82ab"], //Need to be replaced with real genesisHash
	"icon": "substrate",
	"isTestnet": true,
	"isIgnored": false
})
const hashes: MetadataDefBase[] = selectableNetworks
  .filter(({ genesisHash }) => !!genesisHash.length)
  .map((network) => ({
    chain: network.displayName,
    genesisHash: network.genesisHash[0],
    icon: network.icon,
    ss58Format: network.prefix
  }));

export default hashes;
