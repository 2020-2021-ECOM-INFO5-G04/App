import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISortie } from 'app/shared/model/sortie.model';

import * as L from 'leaflet';
import { HttpResponse } from '@angular/common/http';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from '../profil/profil.service';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from '../etudiant/etudiant.service';

@Component({
  selector: 'jhi-sortie-detail',
  templateUrl: './sortie-detail.component.html',
})
export class SortieDetailComponent implements OnInit {
  sortie: ISortie | null = null;
  account: Account | null = null;
  profils?: IProfil[];
  etudiant: IEtudiant | null = null;
  tmp?: boolean;
  id?: number;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private etudiantService: EtudiantService,
    private accountService: AccountService,
    private profilService: ProfilService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sortie }) => (this.sortie = sortie));
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
      this.tmp = true;
    } else {
      this.tmp = false;
    }
  }
}
