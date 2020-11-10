import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IObservation } from 'app/shared/model/observation.model';
import { ObservationService } from './observation.service';

@Component({
  templateUrl: './observation-delete-dialog.component.html',
})
export class ObservationDeleteDialogComponent {
  observation?: IObservation;

  constructor(
    protected observationService: ObservationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.observationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('observationListModification');
      this.activeModal.close();
    });
  }
}
