import { makeAutoObservable, runInAction } from 'mobx';
import * as api from '../api';

class Auth {
  isAuth = false;
  fullName = '';
  token = '';

  constructor() {
    makeAutoObservable(this);
  }

  checkIsAuth() {
    const token = localStorage.getItem('token');
    const fullName = localStorage.getItem('fullName');
    runInAction(() => {
      this.isAuth = Boolean(token);
      this.token = token || '';
      this.fullName = fullName || '';
    });
    return this.isAuth;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    this.token = '';
    this.isAuth = false;
    this.fullName = '';
  }

  async login(login: string, password: string) {
    const result = await api.auth(login, password);

    if ('data' in result) {
      runInAction(() => { // to remove warnings with async actions in strict mode
        this.fullName = result.data.fullname;
        this.isAuth = true;
        this.token = result.data.token;
      });

      localStorage.setItem('token', result.data.token);
      localStorage.setItem('fullName', result.data.fullname);
      return result;
    }

    return { error: result.error };
  }
}

const auth = new Auth();
export { auth };
