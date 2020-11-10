import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IObservation } from 'app/shared/model/observation.model';
import { ObservationService } from './observation.service';
import { ObservationDeleteDialogComponent } from './observation-delete-dialog.component';

@Component({
  selector: 'jhi-observation',
  templateUrl: './observation.component.html',
})
export class ObservationComponent implements OnInit, OnDestroy {
  observations?: IObservation[];
  eventSubscriber?: Subscription;

  constructor(
    protected observationService: ObservationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.observationService.query().subscribe((res: HttpResponse<IObservation[]>) => (this.observations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInObservations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IObservation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInObservations(): void {
    this.eventSubscriber = this.eventManager.subscribe('observationListModification', () => this.loadAll());
  }

  delete(observation: IObservation): void {
    const modalRef = this.modalService.open(ObservationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.observation = observation;
  }
}
