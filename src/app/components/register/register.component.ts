import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  PatternValidator,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  accountForm: FormGroup;

  constructor(private router: Router) {
    this.accountForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.accountForm.valid) {
      const userData = {
        firstName: this.accountForm.value.firstName,
        lastName: this.accountForm.value.lastName,
        email: this.accountForm.value.email,
        password: this.accountForm.value.password,
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      this.router.navigate(['/login']);
    }
  }
}
