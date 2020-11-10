import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscriptionSortie } from 'app/shared/model/inscription-sortie.model';
import { InscriptionSortieService } from './inscription-sortie.service';
import { InscriptionSortieDeleteDialogComponent } from './inscription-sortie-delete-dialog.component';

@Component({
  selector: 'jhi-inscription-sortie',
  templateUrl: './inscription-sortie.component.html',
})
export class InscriptionSortieComponent implements OnInit, OnDestroy {
  inscriptionSorties?: IInscriptionSortie[];
  eventSubscriber?: Subscription;

  constructor(
    protected inscriptionSortieService: InscriptionSortieService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.inscriptionSortieService
      .query()
      .subscribe((res: HttpResponse<IInscriptionSortie[]>) => (this.inscriptionSorties = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInscriptionSorties();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInscriptionSortie): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInscriptionSorties(): void {
    this.eventSubscriber = this.eventManager.subscribe('inscriptionSortieListModification', () => this.loadAll());
  }

  delete(inscriptionSortie: IInscriptionSortie): void {
    const modalRef = this.modalService.open(InscriptionSortieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inscriptionSortie = inscriptionSortie;
  }
}
