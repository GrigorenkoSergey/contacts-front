import { z } from 'zod';
import { isErrorLike } from '../utils';

const URL = 'http://localhost:5000/api/v1/login';

// don't refactor now, because coincidence with contacts/common may be by chance
export const auth = async(login: string, password: string): Promise<LoginResult> => {
  try {
    const data = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        login,
        password
      })
    });

    const result = await data.json();
    if (!isLoginResult(result)) {
      console.log(result);
      throw new Error('Wrong server response schema!');
    }
    return result;

  } catch(e) {
    console.log(e);
    if (!isErrorLike(e)) return { error: 'Login request: something went wrong...', };
    return { error: e.message, };
  }
};

type LoginResult = z.infer<typeof LoginResult>;

const LoginResult = z.union([
  z.object({
    data: z.object({
      msg: z.string(),
      fullname: z.string(),
      token: z.string()
    }),
    meta: z.unknown().optional()
  }),
  z.object({
    error: z.string(),
    meta: z.unknown().optional()
  }),
]);

function isLoginResult(r: unknown): r is LoginResult {
  return LoginResult.safeParse(r).success;
}
