import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMoniteur } from 'app/shared/model/moniteur.model';
import { MoniteurService } from './moniteur.service';
import { MoniteurDeleteDialogComponent } from './moniteur-delete-dialog.component';

@Component({
  selector: 'jhi-moniteur',
  templateUrl: './moniteur.component.html',
})
export class MoniteurComponent implements OnInit, OnDestroy {
  moniteurs?: IMoniteur[];
  eventSubscriber?: Subscription;

  constructor(protected moniteurService: MoniteurService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.moniteurService.query().subscribe((res: HttpResponse<IMoniteur[]>) => (this.moniteurs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMoniteurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMoniteur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMoniteurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('moniteurListModification', () => this.loadAll());
  }

  delete(moniteur: IMoniteur): void {
    const modalRef = this.modalService.open(MoniteurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.moniteur = moniteur;
  }
}
