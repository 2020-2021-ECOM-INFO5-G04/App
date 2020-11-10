import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from './profil.service';
import { ProfilDeleteDialogComponent } from './profil-delete-dialog.component';

@Component({
  selector: 'jhi-profil',
  templateUrl: './profil.component.html',
})
export class ProfilComponent implements OnInit, OnDestroy {
  profils?: IProfil[];
  eventSubscriber?: Subscription;

  constructor(protected profilService: ProfilService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.profilService.query().subscribe((res: HttpResponse<IProfil[]>) => (this.profils = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProfils();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProfil): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProfils(): void {
    this.eventSubscriber = this.eventManager.subscribe('profilListModification', () => this.loadAll());
  }

  delete(profil: IProfil): void {
    const modalRef = this.modalService.open(ProfilDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.profil = profil;
  }
}
