import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from './gestionnaire.service';

@Component({
  templateUrl: './gestionnaire-delete-dialog.component.html',
})
export class GestionnaireDeleteDialogComponent {
  gestionnaire?: IGestionnaire;

  constructor(
    protected gestionnaireService: GestionnaireService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gestionnaireService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gestionnaireListModification');
      this.activeModal.close();
    });
  }
}
