import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISortie } from 'app/shared/model/sortie.model';

import { HttpResponse } from '@angular/common/http';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from '../profil/profil.service';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from '../etudiant/etudiant.service';
import { SortieService } from './sortie.service';

@Component({
  selector: 'jhi-sortie-detail',
  templateUrl: './sortie-detail.component.html',
})
export class SortieDetailComponent implements OnInit {
  sortie: ISortie | null = null;
  account: Account | null = null;
  profils?: IProfil[];
  etudiant: IEtudiant | null = null;
  smh?: boolean;
  id?: number;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private etudiantService: EtudiantService,
    private accountService: AccountService,
    private profilService: ProfilService,
    private sortieService: SortieService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sortie }) => {
      this.sortie = sortie;
    });
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account?.authorities.includes('ROLE_ETUDIANT')) {
        this.account = account;
        this.profilService.query().subscribe((res: HttpResponse<IProfil[]>) => {
          this.profils = res.body || [];
          this.etudiant = this.studentdetect(this.profils);
          if (this.etudiant !== null) {
            this.id = this.etudiant?.id;
            this.placedetect(this.etudiant?.lieuDepart!);
          } else {
            this.id = -1;
            this.placedetect('SMH');
          }
        });
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  studentdetect(profils: IProfil[]): IEtudiant | null {
    let profilId = -1;
    for (let i = 0; i < profils.length; i++) {
      if (this.account?.login === profils[i].utilisateur?.login) {
        profilId = profils[i].id!;
      }
    }
    if (profilId !== -1) {
      this.etudiantService.query().subscribe((res: HttpResponse<IEtudiant[]>) => {
        const etudiants = res.body || [];
        for (let i = 0; i < etudiants.length; i++) {
          if (profilId === etudiants[i].profil?.id) {
            return etudiants[i];
          }
        }
        return null;
      });
    }
    return null;
  }

  placedetect(place: string): void {
    if (place === 'SMH') {
      this.smh = true;
    } else {
      this.smh = false;
    }
  }

  export(): any {
    this.sortieService.export(this.sortie?.id!).subscribe((data: any) => this.downloadFile(data));
  }

  downloadFile(data: any): any {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = window.document.createElement('a');
    a.href = url;
    a.download = 'etudiants du sortie ' + this.sortie?.nom + '.csv';
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
