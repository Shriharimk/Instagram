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


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Show message', () => {
    expect(component.testmethod('Hello')).toBe('Hello');
  });

  it('toBe and toEqual test case', () =>{
    var a = 1;
    var b = 1;
    expect(a).toBe(b);//only primitive dt
    var arr1 = [1];
    var arr2 = [1];
    expect(arr1).toEqual(arr2)//can be used with primitive as well as non primitive like arrays 
  })

  it('should change the logo images over time', (done) => {
    const originalLogo = component.currentLogo;

    setTimeout(() => {
      const updatedLogo = component.currentLogo;
      expect(updatedLogo).not.toBe(originalLogo);
      done();
    }, 3500); 
  });
  
  it('should reset form fields and call AuthService.login', () => {
    // Set user email and password
    component.user.email = 'test12@test.com';
    component.user.password = '123456';

    // Spy on the AuthService's login method
    const loginSpy = spyOn(authService, 'login').and.callThrough();

    // Call onLoginSubmit
    component.onLoginSubmit();

    // Expectations 
    expect(component.user.email).toBe('');
    expect(component.user.password).toBe('');

    // Verify that AuthService.login was called with the correct arguments
    expect(loginSpy).toHaveBeenCalledWith('test12@test.com', '123456');
  });

  it('does stuff', ()=>{
    // spyOn(component,"calculate")
    spyOn(component,'calculateSumAndDiff').and.returnValues([20,40]);
    let result = component.showresult();
    console.log(result);
    // expect(component.calculate).toHaveBeenCalled;
    expect(result).toEqual('fail');
  })
});
