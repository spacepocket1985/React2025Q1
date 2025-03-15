import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import styles from '../styles/uiFormInput.module.css';

type UiFormInputProps<T extends FieldValues> = {
  controlType: 'input' | 'select' | 'autocomplete'; // Добавили новый тип 'autocomplete'
  type?: React.HTMLInputTypeAttribute;
  name: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  placeholder?: string;
  options?: Array<string>;
  error: string | null;
};

export const UIFormInput = <T extends FieldValues>({
  controlType,
  type,
  name,
  register,
  required,
  placeholder,
  options = [],
  error = '',
}: UiFormInputProps<T>): JSX.Element => {
  return (
    <label htmlFor={name}>
      {controlType === 'input' && (
        <input
          id={name}
          type={type}
          autoComplete={type === 'password' ? 'on' : 'off'}
          className={`${error ? 'isInvalid' : ''}`}
          {...register(name, { required })}
          placeholder={placeholder}
        />
      )}

      {controlType === 'select' && (
        <div className={styles.selectWrapper}>
          <span>{`Select ${name}`}</span>
          <select
            autoComplete="on"
            id={name}
            className={`inputStyle ${error ? 'isInvalid' : ''}`}
            {...register(name, { required })}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {controlType === 'autocomplete' && (
        <div className={styles.selectWrapper}>
          <span>{`Select ${name}`}</span>
          <input
            id={name}
            list={`${name}-list`}
            autoComplete="off"
            className={`inputStyle ${error ? 'isInvalid' : ''}`}
            {...register(name, { required })}
            placeholder={placeholder}
          />
          <datalist id={`${name}-list`}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </datalist>
        </div>
      )}

      <div className={styles.invalidFeedback}>{error}</div>
    </label>
  );
};
