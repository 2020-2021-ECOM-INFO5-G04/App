import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMoniteur } from 'app/shared/model/moniteur.model';

@Component({
  selector: 'jhi-moniteur-detail',
  templateUrl: './moniteur-detail.component.html',
})
export class MoniteurDetailComponent implements OnInit {
  moniteur: IMoniteur | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ moniteur }) => (this.moniteur = moniteur));
  }

  previousState(): void {
    window.history.back();
  }
}
