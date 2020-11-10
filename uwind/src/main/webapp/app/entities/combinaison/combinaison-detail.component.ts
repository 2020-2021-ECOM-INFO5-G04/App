import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICombinaison } from 'app/shared/model/combinaison.model';

@Component({
  selector: 'jhi-combinaison-detail',
  templateUrl: './combinaison-detail.component.html',
})
export class CombinaisonDetailComponent implements OnInit {
  combinaison: ICombinaison | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ combinaison }) => (this.combinaison = combinaison));
  }

  previousState(): void {
    window.history.back();
  }
}
