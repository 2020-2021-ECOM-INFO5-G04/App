import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISortie, Sortie } from 'app/shared/model/sortie.model';
import { SortieService } from './sortie.service';
import { SortieComponent } from './sortie.component';
import { SortieDetailComponent } from './sortie-detail.component';
import { SortieUpdateComponent } from './sortie-update.component';

@Injectable({ providedIn: 'root' })
export class SortieResolve implements Resolve<ISortie> {
  constructor(private service: SortieService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISortie> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sortie: HttpResponse<Sortie>) => {
          if (sortie.body) {
            return of(sortie.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Sortie());
  }
}

export const sortieRoute: Routes = [
  {
    path: '',
    component: SortieComponent,
    data: {
      authorities: ['ROLE_ETUDIANT', 'ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.sortie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SortieDetailComponent,
    resolve: {
      sortie: SortieResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE', 'ROLE_ETUDIANT'],
      pageTitle: 'uwindApp.sortie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SortieUpdateComponent,
    resolve: {
      sortie: SortieResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.sortie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SortieUpdateComponent,
    resolve: {
      sortie: SortieResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.sortie.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
