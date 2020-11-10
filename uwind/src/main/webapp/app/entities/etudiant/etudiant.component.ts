import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';
import { EtudiantDeleteDialogComponent } from './etudiant-delete-dialog.component';

@Component({
  selector: 'jhi-etudiant',
  templateUrl: './etudiant.component.html',
})
export class EtudiantComponent implements OnInit, OnDestroy {
  etudiants?: IEtudiant[];
  eventSubscriber?: Subscription;

  constructor(protected etudiantService: EtudiantService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.etudiantService.query().subscribe((res: HttpResponse<IEtudiant[]>) => (this.etudiants = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEtudiants();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEtudiant): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEtudiants(): void {
    this.eventSubscriber = this.eventManager.subscribe('etudiantListModification', () => this.loadAll());
  }

  delete(etudiant: IEtudiant): void {
    const modalRef = this.modalService.open(EtudiantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etudiant = etudiant;
  }
}
