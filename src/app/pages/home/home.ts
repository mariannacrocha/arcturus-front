import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { environment } from '../../../environments/environment'; // 👈 Importante

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  searchQuery: string = '';
  contents: any[] = [];
  

  private apiUrl = `${environment.apiRoot}/v1/contents`;

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    public router: Router
  ) {
    this.loadContents();
  }

  loadContents() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe({
        next: (data) => {
          this.contents = data;
          console.log('Músicas carregadas:', data);
        },
        error: (err) => console.error('Erro ao carregar músicas', err)
      });
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.loadContents();
      return;
    }

    const token = this.authService.getToken(); 
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    this.http.get<any[]>(`${this.apiUrl}/search?q=${this.searchQuery}`, { headers })
      .subscribe({
        next: (data) => this.contents = data,
        error: (err) => console.error('Erro na busca', err)
      });
  }

  onLogout() {
    this.authService.logout();
  }
  
  importContent(music: any) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      description: music.description,
      s3Url: music.s3Url,
      frequencyHz: music.frequencyHz || 0,
      energyType: music.energyType || 'OTHER'
    };

    this.http.post(`${this.apiUrl}/import`, body, { headers })
      .subscribe({
        next: (res) => alert('Música salva! 💾'),
        error: (err) => alert('Erro ao salvar música.')
      });
  }

  deleteContent(id: string) {
    if (!confirm('Remover esta música?')) return;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`${this.apiUrl}/${id}`, { headers })
      .subscribe({
        next: () => this.contents = this.contents.filter(item => item.id !== id),
        error: (err) => alert('Erro ao deletar.')
      });
  }
}