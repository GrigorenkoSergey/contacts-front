import { z } from 'zod';
import { commonPart, Contact, ResponseErrorInfo } from './common';

export const updateContact = (token: string, body: Contact) => commonPart({
  funcName: 'updateContact',
  method: 'put',
  resultTypeGuard,
  token,
  body
});

const Result = z.union([
  z.object({
    data: Contact,
    meta: z.unknown().optional()
  }),
  ResponseErrorInfo
]);

type Result = z.infer<typeof Result>;
function resultTypeGuard(r: unknown): r is Result {
  return Result.safeParse(r).success;
}
