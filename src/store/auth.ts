import { makeAutoObservable, runInAction } from 'mobx';
import * as api from '../api';

class Auth {
  isAuth = false;
  userName = '';

  constructor() {
    makeAutoObservable(this);
  }

  checkIsAuth() {
    const hasToken = localStorage.getItem('token');
    runInAction(() => {
      this.isAuth = Boolean(hasToken);
    });
    return this.isAuth;
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuth = false;
  }

  async login(login: string, password: string) {
    const result = await api.auth({ password, userName: login });

    if ('data' in result) {
      runInAction(() => { // to remove warnings with async actions in strict mode
        this.userName = login;
        this.isAuth = true;
      });

      localStorage.setItem('token', result.data.token);
      return result;
    }

    return { error: result.error };
  }
}

const auth = new Auth();
export { auth };
