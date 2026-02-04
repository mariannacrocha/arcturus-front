import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { environment } from '../../../environments/environment'; // 👈 Importante

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class LibraryComponent {
  contents: any[] = [];
  // 🚀 URL Dinâmica
  private apiUrl = `${environment.apiRoot}/v1/contents`;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.loadMyLibrary();
  }

  loadMyLibrary() {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(this.apiUrl, { headers }) 
      .subscribe({
        next: (data) => {
          this.contents = data;
          console.log("Minha biblioteca carregada:", data);
        },
        error: (err) => {
          console.error('Erro', err);
          if (err.status === 403 || err.status === 401) {
             alert("Sua sessão expirou. Faça login novamente.");
             this.authService.logout();
          }
        }
      });
  }

  deleteContent(id: string) {
    if (!confirm('Remover?')) return;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`${this.apiUrl}/${id}`, { headers })
      .subscribe({
        next: () => this.contents = this.contents.filter(item => item.id !== id),
        error: () => alert('Erro ao deletar.')
      });
  }

  goToSearch() {
    this.router.navigate(['/home']);
  }
}