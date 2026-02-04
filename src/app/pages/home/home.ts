import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para o @for e *ngIf
import { FormsModule } from '@angular/forms';   // Necessário para o [(ngModel)] do input
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 Importante: Módulos visuais
  templateUrl: './home.html',           // ⚠️ Verifique se o seu arquivo chama 'home.html' ou 'home.component.html'
  styleUrl: './home.css'                // ⚠️ Verifique se o seu arquivo chama 'home.css' ou 'home.component.css'
})
export class HomeComponent {
  searchQuery: string = '';
  contents: any[] = [];
  
  // Injeção de dependências: HTTP para buscar músicas, Auth para sair, Router se precisar navegar
  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    public router: Router
  ) {
    this.loadContents(); // Carrega as músicas ao abrir a página
  }

  // 1. Carregar lista inicial (Do seu banco)
  loadContents() {
    this.http.get<any[]>('http://localhost:8080/v1/contents')
      .subscribe({
        next: (data) => {
          this.contents = data;
          console.log('Músicas carregadas:', data);
        },
        error: (err) => console.error('Erro ao carregar músicas', err)
      });
  }

  // 2. Buscar (Híbrido: Banco + Jamendo)
  onSearch() {
    if (!this.searchQuery.trim()) {
      this.loadContents(); // Se estiver vazio, carrega tudo
      return;
    }

    console.log('Buscando por:', this.searchQuery);
    
    this.http.get<any[]>(`http://localhost:8080/v1/contents/search?q=${this.searchQuery}`)
      .subscribe({
        next: (data) => {
          this.contents = data;
        },
        error: (err) => console.error('Erro na busca', err)
      });
  }

  // 3. Função de Logout (Botão Sair)
  onLogout() {
    this.authService.logout();
  }

  // 4. Salvar música (Importar) - Vamos implementar depois, deixei pronto para não dar erro no HTML
  importContent(music: any) {
    console.log('Botão de salvar clicado para:', music.description);
    
    // Recupera o Token
    const token = this.authService.getToken();
    
    // Cria o cabeçalho com o Token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Monta o objeto para enviar
    const body = {
      description: music.description,
      s3Url: music.s3Url,
      frequencyHz: music.frequencyHz || 0,
      energyType: music.energyType || 'OTHER'
    };

    // Envia para o Backend
    this.http.post('http://localhost:8080/v1/contents/import', body, { headers })
      .subscribe({
        next: (res) => {
          alert('Música salva na sua biblioteca! 💾');
          // Opcional: Recarregar a lista para mostrar que agora é "interna"
          // this.onSearch(); 
        },
        error: (err) => {
          console.error('Erro ao salvar', err);
          alert('Erro ao salvar música.');
        }
      });
  }
  
  deleteContent(id: string) {
    if (!confirm('Tem certeza que deseja remover esta música da sua biblioteca?')) {
      return;
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`http://localhost:8080/v1/contents/${id}`, { headers })
      .subscribe({
        next: () => {
          // Remove a música da lista visualmente sem precisar recarregar a página
          this.contents = this.contents.filter(item => item.id !== id);
        },
        error: (err) => {
          console.error('Erro ao deletar', err);
          alert('Não foi possível deletar a música.');
        }
      });
  }
}