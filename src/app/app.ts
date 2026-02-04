import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 👈 1. Importe isso

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // 👈 2. Adicione aqui nos imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'arcturus-stream-front';
}