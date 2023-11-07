import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { AuthService } from '../shared/auth.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        AngularFireModule.initializeApp({
          apiKey: "AIzaSyCkYa9SvH__Zp6nyztDmH_Ci_gjMo5bq2k",
          authDomain: "projectdemo-9f2d5.firebaseapp.com",
          databaseURL: "https://projectdemo-9f2d5-default-rtdb.firebaseio.com",
          projectId: "projectdemo-9f2d5",
          storageBucket: "projectdemo-9f2d5.appspot.com",
          messagingSenderId: "124296296553",
          appId: "1:124296296553:web:329976cdd70e93431c0af8",
          measurementId: "G-RQ8S2PL6NT"
          // Add other Firebase configuration options
        }),
        AngularFireDatabaseModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule, 
        MatInputModule, 
        BrowserAnimationsModule,
      ],
      providers: [AuthService],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
