import { z } from 'zod';
import { commonPart, ResponseErrorInfo } from './common';

export const removeContact = (token: string, id: number) => commonPart({
  funcName: 'removeContact',
  method: 'delete',
  resultTypeGuard,
  token,
  body: { id }
});

const Result = z.union([
  z.object({ data: z.literal('success'), }),
  ResponseErrorInfo
]);

type Result = z.infer<typeof Result>;
function resultTypeGuard(r: unknown): r is Result {
  return Result.safeParse(r).success;
}
