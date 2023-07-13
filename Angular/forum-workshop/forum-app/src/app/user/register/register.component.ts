import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from 'src/types/user';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  register(registerForm: NgForm): void {

    const value: { email: string, username: string,  tel: string, password: string,  rePassword: string} = registerForm.value;

    if (value.password !== value.rePassword) {
      throw new Error("The passwords don't match");
    }

    const user: User = {
      email: value.email,
      username: value.username,
      tel:value.tel,
      password: value.password,
      rePassword: value.rePassword
    };
      
    this.userService.register(user);

    this.router.navigate(['/']);
  }
}
