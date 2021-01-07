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

  options1 = {
    layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })],
    zoom: 15,
    center: L.latLng(45.1933502, 5.7647807),
  };
  layers1 = [
    L.marker([45.1933502, 5.7647807], {
      icon: L.icon({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      }),
    }),
  ];

  options2 = {
    layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })],
    zoom: 15,
    center: L.latLng(45.1959346, 5.708299),
  };
  layers2 = [
    L.marker([45.1959346, 5.708299], {
      icon: L.icon({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      }),
    }),
  ];

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
          this.id = this.studentdetect(this.profils);
          this.etudiantService.find(this.id).subscribe((etu: HttpResponse<IEtudiant>) => {
            this.etudiant = etu.body;
            this.placedetect(this.etudiant?.lieuDepart!);
          });
        });
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  studentdetect(profils: IProfil[]): number {
    for (let i = 0; i < profils.length; i++) {
      if (this.account?.lastName === profils[i].prenom && this.account?.firstName === profils[i].nom) {
        return profils[i].id!;
      }
    }
    return -1;
  }

  placedetect(place: string): void {
    if (place === 'SMH') {
      this.tmp = true;
    } else {
      this.tmp = false;
    }
  }
}
