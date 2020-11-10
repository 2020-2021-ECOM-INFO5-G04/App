import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from './gestionnaire.service';
import { GestionnaireDeleteDialogComponent } from './gestionnaire-delete-dialog.component';

@Component({
  selector: 'jhi-gestionnaire',
  templateUrl: './gestionnaire.component.html',
})
export class GestionnaireComponent implements OnInit, OnDestroy {
  gestionnaires?: IGestionnaire[];
  eventSubscriber?: Subscription;

  constructor(
    protected gestionnaireService: GestionnaireService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.gestionnaireService.query().subscribe((res: HttpResponse<IGestionnaire[]>) => (this.gestionnaires = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGestionnaires();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGestionnaire): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGestionnaires(): void {
    this.eventSubscriber = this.eventManager.subscribe('gestionnaireListModification', () => this.loadAll());
  }

  delete(gestionnaire: IGestionnaire): void {
    const modalRef = this.modalService.open(GestionnaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.gestionnaire = gestionnaire;
  }
}
