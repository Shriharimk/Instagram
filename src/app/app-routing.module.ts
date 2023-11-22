import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ActualpageComponent } from './actualpage/actualpage.component';
import { ForgotPasswordComponent} from './forgot-password/forgot-password.component'; 
import { VerifyEmailComponent} from './verify-email/verify-email.component'; 
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './shared/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { signupGuard } from './shared/signup.guard';
import { landingGuard } from './shared/landing.guard';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, data: { animation: 'HomePage' }, canActivate:[landingGuard] },
  { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' }, canActivate:[landingGuard]},
  { path: 'signup', component: SignupComponent, data: { animation: 'SignupPage' }, canActivate:[signupGuard]},
  { path: 'actualpage', component: ActualpageComponent, data: { animation: 'ActualPage' } , canActivate:[authGuard]},  
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { animation: 'ForgotPassword' } , canActivate:[authGuard]},  
  { path: 'verify-email', component: VerifyEmailComponent, data: { animation: 'VerifyEmail' } , canActivate:[authGuard]},
  { path: 'profiles/:userId', component: ProfileComponent, data: { animation: 'Profile' } ,canActivate:[authGuard]},
  { path: '**', component: NotFoundComponent, },


  // Add other routes as needed
];
providers: [
  provideRouter(routes, withComponentInputBinding())]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}