import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISortie } from 'app/shared/model/sortie.model';
import { SortieService } from './sortie.service';

@Component({
  templateUrl: './sortie-delete-dialog.component.html',
})
export class SortieDeleteDialogComponent {
  sortie?: ISortie;

  constructor(protected sortieService: SortieService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sortieService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sortieListModification');
      this.activeModal.close();
    });
  }
}
