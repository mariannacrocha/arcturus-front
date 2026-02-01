import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// O import deve ser AppComponent para bater com a exportação no seu arquivo app.ts
import { AppComponent } from './app/app'; 

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));