import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor() {}

  public _isLogged = false;
  private _isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  setLoggedIn() {
    this._isLogged = true;

    this._isLoggedSubject.next(this._isLogged);
  }

  setLoggedOut() {
    this._isLogged = false;

    this._isLoggedSubject.next(this._isLogged);
  }

  isLoggedObservable(): Observable<boolean> {
    return this._isLoggedSubject.asObservable();
  }
}
