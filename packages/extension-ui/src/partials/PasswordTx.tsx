// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { InputWithLabel, ValidatedInput } from '../components';
import useTranslation from '../hooks/useTranslation';
import { allOf, isNotShorterThan, isSameAs, Validator } from '../util/validators';

interface Props {
  isFocussed?: boolean;
  onChange: (password: string | null) => void;
}

const MIN_LENGTH = 6;

export default function Password ({ isFocussed, onChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [pass1, setPass1] = useState<string | null>(null);
  const [pass2, setPass2] = useState<string | null>(null);
  const isFirstPasswordValid = useMemo(() => isNotShorterThan(MIN_LENGTH, t<string>('Password is too short')), [t]);
  const isSecondPasswordValid = useCallback((firstPassword: string): Validator<string> => allOf(
    isNotShorterThan(MIN_LENGTH, t<string>('Password is too short')),
    isSameAs(firstPassword, t<string>('Passwords do not match'))
  ), [t]);

  useEffect((): void => {
    onChange(pass1);
  }, [onChange, pass1]);

  return (
    <>
      <ValidatedInput
        component={InputWithLabel}
        data-input-password
        isFocused={isFocussed}
        label={t<string>('password')}
        onValidatedChange={setPass1}
        type='password'
        validator={isFirstPasswordValid}
      />
    </>
  );
}
