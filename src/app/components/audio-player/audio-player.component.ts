import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // 👈 Importe o CommonModule
import { FormsModule } from '@angular/forms';     // 👈 Importe o FormsModule
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-audio-player',
  standalone: true, // <--- Isso confirma que é a versão moderna
  imports: [CommonModule, FormsModule], // <--- AQUI ESTÁ A CORREÇÃO!
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  contents: any[] = [];
  searchTerm: string = '';
  
  // URL do seu Backend
  // private apiUrl = 'http://localhost:8080/v1/contents';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    let url = this.apiUrl;
    
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      url = `${this.apiUrl}/search?q=${this.searchTerm}`;
    }

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.contents = data;
        console.log('Dados carregados:', data);
      },
      error: (err) => console.error('Erro ao buscar:', err)
    });
  }

  clearSearch(): void {
    this.searchTerm = ''; 
    this.search();        
  }

  importToLibrary(item: any): void {
    const payload = {
      description: item.description,
      s3Url: item.s3Url,
      energyType: 'ARCTURUS_IMPORTED',
      frequencyHz: item.frequencyHz || 432
    };

    this.http.post(`${this.apiUrl}/import`, payload).subscribe({
      next: (savedItem: any) => {
        alert(`Sucesso! "${item.description}" foi salvo na sua biblioteca.`);
        item.energyType = 'ARCTURUS_IMPORTED'; 
      },
      error: (err) => {
        console.error('Erro ao salvar:', err);
        alert('Erro ao salvar. Verifique o console.');
      }
    });
  }
}