import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: Observable<firebase.User>;

    constructor(public afAuth: AngularFireAuth, private router: Router) {
        this.user = afAuth.authState;
    }

    signupUser(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(() => console.log('success register'))
            .catch(error => console.log(error));
    }

    signinUser(email: string, password: string) {
        return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(resolve => this.router.navigate(['home']))
            .catch(error => console.log(error));
    }

    logOut() {
        this.afAuth.auth.signOut()
            .then(resolve => this.router.navigate(['login']))
            .catch(error => console.log(error));
    }

    isAuthenticated() {
        if (firebase.auth().currentUser) {
            return true;
        } else { return false; }
    }
}
