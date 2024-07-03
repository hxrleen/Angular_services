import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(username: string, password: string): boolean {
    const personalData = this.getLocalStorageData();
    console.log(personalData);

    const user = personalData?.find(
      (user) => user.name === username && user.password === password
    );

    if (username == 'abc' && password == 'pass') {
      // if(user){                                        // uncomment this line
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', username);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
  }

  getLocalStorageData(): any[] | null {
    const personalDataString = localStorage.getItem('personalData');
    return personalDataString ? JSON.parse(personalDataString) : null;
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }
}
