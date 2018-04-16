import i18n from '@i18n/index';
import * as React from 'react';

import './error.scss';

interface ErrorProps {
  retry?: () => void;
  error: Error;
}

const Error: React.SFC<ErrorProps> = ({ error, retry }) => {
  return (
    <div className="error">
      {`${i18n.errorMessage}: ${(error && error.message) || i18n.unknowError}`}
      {retry && (
        <span className="retry" onClick={retry}>
          {i18n.retry}
        </span>
      )}
    </div>
  );
};

export default Error;
