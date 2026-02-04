import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
  
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule], 
      providers: [
        { provide: AuthService, useValue: authServiceSpy }, 
        { provide: Router, useValue: routerSpy } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve mostrar erro se os campos estiverem vazios', () => {
    component.username = '';
    component.password = '';
    component.onRegister();
    expect(component.errorMessage).toBe('Preencha todos os campos.');
  });

  it('deve validar senha fraca (sem números)', () => {
    component.username = 'teste';
    component.password = 'apenasletras'; 
    component.onRegister();
    expect(component.errorMessage).toContain('A senha deve ter no mínimo 6 caracteres');
  });

  it('deve validar se as senhas não coincidem', () => {
    component.username = 'teste';
    component.password = 'Teste123';
    component.confirmPassword = 'OutraSenha123';
    component.onRegister();
    expect(component.errorMessage).toBe('As senhas não coincidem!');
  });

  it('deve chamar o AuthService se tudo estiver correto', () => {
    component.username = 'marianna';
    component.password = 'Arcturus2026';
    component.confirmPassword = 'Arcturus2026';


    authServiceSpy.register.and.returnValue(of({ token: 'fake-token' }));

    component.onRegister();


    expect(authServiceSpy.register).toHaveBeenCalledWith({ 
      username: 'marianna', 
      password: 'Arcturus2026' 
    });
  });
});