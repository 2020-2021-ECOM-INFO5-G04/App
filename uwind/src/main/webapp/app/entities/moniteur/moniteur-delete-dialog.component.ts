import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMoniteur } from 'app/shared/model/moniteur.model';
import { MoniteurService } from './moniteur.service';

@Component({
  templateUrl: './moniteur-delete-dialog.component.html',
})
export class MoniteurDeleteDialogComponent {
  moniteur?: IMoniteur;

  constructor(protected moniteurService: MoniteurService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.moniteurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('moniteurListModification');
      this.activeModal.close();
    });
  }
}
