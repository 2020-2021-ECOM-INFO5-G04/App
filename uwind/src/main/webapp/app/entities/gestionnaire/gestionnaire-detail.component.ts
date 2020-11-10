import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGestionnaire } from 'app/shared/model/gestionnaire.model';

@Component({
  selector: 'jhi-gestionnaire-detail',
  templateUrl: './gestionnaire-detail.component.html',
})
export class GestionnaireDetailComponent implements OnInit {
  gestionnaire: IGestionnaire | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gestionnaire }) => (this.gestionnaire = gestionnaire));
  }

  previousState(): void {
    window.history.back();
  }
}
