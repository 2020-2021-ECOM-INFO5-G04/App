import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFlotteur } from 'app/shared/model/flotteur.model';
import { FlotteurService } from './flotteur.service';
import { FlotteurDeleteDialogComponent } from './flotteur-delete-dialog.component';

@Component({
  selector: 'jhi-flotteur',
  templateUrl: './flotteur.component.html',
})
export class FlotteurComponent implements OnInit, OnDestroy {
  flotteurs?: IFlotteur[];
  eventSubscriber?: Subscription;

  constructor(protected flotteurService: FlotteurService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.flotteurService.query().subscribe((res: HttpResponse<IFlotteur[]>) => (this.flotteurs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFlotteurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFlotteur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFlotteurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('flotteurListModification', () => this.loadAll());
  }

  delete(flotteur: IFlotteur): void {
    const modalRef = this.modalService.open(FlotteurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.flotteur = flotteur;
  }
}
