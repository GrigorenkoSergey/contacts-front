import { z } from 'zod';
import { commonPart, Contact, ResponseErrorInfo } from './common';

const Result = z.union([
  z.object({
    data: Contact,
    meta: z.unknown().optional()
  }),
  ResponseErrorInfo
]);

export const updateContact = (token: string, body: Contact) => commonPart({
  funcName: 'updateContact',
  method: 'put',
  resultZodType: Result,
  token,
  body
});
