import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Define o formato da resposta que vem do Java
interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL da sua API Java
  private apiUrl = 'http://localhost:8080/auth';

  // Signal: O jeito moderno do Angular 17+ de gerenciar estado
  // Isso avisa automaticamente os componentes quando o status de login muda
  isLoggedIn = signal<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  // 1. Fazer Login
  login(credentials: { username: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          this.isLoggedIn.set(true); // Avisa o site: "Estamos logados!"
        })
      );
  }

  // 2. Criar Conta (Registro)
  register(credentials: { username: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials)
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          this.isLoggedIn.set(true);
        })
      );
  }

  // 3. Logout (Sair)
  logout() {
    localStorage.removeItem('auth_token'); // Apaga o crachá
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']); // Manda pra tela de login
  }

  // 4. Salvar Token no Navegador
  private saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  // 5. Pegar o Token (para usar nas requisições)
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // 6. Verifica se tem token salvo (para saber se mantém logado ao dar F5)
  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}