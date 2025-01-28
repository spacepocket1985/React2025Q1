import { useState } from 'react';

export const ErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  const onClickError = (): void => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Ooppps! We have some problems!');
  }
  return (
    <button className="errorButton" onClick={onClickError}>
      Get an Error
    </button>
  );
};
