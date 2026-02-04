import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment'; // 👈 Importante

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  contents: any[] = [];
  searchTerm: string = '';
  

  private apiUrl = `${environment.apiRoot}/v1/contents`;

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
      next: (data) => this.contents = data,
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