import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInscriptionSortie, InscriptionSortie } from 'app/shared/model/inscription-sortie.model';
import { InscriptionSortieService } from './inscription-sortie.service';
import { InscriptionSortieComponent } from './inscription-sortie.component';
import { InscriptionSortieDetailComponent } from './inscription-sortie-detail.component';
import { InscriptionSortieUpdateComponent } from './inscription-sortie-update.component';

@Injectable({ providedIn: 'root' })
export class InscriptionSortieResolve implements Resolve<IInscriptionSortie> {
  constructor(private service: InscriptionSortieService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInscriptionSortie> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((inscriptionSortie: HttpResponse<InscriptionSortie>) => {
          if (inscriptionSortie.body) {
            return of(inscriptionSortie.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InscriptionSortie());
  }
}

export const inscriptionSortieRoute: Routes = [
  {
    path: '',
    component: InscriptionSortieComponent,
    data: {
      authorities: [Authority.USER, 'ROLE_ETUDIANT'],
      pageTitle: 'uwindApp.inscriptionSortie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InscriptionSortieDetailComponent,
    resolve: {
      inscriptionSortie: InscriptionSortieResolve,
    },
    data: {
      authorities: [Authority.USER, 'ROLE_ETUDIANT'],
      pageTitle: 'uwindApp.inscriptionSortie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InscriptionSortieUpdateComponent,
    resolve: {
      inscriptionSortie: InscriptionSortieResolve,
    },
    data: {
      authorities: [Authority.USER, 'ROLE_ETUDIANT'],
      pageTitle: 'uwindApp.inscriptionSortie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InscriptionSortieUpdateComponent,
    resolve: {
      inscriptionSortie: InscriptionSortieResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.inscriptionSortie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
