import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { AthleteService } from './athlete.service';

@Component({
  selector: 'app-athlete-form',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './athlete-form.component.html',
  styleUrls: ['./athlete-form.component.css']
})
export class AthleteFormComponent implements OnInit {

  @ViewChild('athleteForm') athleteForm!: NgForm;  

  athlete = {
    identification: '',
    name: '',
    birthdate: '',
    email: '',
    sport: '',
    weight: null,
    height: null
  };

  constructor(
    private athleteService: AthleteService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.athleteForm.form.valid) {
      this.athleteService.createAthlete(this.athlete).subscribe(
        response => {
          alert('Datos enviados correctamente.');
          this.athleteForm.resetForm();
        },
        error => {
          console.error('Error creating athlete:', error);
          alert('Ocurrió un error al enviar los datos.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
