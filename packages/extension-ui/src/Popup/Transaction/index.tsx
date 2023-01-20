// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { AccountWithChildren } from '@polkadot/extension-base/background/types';
import { enable, handleResponse, redirectIfPhishing } from '@polkadot/extension-base/page';
import { Null } from '@polkadot/types';

import { AccountContext, ActionContext, Address, Dropdown, Loading } from '../../components';
import Filltransaction from '../../components/Filltransaction';
import useGenesisHashOptions from '../../hooks/useGenesisHashOptions';
import useMetadata from '../../hooks/useMetadata';
import useTranslation from '../../hooks/useTranslation';
import { createAccountSuri, createSeed, transactionSend, validateSeed } from '../../messaging';
import { HeaderWithback } from '../../partials';
import AssetType from '../../types/AssetType';
import { DEFAULT_TYPE } from '../../util/defaultType';

interface Props {
  className?: string;
}
interface DropdownData {
  text: string;
  value: string
}

function SendTransaction ({ className }: Props): React.ReactElement {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<null | string>(null);
  const [seed, setSeed] = useState<null | string>(null);
  const [type, setType] = useState(DEFAULT_TYPE);
  const [name, setName] = useState('');
  const [amounts, setAmounts] = useState('');
  const options = useGenesisHashOptions();
  const [genesisHash, setGenesis] = useState('');
  const chain = useMetadata(genesisHash, true);

  const [filteredAccount, setFilteredAccount] = useState<DropdownData[]>([]);
  const { hierarchy } = useContext(AccountContext);
  const urlinfo = useParams<{account: string}>();

  const [toAddress, setToAddress] = useState<string>('');

  console.log('urlinfo', urlinfo);
  console.log('setToAddress', toAddress);

  useEffect(() => {
    console.log('hierarchy', hierarchy);
    const accountList = hierarchy.map(({ address, name }) => {
      return {
        text: name,
        value: address
      } as DropdownData;
    });

    setFilteredAccount(accountList);
    setToAddress(accountList[0].value);
  }, [hierarchy]);

  useEffect((): void => {
    if (seed) {
      const type = chain && chain.definition.chainType === 'ethereum'
        ? 'ethereum'
        : DEFAULT_TYPE;

      setType(type);
    }
  }, [seed, chain]);

  const _onCreate = useCallback(
    async (amount: string|null, password: string|null): Promise<void> => {
      // this should always be the case
      console.log('_onCreate', name, password);
      const sender = urlinfo?.account;

      console.log('_onCreate data', sender, toAddress, amount, password);

      const bigAmount = new BN(amount as string);
      const num = bigAmount.mul(new BN(10e11)).toString();

      const txhash = await transactionSend(sender, toAddress, num, password as string);

      console.log(txhash);

      if (txhash?.length > 0) {
        alert('Transaction sent successfully:' + txhash);
      }
    },
    [toAddress, name, urlinfo?.account]
  );

  const _onNextStep = useCallback(
    () => setStep((step) => step + 1),
    []
  );

  const _onPreviousStep = useCallback(
    () => setStep((step) => step - 1),
    []
  );

  const _onChangeAccount = useCallback(
    (account: string) => {
      console.log('account', account);
      setToAddress(account);
    },
    []
  );

  return (
    <>
      <HeaderWithback
        text={t<string>('Send transaction')}
      />
      <Loading>
        <div>
          <Address
            address={urlinfo?.account}
            genesisHash={genesisHash}
          />
        </div>
        <>
          <Dropdown
            className={className}
            label={t<string>('Recipient')}
            onChange={_onChangeAccount}
            options={filteredAccount}
            value={toAddress}
          />
          <Filltransaction
            address={urlinfo?.account}
            buttonLabel={t<string>('Send')}
            isBusy={isBusy}
            onAmountChange={setAmounts}
            onBackClick={_onPreviousStep}
            onCreate={_onCreate}
          />
        </>
      </Loading>
    </>
  );
}

export default styled(SendTransaction)`
  margin-bottom: 16px;

  label::after {
    right: 36px;
  }
`;
