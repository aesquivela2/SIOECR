import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { routes } from './app/app.routes'; // Importar las rutas

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, FormsModule),
    importProvidersFrom(RouterModule.forRoot(routes))  // Configurar las rutas en el RouterModule
  ],
});
