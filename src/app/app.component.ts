import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { FormComponent } from './usuario/form/form.component';
import { ListaComponent } from './usuario/list/lista.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppModule, CommonModule, RouterOutlet, FormComponent, ListaComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'desafio-first-decision-front';

  constructor() {}
}
