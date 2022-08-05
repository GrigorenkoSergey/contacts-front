import { isString } from './isString';

export function cn(...args: unknown[]) {
  return args.filter(isString)
    .map(c => (c as string).trim())
    .join(' ');
}
