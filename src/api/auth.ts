import { z } from 'zod';
import { isErrorLike } from '../utils';

type Args = {
  userName: string
  password: string
};
const URL = 'http://localhost:5000/api/v1/login';

export const auth = async(x: Args): Promise<LoginResult> => {
  const { password, userName } = x;

  try {
    const data = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        username: userName,
        password
      })
    });

    const result = await data.json();
    console.log(result);
    if (!isLoginResult(result)) throw new Error('Wrong server response schema!');
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
