import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInscriptionSortie } from 'app/shared/model/inscription-sortie.model';

@Component({
  selector: 'jhi-inscription-sortie-detail',
  templateUrl: './inscription-sortie-detail.component.html',
})
export class InscriptionSortieDetailComponent implements OnInit {
  inscriptionSortie: IInscriptionSortie | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscriptionSortie }) => (this.inscriptionSortie = inscriptionSortie));
  }

  previousState(): void {
    window.history.back();
  }
}
