import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { AuthService } from '../shared/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let newComponent: SignupComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
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
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the logo images over time', (done) => {
    const originalLogo = component.currentLogo;

    setTimeout(() => {
      const updatedLogo = component.currentLogo;
      expect(updatedLogo).not.toBe(originalLogo);
      done();
    }, 3500); 
  });
  
  it('should reset form fields and call AuthService.login', () => {
    component.user.email = 'test1@test.com';
    component.user.password = '123456';
    const loginSpy = spyOn(authService, 'login').and.callThrough();
    component.onLoginSubmit();
    expect(component.user.email).toBe('');
    expect(component.user.password).toBe('');
    expect(loginSpy).toHaveBeenCalledWith('test1@test.com', '123456');
  });

  it('should call signInWithGoogle()', () => {
    spyOn(authService, 'googleSignIn');
    component.signInWithGoogle();
    expect(authService.googleSignIn).toHaveBeenCalled();
  });

  it('should navigate to new user route', () => {
    spyOn(router, 'navigate');
    const routePath = 'signup';
    component.route(routePath);
    expect(router.navigate).toHaveBeenCalledWith([routePath]);
  });

  it('should set values from Form', ()=>{
    const email="test1@test.com";
    const password='123456';

    component.user.email=email;
    component.user.password=password;

    fixture.detectChanges();

    expect(component.user.email).toBe(email);
    expect(component.user.password).toBe(password);
  });


  it('toBe and toEqual test case', () =>{
    var a = 1;
    var b = 1;
    expect(a).toBe(b);
    var arr1 = [1];
    var arr2 = [1];
    expect(arr1).toEqual(arr2)
  })

});
