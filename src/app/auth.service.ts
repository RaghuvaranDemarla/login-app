import { Injectable } from '@angular/core';
import { User } from './app.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }
  userMap = new Map();

  public signUp(user: User): boolean {
    if (this.userMap.has(user.email)) {
      alert('Email already found');
      return false;
    } else {
      this.userMap.set(user.email, user);
      return true;
    }
  }

  public login(user: User) {
    if (this.userMap.has(user.email)) {
      const userObj: User = this.userMap.get(user.email);
      if (userObj.password === user.password) {
         this.router.navigate(['home']) 
      } else {
        alert('Password incorrect');
      }
    } else {
      alert('Email not found');
    }
  }
}
