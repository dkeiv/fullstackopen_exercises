import { useState, FormEvent } from 'react';

const useField = (type: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export default useField;
