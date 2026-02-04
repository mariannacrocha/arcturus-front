import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { AuthService } from '../../services/auth';
import { Router, provideRouter } from '@angular/router'; // 👈 Importamos provideRouter
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]), 
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o login quando o formulário for válido', () => {
    const router = TestBed.inject(Router);
    

    const navigateSpy = spyOn(router, 'navigate');

    component.username = 'marianna';
    component.password = '123456';
    

    authServiceSpy.login.and.returnValue(of({ token: 'fake-token' }));

    component.onLogin();


    expect(authServiceSpy.login).toHaveBeenCalledWith({ username: 'marianna', password: '123456' });
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});