// Copyright 2019-2023 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../types';

import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { ActionContext, ActionText } from '../components';
import Header from './Header';

interface Props extends ThemeProps {
  className?: string;
  step: number;
  text: string;
}

function HeaderWithback ({ className, text }: Props): React.ReactElement<Props> {
  const onAction = useContext(ActionContext);

  const _onBack = useCallback(() => {
    onAction('/');
  }, [onAction]);

  return (
    <Header
      className={className}
      text={text}
    >
      <div className='steps'>
        <ActionText
          onClick={_onBack}
          text='Back'
        />
      </div>
    </Header>
  );
}

export default React.memo(styled(HeaderWithback)(({ theme }: Props) => `
  .current {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    color: ${theme.primaryColor};
  }

  .steps {
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    padding-left: 1em;
    padding-right: 24px;
    margin-top: 3px;
  }

  .total {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    color: ${theme.textColor};
  }
`));
