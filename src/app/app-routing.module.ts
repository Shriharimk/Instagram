import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ActualpageComponent } from './actualpage/actualpage.component';
import { ForgotPasswordComponent} from './forgot-password/forgot-password.component'; 
import { VerifyEmailComponent} from './verify-email/verify-email.component'; 
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, data: { animation: 'HomePage' } },
  { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' }},
  { path: 'signup', component: SignupComponent, data: { animation: 'SignupPage' } },
  { path: 'actualpage', component: ActualpageComponent, data: { animation: 'ActualPage' } },  
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { animation: 'ForgotPassword' } },  
  { path: 'verify-email', component: VerifyEmailComponent, data: { animation: 'VerifyEmail' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'Profile' } },
  { path: 'profiles/:userId', component: ProfileComponent, data: { animation: 'Profile' } },

  // Add other routes as needed
];
providers: [
  provideRouter(routes, withComponentInputBinding())]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}