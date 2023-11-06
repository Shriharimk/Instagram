import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { User } from '../class/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  displayLoginForm: boolean = false;
  showStrengthBar=false;
  password:String='';
  
  user : User = new User();

  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private auth: AuthService,
              ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, this.nospaceAllowed]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),    
          this.passwordsMatch.bind(this)      
        ]
      ]
    });
  }
  passwordsMatch(control: FormControl) {
    console.log('control value: '+control.value)
    //console.log(passwordControl+"fdfgfghfhgf")
    // const confirmPasswordControl = control.get('repassword');
    // console.log(confirmPasswordControl)

    // if (passwordControl && confirmPasswordControl) {
    //   const password = passwordControl.value;
    //   const confirmPassword = confirmPasswordControl.value;

    //   if (password !== confirmPassword) {
    //     confirmPasswordControl.setErrors({ passwordsMatch: true });
    //   } else {
    //     confirmPasswordControl.setErrors(null);
    //   }
    // }
    if(this.password!=control.value)
      return {passwordsMatch:true}
    else  return null
  }
   

  onSubmit()
  {
          this.user.username = this.signupForm.get('username')?.value;
          this.user.email = this.signupForm.get('email')?.value;
          this.user.description = null;
          console.log(this.user);
          this.auth.signup(this.signupForm.get('email')?.value,this.signupForm.get('password')?.value, this.user);
  }

  onSignupSubmit() {
      console.log(this.signupForm);
      if (this.signupForm.valid) {
         
          this.user.username = this.signupForm.get('username')?.value,
          this.user.email = this.signupForm.get('email')?.value,
          this.user.description = null,
          this.user.profileImage = "",

          // password: this.signupForm.get('password')?.value,
          // repassword: this.signupForm.get('repassword')?.value
        //store password to local varaible
        this.password=this.signupForm.get('password')?.value;
    
      //   localStorage.setItem('user', JSON.stringify(user));
       }
      // const userData = localStorage.getItem('user');

      // if (userData !== null) {
      //   const storedUser = JSON.parse(userData);
      //   // Rest of your code

      // }
      // console.log(this.signupForm);

      // //move to login page
      // this.router.navigateByUrl('/login');
      console.log(this.user);
      //this.auth.signup(this.signupForm.get('email')?.value,this.signupForm.get('password')?.value)
    }
  
  nospaceAllowed(control: FormControl){
    if( control.value!=null && control.value.indexOf(' ') != -1){
      return { nospaceAllowed: true }
    }
    else{
      return null;
    }
    }

  getStrengthClass(password: string): string {
      if (!password) {
        return 'weak';
      }
  
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasDigit = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*]/.test(password);
  
      if (
        password.length >= 6 &&
        hasUpperCase &&
        hasLowerCase &&
        hasDigit &&
        hasSpecialChar
      ) {
        this.password=password;
        return 'very-strong';
      } else if (
        password.length >= 6 &&
        ((hasUpperCase && hasLowerCase && hasDigit) || hasSpecialChar)
      ) {
        this.password=password;
        return 'strong';
      } else if (password.length >= 6) {
        this.password=password;
        return 'medium';
      } else {
        return 'weak';
      }
    }
  
    getStrengthText(password: string): string {
      switch (this.getStrengthClass(password)) {
        case 'weak':
          return 'Weak';
        case 'medium':
          return 'Medium';
        case 'strong':
          return 'Strong';
        case 'very-strong':
          return 'Very Strong';
        default:
          return '';
      }
    }


    
}