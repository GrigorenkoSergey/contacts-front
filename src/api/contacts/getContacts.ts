import { z } from 'zod';
import { commonPart, Contact, ResponseErrorInfo } from './common';

const Result = z.union([
  z.object({
    data: z.array(Contact),
    meta: z.unknown().optional()
  }),
  ResponseErrorInfo
]);

export const getContacts = (token: string) => commonPart({
  funcName: 'getContacts',
  method: 'get',
  resultZodType: Result,
  token
});
