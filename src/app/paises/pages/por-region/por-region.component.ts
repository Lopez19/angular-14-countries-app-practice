import { Component } from '@angular/core';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.scss'],
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  regionesA: Country[] = [];

  constructor(private paisService: PaisService) {}

  activarRegion = (region: string) => {
    if (region === this.regionActiva) {
      return;
    }

    this.regionActiva = region;
    this.regionesA = [];

    this.paisService.buscarRegion(region).subscribe({
      next: (paises) => {
        this.regionesA = paises;
      },
      error: (err) => {
        console.log('Error: ', err);
      },
    });
  };
}
