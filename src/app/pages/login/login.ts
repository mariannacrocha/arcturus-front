import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Mantenha o RouterLink aqui
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Agora está sendo usado no HTML!
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Preencha todos os campos!';
      return;
    }

    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Login realizado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Usuário ou senha incorretos.';
        }
      });
  }

  
}