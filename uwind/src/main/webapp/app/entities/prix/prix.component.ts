import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrix } from 'app/shared/model/prix.model';
import { PrixService } from './prix.service';
import { PrixDeleteDialogComponent } from './prix-delete-dialog.component';

@Component({
  selector: 'jhi-prix',
  templateUrl: './prix.component.html',
})
export class PrixComponent implements OnInit, OnDestroy {
  prixes?: IPrix[];
  eventSubscriber?: Subscription;

  constructor(protected prixService: PrixService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.prixService.query().subscribe((res: HttpResponse<IPrix[]>) => (this.prixes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPrixes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPrix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPrixes(): void {
    this.eventSubscriber = this.eventManager.subscribe('prixListModification', () => this.loadAll());
  }

  delete(prix: IPrix): void {
    const modalRef = this.modalService.open(PrixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.prix = prix;
  }

  activate(prix: IPrix): void {
    this.prixService.activate(prix).subscribe(
      () => {},
      () => {}
    );
    window.location.reload();
  }
}
