import { z } from 'zod';
import { isErrorLike } from '../../utils';

export const ResponseErrorInfo = z.object({
  error: z.string(),
  meta: z.unknown().optional()
});

export const Contact = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  notes: z.string(),
});

export type Contact = z.infer<typeof Contact>;

type CommonArgs<T> = {
  token: string
  method: 'get' | 'put' | 'post' | 'delete'
  resultTypeGuard: (r: unknown) => r is T
  funcName: string
  body?: Record<string, unknown>
};

const URL = 'http://localhost:5000/api/v1/contacts';

export const commonPart = async <T>(x: CommonArgs<T>) => {
  const { funcName, method, resultTypeGuard, token, body } = x;

  try {
    const data = await fetch(URL, {
      method: method,
      body: body && JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    const result = await data.json();
    if (!resultTypeGuard(result)) throw new Error('Wrong server response schema!');
    console.log(result);
    return result;

  } catch(e) {
    if (!isErrorLike(e)) return { error: `${funcName} request: something went wrong...`, };

    return { error: e.message, };
  }
};
