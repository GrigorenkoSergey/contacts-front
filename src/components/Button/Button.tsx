import React from 'react';
import { cn } from '../../utils';
import s from './Button.module.css';

type Props = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'submit' | 'button' | 'reset'
  disabled?: boolean
  pressed?: boolean
};

export function Button(x: Props) {
  return (
    <button type={x.type ?? 'button'}
            disabled={x.disabled}
            className={cn(
              s.button, s.themePrimary,
              x.pressed && s.themePrimaryPressed,
              x.className)}
            onClick={x.onClick}>
      { x.children }
    </button>
  );
}
