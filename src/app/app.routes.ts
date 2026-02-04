import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { RegisterComponent } from './pages/register/register'; // 👈 Importar
import { LibraryComponent } from './pages/library/library';   // 👈 Importar

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // 👈 Rota de Cadastro
  { path: 'home', component: HomeComponent },         // Rota de Busca
  { path: 'library', component: LibraryComponent }    // 👈 Rota da Biblioteca
];