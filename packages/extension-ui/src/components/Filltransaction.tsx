// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';

import { Amount, PasswordTx } from '../partials';
import { BackButton, ButtonArea, NextStepButton, VerticalSpace } from '.';

interface Props {
  buttonLabel?: string;
  isBusy: boolean;
  onBackClick?: () => void;
  onCreate: (name: string|null, password: string|null) => void | Promise<void | boolean>;
  onAmountChange: (name: string) => void;
  onPasswordChange?: (password: string) => void;
}

function Filltransaction ({ buttonLabel, isBusy, onAmountChange, onBackClick, onCreate, onPasswordChange }: Props): React.ReactElement<Props> {
  const [amount, setAmount] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const _onCreate = useCallback(
    () => onCreate(amount, password),
    [amount, password, onCreate]
  );

  const _onAmountChange = useCallback(
    (amount: string | null) => {
      console.log('amount', amount);
      onAmountChange(amount || '');
      setAmount(amount);
    },
    [onAmountChange]
  );

  const _onPasswordChange = useCallback(
    (password: string | null) => {
      console.log('password', password);
      onPasswordChange && onPasswordChange(password || '');
      setPassword(password);
    },
    [onPasswordChange]
  );

  const _onBackClick = useCallback(
    () => {
      _onAmountChange(null);
      setPassword(null);
      onBackClick && onBackClick();
    },
    [_onAmountChange, onBackClick]
  );

  return (
    <>
      <Amount
        isFocused
        onChange={_onAmountChange}
      />
      <PasswordTx
        onChange={_onPasswordChange}
      ></PasswordTx>
      <VerticalSpace />
      {onBackClick && buttonLabel && (
        <ButtonArea>
          <BackButton onClick={_onBackClick} />
          <NextStepButton
            data-button-action='add new root'
            isBusy={isBusy}
            onClick={_onCreate}
          >
            {buttonLabel}
          </NextStepButton>
        </ButtonArea>
      )}
    </>
  );
}

export default React.memo(Filltransaction);
