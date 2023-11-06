import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ActualpageComponent } from './actualpage/actualpage.component';
import { environment } from '../environments/environment';
import { AuthService } from './shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { HttpClientModule } from  '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { ProfileComponent } from './profile/profile.component'; 
import { ProfileService } from './shared/profile.service';
import { NewPostComponent } from './new-post/new-post.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { UserSearchComponent } from './user-search/user-search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SidebarComponent,
    SignupComponent,
    LandingComponent,
    ActualpageComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProfileComponent,
    NewPostComponent,
    EditProfileComponent,
    UserSearchComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    MatBottomSheetModule,
    MatCardModule,
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,

  ],
  exports:[RouterModule],
  providers: [AuthService, AngularFireAuth,ProfileService],
  bootstrap: [AppComponent]
})

export class AppModule { }
