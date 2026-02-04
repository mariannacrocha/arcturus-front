import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

   
    const senhaForte = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    
    if (!senhaForte.test(this.password)) {
      this.errorMessage = 'A senha deve ter no mínimo 6 caracteres, contendo letras e números.';
      return;
    }

    
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem!';
      return;
    }

    this.authService.register({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          alert('Conta criada com sucesso! Faça login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
        
          if (err.status === 409) {
            this.errorMessage = 'Este nome de usuário já está em uso.';
          } else {
            this.errorMessage = 'Erro ao criar conta. Tente outro usuário.';
          }
        }
      });
  }
}