import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFlotteur } from 'app/shared/model/flotteur.model';
import { FlotteurService } from './flotteur.service';

@Component({
  templateUrl: './flotteur-delete-dialog.component.html',
})
export class FlotteurDeleteDialogComponent {
  flotteur?: IFlotteur;

  constructor(protected flotteurService: FlotteurService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.flotteurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('flotteurListModification');
      this.activeModal.close();
    });
  }
}
