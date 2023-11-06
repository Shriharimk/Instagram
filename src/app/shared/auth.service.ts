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


  constructor(private fireauth: AngularFireAuth, 
              private router: Router,
              private http: HttpClient,
              private database: AngularFireDatabase) { }

  //login
  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token','true')
      if(res.user.emailVerified==true){
        this.router.navigate(['/actualpage']);
      }else{
        this.router.navigate(['/actualpage']);

       // this.router.navigate(['verify-email'])
      }
      this.userId = res.user.uid;
      this.authenticated=true;
      console.log(this.authenticated)
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
      this.router.navigate(['/login']);
      this.authenticated=false;
    });
  }

  //signup
  signup(email: string, password: string,user:User){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(res =>{
    alert('Successfully Signed Up!!');
    this.username=res.user.displayName;
    console.log(this.username+" from signUp in authservice")
    
    let uid= res.user.uid;//getting the userId from the response
    this.storeUserDetails(uid,user);//storing the userdata from the signup page into the realtime database
    //this.SendVerficationEmail(res.user)
    this.router.navigate(['/login'])
    },err =>{
      alert('Something went wrong');
      this.router.navigate(['/signup'])
    });
  }


  //Storing user Deatils in the database
  storeUserDetails(uid:string ,user:User)
  {
    const path = `users/${uid}`;
    this.database.object(path).set(user).then(()=>
    {
      alert("saved");
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
    },err =>{
      alert(err.message);
    })
    this.authenticated=false;

  }

  //forgot-password
  forgotPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/verify-email'])
    },err=>{
      alert('Something went wrong')
    });
  }

  //email verification 
  // sendEmailForVerification(user: any ){
  //   user.sendEmailForVerification().then((res: any)=>{
  //     this.router.navigate(['/verify-email'])
  //   }, (err: any)=>{
  //     alert('Something Went Wrong. Couldnt send the email. Try again later.')
  //     this.router.navigate(['/forgot-password'])
  //   })
  // }
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
      console.log(res)
    }, err =>{
      alert(err.message);
    })
  }

  //signinwithfacebook
  facebookSignIn(){
    return this.fireauth.signInWithPopup(new FacebookAuthProvider).then(res =>{
      
      this.router.navigate(['/','actualpage'])
      localStorage.setItem('token',JSON.stringify(res.user?.uid))
      console.log(res)
    }, err =>{
      alert(err.message);
    })
  }

  githubSignIn(){
    return this.fireauth.signInWithPopup(new GithubAuthProvider).then(res =>{
      
      this.router.navigate(['/','actualpage'])
      localStorage.setItem('token',JSON.stringify(res.user?.uid))
      console.log(res)
    }, err =>{
      alert(err.message);
    })
  }

  twitterSignIn(){
    return this.fireauth.signInWithPopup(new TwitterAuthProvider).then(res =>{
      
      this.router.navigate(['/','actualpage'])
      localStorage.setItem('token',JSON.stringify(res.user?.uid))
      console.log(res)
    }, err =>{
      alert(err.message);
    })
  }
  


  getDetails(uid: string)
  {
    // const URL = "n"

    console.log(URL)
    console.log(uid+" from auth service")
    return this.http.get("https://projectdemo-9f2d5-default-rtdb.firebaseio.com/users/"+uid+"/.json")
  }



}
