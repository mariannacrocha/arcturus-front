import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class LibraryComponent {
  contents: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.loadMyLibrary();
  }

  loadMyLibrary() {
    // 1. Pega o Token que o Login salvou (O Crachá)
    const token = this.authService.getToken();

    // Se não tiver token, manda logar
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    // 2. Prepara o cabeçalho com o Token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // 3. Envia o pedido COM O HEADER para o Java saber quem é você
    this.http.get<any[]>('http://localhost:8080/v1/contents', { headers }) 
      .subscribe({
        next: (data) => {
          this.contents = data;
          console.log("Minha biblioteca carregada:", data);
        },
        error: (err) => {
          console.error('Erro ao carregar biblioteca', err);
          // Se der erro 403/401, o token venceu
          if (err.status === 403 || err.status === 401) {
             alert("Sua sessão expirou. Faça login novamente.");
             this.authService.logout();
          }
        }
      });
  }

  deleteContent(id: string) {
    if (!confirm('Remover esta música da biblioteca?')) return;

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`http://localhost:8080/v1/contents/${id}`, { headers })
      .subscribe({
        next: () => {
          this.contents = this.contents.filter(item => item.id !== id);
        },
        error: () => alert('Erro ao deletar.')
      });
  }

  goToSearch() {
    this.router.navigate(['/home']);
  }
}