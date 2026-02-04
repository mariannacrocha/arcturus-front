import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { RegisterComponent } from './pages/register/register'; 
import { LibraryComponent } from './pages/library/library';   

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'home', component: HomeComponent },         
  { path: 'library', component: LibraryComponent }    
];