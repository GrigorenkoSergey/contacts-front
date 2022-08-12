import { z, ZodType } from 'zod';
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

type CommonArgs<T extends ZodType<unknown>> = {
  token: string
  method: 'get' | 'put' | 'post' | 'delete'
  resultZodType: T
  funcName: string
  body?: Record<string, unknown>
};

const URL = 'http://localhost:5000/api/v1/contacts';

export const commonPart = async <T extends ZodType<unknown>>(x: CommonArgs<T>) => {
  const { funcName, method, resultZodType: resultType, token, body } = x;

  type Result = z.infer<typeof resultType>;

  function resultTypeGuard(r: unknown): r is Result {
    return resultType.safeParse(r).success;
  }

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

    if (!resultTypeGuard(result)) {
      console.log(result);
      throw new Error('Wrong server response schema!');
    }
    return result;

  } catch(e) {
    if (!isErrorLike(e)) return { error: `${funcName} request: something went wrong...`, };

    return { error: e.message, };
  }
};
