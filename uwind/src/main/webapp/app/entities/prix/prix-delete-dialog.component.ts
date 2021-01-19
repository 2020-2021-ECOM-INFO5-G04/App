import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrix } from 'app/shared/model/prix.model';
import { PrixService } from './prix.service';

@Component({
  templateUrl: './prix-delete-dialog.component.html',
})
export class PrixDeleteDialogComponent {
  prix?: IPrix;

  constructor(protected prixService: PrixService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.prixService.delete(id).subscribe(() => {
      this.eventManager.broadcast('prixListModification');
      this.activeModal.close();
    });
  }
}
