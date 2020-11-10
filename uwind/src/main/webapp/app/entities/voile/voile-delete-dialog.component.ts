import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVoile } from 'app/shared/model/voile.model';
import { VoileService } from './voile.service';

@Component({
  templateUrl: './voile-delete-dialog.component.html',
})
export class VoileDeleteDialogComponent {
  voile?: IVoile;

  constructor(protected voileService: VoileService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.voileService.delete(id).subscribe(() => {
      this.eventManager.broadcast('voileListModification');
      this.activeModal.close();
    });
  }
}
