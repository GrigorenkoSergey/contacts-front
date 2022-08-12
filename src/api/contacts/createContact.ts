import { z } from 'zod';
import { commonPart, Contact, ResponseErrorInfo } from './common';

const Result = z.union([
  z.object({
    data: Contact,
    meta: z.unknown().optional()
  }),
  ResponseErrorInfo
]);

export const createContact = (token: string, body: Omit<Contact, 'id'>) => commonPart({
  funcName: 'createContact',
  method: 'post',
  resultZodType: Result,
  token,
  body
});
