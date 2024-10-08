import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-ping-pong-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './ping-pong-form.component.html',
  styleUrl: './ping-pong-form.component.css'
})
export class PingPongFormComponent {
  PingPongForm: any;
  athlete: any;

}
