import { z } from 'zod';
import { commonPart, Contact, ResponseErrorInfo } from './common';

export const getContacts = (token: string) => commonPart({
  funcName: 'getContacts',
  method: 'get',
  resultTypeGuard,
  token
});

const Result = z.union([
  z.object({
    data: z.array(Contact),
    meta: z.unknown().optional()
  }),
  ResponseErrorInfo
]);

type Result = z.infer<typeof Result>;
function resultTypeGuard(r: unknown): r is Result {
  return Result.safeParse(r).success;
}
