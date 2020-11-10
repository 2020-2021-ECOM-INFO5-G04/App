import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFlotteur } from 'app/shared/model/flotteur.model';

@Component({
  selector: 'jhi-flotteur-detail',
  templateUrl: './flotteur-detail.component.html',
})
export class FlotteurDetailComponent implements OnInit {
  flotteur: IFlotteur | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ flotteur }) => (this.flotteur = flotteur));
  }

  previousState(): void {
    window.history.back();
  }
}
