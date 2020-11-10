import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISortie } from 'app/shared/model/sortie.model';
import { SortieService } from './sortie.service';
import { SortieDeleteDialogComponent } from './sortie-delete-dialog.component';

@Component({
  selector: 'jhi-sortie',
  templateUrl: './sortie.component.html',
})
export class SortieComponent implements OnInit, OnDestroy {
  sorties?: ISortie[];
  eventSubscriber?: Subscription;

  constructor(protected sortieService: SortieService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.sortieService.query().subscribe((res: HttpResponse<ISortie[]>) => (this.sorties = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSorties();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISortie): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSorties(): void {
    this.eventSubscriber = this.eventManager.subscribe('sortieListModification', () => this.loadAll());
  }

  delete(sortie: ISortie): void {
    const modalRef = this.modalService.open(SortieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sortie = sortie;
  }
}
