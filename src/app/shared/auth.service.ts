import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider, TwitterAuthProvider } from '@angular/fire/auth'
import { User } from '../class/user';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated=false;
  userId:string= '';
  username:string= '';
  user : User = new User();
  loginStatus: boolean = false;


  constructor(private fireauth: AngularFireAuth, 
              private router: Router,
              private http: HttpClient,
              private database: AngularFireDatabase) { }

  //login
  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token','true')
      this.router.navigate(['/actualpage']);
      this.loginStatus=true;
      this.userId = res.user.uid;
      this.authenticated=true;
    },err =>{
      const errorCode = err.code;
      const errorMessage = err.message;

      if (errorCode === 'auth/invalid-login-credentials' || errorCode === 'auth/wrong-password') {
        // Invalid email or password
        alert('Invalid email or password. Please check your credentials.');
      } else {
        // Handle other error cases
        alert('An error occurred: ' + errorMessage);
      }
      this.loginStatus=false;
      this.router.navigate(['/login']);
      this.authenticated=false;
    });
  }

  //signup
  signup(email: string, password: string,user:User){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(res =>{
    alert('Successfully Signed Up!!');
    this.username=res.user.displayName;    
    let uid= res.user.uid;
    //store in users collection in database along with storin details in authentication
    this.storeUserDetails(uid,user);
    this.router.navigate(['/login'])
    },err =>{
      alert('Something went wrong :(. Try again!');
      this.router.navigate(['/signup'])
    });
  }


  //Storing user Deatils in the database as a seperate collection
  storeUserDetails(uid:string ,user:User)
  {
    const path = `users/${uid}`;
    this.database.object(path).set(user).then(()=>
    {
      console.log("saved");
    })
    .catch((err) =>
    {
      alert("error" + err);
    })
  }

  //logout
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token')
      this.router.navigate(['/landing'])
      this.loginStatus=false;
    },err =>{
      alert(err.message);
    })
    this.authenticated=false;

  }

  //forgot-password
  forgotPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
      // this.router.navigate(['/verify-email'])
    },err=>{
      alert('Something went wrong')
    });
  }

  SendVerficationEmail(user: any){

    this.fireauth.currentUser.then(u => u?.sendEmailVerification())
      .then(() =>{
        this.router.navigate(['/verifyEmail']);
      }, (err: any) =>{
          alert('Something Went Wrong. Not able to send mail to registered Email.');
      })

  }

  //signinwithgoogle
  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res =>{      
      this.router.navigate(['/','actualpage'])
      localStorage.setItem('token',JSON.stringify(res.user?.uid))
    }, err =>{
      alert(err.message);
    })
  }

}
