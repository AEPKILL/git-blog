import i18n from '@i18n/index';
import * as React from 'react';

import './error.scss';

interface ErrorProps {
  retry?: () => void;
  retryText?: string | JSX.Element | React.ReactNode;
  error: Error;
}

const Error: React.SFC<ErrorProps> = ({
  error,
  retry,
  retryText = i18n.retry
}) => {
  return (
    <div className="error">
      {`${i18n.errorMessage}: ${(error && error.message) || i18n.unknowError}`}
      {
        <span className="retry" onClick={retry}>
          {retryText}
        </span>
      }
    </div>
  );
};

export default Error;
