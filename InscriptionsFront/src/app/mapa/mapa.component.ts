import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  standalone: true,
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  handleProvinceClick(province: string): void {
    console.log(`Province clicked: ${province}`);
    // Aquí puedes añadir la lógica adicional para manejar el clic en la provincia
  }
}

