import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. O caminho deve apontar para o nome real do arquivo no seu Explorer
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Garantindo que o componente filho seja reconhecido
  imports: [CommonModule, AudioPlayerComponent],
  templateUrl: './app.html', // No seu print, o arquivo HTML se chama apenas app.html
  styleUrls: ['./app.css']   // No seu print, o arquivo CSS se chama apenas app.css
})
export class AppComponent {
  title = 'arcturus-frontend';
}