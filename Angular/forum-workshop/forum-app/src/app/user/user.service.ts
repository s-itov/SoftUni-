import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/types/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY);
      if (lsUser) {
        this.user = JSON.parse(lsUser);
      } else {
        this.user = undefined;
      }
    } catch (error) {
      this.user = undefined;
    }
  }

  login(): void {
    this.user = {
      email: 'peter@abv.bg',
      username: 'Peter',
      tel: '+359883545429',
      password: '123456',
      rePassword: '123456',
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  register(user: User): void {
    // Perform validation on the user object if required
    const { appUrl } = environment;

    // Save the user data
    this.user = user;

    this.http.post<User>(`${appUrl}/register`, this.user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }
}
