import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, NavbarComponent, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'inscriptions-front';
}

export interface Region {
  id: number;
  name: string;
}

export interface Sport {
  id: number;
  type: string;
}

export interface Province {
  id: number;
  name: string;
}

export interface Canton {
  id: number;
  name: string;
}
