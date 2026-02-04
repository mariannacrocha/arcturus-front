import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
// 👇 Nova forma de importar as ferramentas de teste HTTP
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({

      providers: [
        AuthService,
        provideHttpClient(),        
        provideHttpClientTesting(), 
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('login deve fazer um POST e salvar o token', () => {
    const mockResponse = { token: 'jwt-token-exemplo' };
    const credentials = { username: 'marianna', password: '123' };

    service.login(credentials).subscribe(response => {
      expect(response.token).toBe('jwt-token-exemplo');
    });

    const req = httpMock.expectOne(`${environment.apiRoot}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);

    req.flush(mockResponse);

    expect(localStorage.getItem('auth_token')).toBe('jwt-token-exemplo');
  });
});