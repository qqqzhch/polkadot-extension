// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useMemo } from 'react';

import { AccountContext, InputWithLabel, ValidatedInput } from '../components';
import useTranslation from '../hooks/useTranslation';
import { isNumberGreaterThan0AndLessThan } from '../util/validators';

interface Props {
  address?: string;
  className?: string;
  isFocused?: boolean;
  label?: string;
  onBlur?: () => void;
  onChange: (name: string | null) => void;
  value?: string | null;
}

export default function Amount ({ address, className, isFocused, label, onBlur, onChange, value }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { accounts } = useContext(AccountContext);
  const isNumberValid = useMemo(() => isNumberGreaterThan0AndLessThan(30000000, t<string>('Please enter the correct amount')), [t]);

  const account = accounts.find((account) => account.address === address);
  const startValue = '';

  return (
    <ValidatedInput
      className={className}
      component={InputWithLabel}
      data-input-name
      defaultValue={startValue}
      isFocused={isFocused}
      label={label || t<string>('Amount')}
      onBlur={onBlur}
      onEnter={onBlur}
      onValidatedChange={onChange}
      type='text'
      validator={isNumberValid}
    />
  );
}
