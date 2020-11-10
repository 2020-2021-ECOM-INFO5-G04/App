import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVoile } from 'app/shared/model/voile.model';
import { VoileService } from './voile.service';
import { VoileDeleteDialogComponent } from './voile-delete-dialog.component';

@Component({
  selector: 'jhi-voile',
  templateUrl: './voile.component.html',
})
export class VoileComponent implements OnInit, OnDestroy {
  voiles?: IVoile[];
  eventSubscriber?: Subscription;

  constructor(protected voileService: VoileService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.voileService.query().subscribe((res: HttpResponse<IVoile[]>) => (this.voiles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVoiles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVoile): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVoiles(): void {
    this.eventSubscriber = this.eventManager.subscribe('voileListModification', () => this.loadAll());
  }

  delete(voile: IVoile): void {
    const modalRef = this.modalService.open(VoileDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.voile = voile;
  }
}
