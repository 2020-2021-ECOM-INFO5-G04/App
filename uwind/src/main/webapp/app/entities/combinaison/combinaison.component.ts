import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICombinaison } from 'app/shared/model/combinaison.model';
import { CombinaisonService } from './combinaison.service';
import { CombinaisonDeleteDialogComponent } from './combinaison-delete-dialog.component';

@Component({
  selector: 'jhi-combinaison',
  templateUrl: './combinaison.component.html',
})
export class CombinaisonComponent implements OnInit, OnDestroy {
  combinaisons?: ICombinaison[];
  eventSubscriber?: Subscription;

  constructor(
    protected combinaisonService: CombinaisonService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.combinaisonService.query().subscribe((res: HttpResponse<ICombinaison[]>) => (this.combinaisons = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCombinaisons();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICombinaison): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCombinaisons(): void {
    this.eventSubscriber = this.eventManager.subscribe('combinaisonListModification', () => this.loadAll());
  }

  delete(combinaison: ICombinaison): void {
    const modalRef = this.modalService.open(CombinaisonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.combinaison = combinaison;
  }
}
