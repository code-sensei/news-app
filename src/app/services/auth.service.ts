import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  current_user: Observable<any> | undefined;

  constructor(
    private auth: AngularFireAuth
  ) {
    this.current_user = this.auth.authState;
  }

  login_with_email_and_password(email: any, password: any) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
}
