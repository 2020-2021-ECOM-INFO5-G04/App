import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICombinaison } from 'app/shared/model/combinaison.model';
import { CombinaisonService } from './combinaison.service';

@Component({
  templateUrl: './combinaison-delete-dialog.component.html',
})
export class CombinaisonDeleteDialogComponent {
  combinaison?: ICombinaison;

  constructor(
    protected combinaisonService: CombinaisonService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.combinaisonService.delete(id).subscribe(() => {
      this.eventManager.broadcast('combinaisonListModification');
      this.activeModal.close();
    });
  }
}
