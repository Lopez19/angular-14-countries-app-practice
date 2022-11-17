import { Component } from '@angular/core';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: [],
})
export class PorCapitalComponent {
  constructor(private paisService: PaisService) {}

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  buscar = (termino: string): void => {
    this.termino = termino;
    this.hayError = false;

    this.paisService.buscarCapital(this.termino).subscribe({
      next: (paises) => {
        this.paises = paises;
      },
      error: () => {
        this.hayError = true;
        this.paises = [];
      },
      complete: () => {
        console.log('Complete');
      },
    });
  };
}
