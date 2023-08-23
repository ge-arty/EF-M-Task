import { LoginService } from './../../services/login.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  isLogged = false;

  ngOnInit(): void {
    this.loginService.isLoggedObservable().subscribe((val) => {
      this.isLogged = val;
    });
  }

  goToPosts = async () => {
    await this.router.navigate(['/']);
  };
  goToLogin = async () => {
    await this.router.navigate(['/login']);
  };
  goToRegister = async () => {
    await this.router.navigate(['/register']);
  };
  logOut = () => {
    this.loginService.setLoggedOut();
  };
}
