import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  accountForm: FormGroup;
  constructor(private loginService: LoginService, private router: Router) {
    this.accountForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  isLogged = false;

  ngOnInit(): void {
    this.loginService.isLoggedObservable().subscribe((val) => {
      this.isLogged = val;
    });
  }

  onSubmit() {
    const email = this.accountForm.value.email;
    const password = this.accountForm.value.password;

    const userDataStr = localStorage.getItem('userData');

    if (userDataStr) {
      const userData = JSON.parse(userDataStr);

      if (email === userData.email && password === userData.password) {
        console.log('Login successful');
        this.router.navigate(['/']);
        this.loginService.setLoggedIn();
        localStorage.clear();
      } else {
        console.log('Login failed. Invalid credentials.');
      }
    } else {
      console.log('No user data found. Please register.');
    }
  }
}
