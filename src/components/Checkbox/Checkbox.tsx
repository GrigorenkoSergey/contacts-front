import React from 'react';
import { cn } from '../../utils';
import s from './Checkbox.module.scss';

type Props = {
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
};

export const Checkbox = (x: Props) => {
  return (
    <label className={cn(s.className, s.checkbox)}>
      <input type="checkbox"
             className={s.checkboxInput}
             checked={x.checked}
             onChange={x.onChange} />
      <span className={s.checkboxToggler} tabIndex={0}></span>
    </label>
  );
};
