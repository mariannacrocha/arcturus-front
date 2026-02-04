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

  // Variável para controlar se mostra a senha ou não
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Função que alterna entre ver e esconder
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    this.errorMessage = '';

    // 1. Campos vazios
    if (!this.username || !this.password) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    // 2. Validação de Senha Forte (Letras E Números, min 6 chars)
    // Regex: Pelo menos uma letra, pelo menos um número.
    const senhaForte = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    
    if (!senhaForte.test(this.password)) {
      this.errorMessage = 'A senha deve ter no mínimo 6 caracteres, contendo letras e números.';
      return;
    }

    // 3. Validação de confirmação
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
          // 4. Tratamento específico para usuário duplicado
          if (err.status === 409) {
            this.errorMessage = 'Este nome de usuário já está em uso.';
          } else {
            this.errorMessage = 'Erro ao criar conta. Tente outro usuário.';
          }
        }
      });
  }
}