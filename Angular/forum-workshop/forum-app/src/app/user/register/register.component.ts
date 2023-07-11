import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from 'src/types/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  register(email: string, firstName: string,  phoneNumber: string, password: string,  rePassword: string): void {

    if (password !== rePassword) {
      throw new Error("The passwords don't match");
    }

    const user: User = {
      email: email,
      firstName: firstName,
      phoneNumber: phoneNumber,
      password: password,
      rePassword: rePassword
    };
  
    this.userService.register(user);

    this.router.navigate(['/']);
  }
}
