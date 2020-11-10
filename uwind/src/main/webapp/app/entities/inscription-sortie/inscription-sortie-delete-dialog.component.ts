import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInscriptionSortie } from 'app/shared/model/inscription-sortie.model';
import { InscriptionSortieService } from './inscription-sortie.service';

@Component({
  templateUrl: './inscription-sortie-delete-dialog.component.html',
})
export class InscriptionSortieDeleteDialogComponent {
  inscriptionSortie?: IInscriptionSortie;

  constructor(
    protected inscriptionSortieService: InscriptionSortieService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inscriptionSortieService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inscriptionSortieListModification');
      this.activeModal.close();
    });
  }
}
