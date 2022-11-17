import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  constructor(private paisService: PaisService) {}

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  // Método para buscar el pais
  buscar = (termino: string): void => {
    this.termino = termino;
    this.hayError = false;
    this.mostrarSugerencias = false;

    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises): void => {
        this.paises = paises;
      },
      error: (): void => {
        this.hayError = true;
        this.paises = [];
      },
    });
  };

  sugerencias = (termino: string) => {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino).subscribe({
      next: (paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
      },
      error: () => {
        this.paisesSugeridos = [];
      },
    });
  };

  buscarSugerido = (termino: string) => {
    this.buscar(termino);
  };
}
