import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMoniteur, Moniteur } from 'app/shared/model/moniteur.model';
import { MoniteurService } from './moniteur.service';
import { MoniteurComponent } from './moniteur.component';
import { MoniteurDetailComponent } from './moniteur-detail.component';
import { MoniteurUpdateComponent } from './moniteur-update.component';

@Injectable({ providedIn: 'root' })
export class MoniteurResolve implements Resolve<IMoniteur> {
  constructor(private service: MoniteurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMoniteur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((moniteur: HttpResponse<Moniteur>) => {
          if (moniteur.body) {
            return of(moniteur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Moniteur());
  }
}

export const moniteurRoute: Routes = [
  {
    path: '',
    component: MoniteurComponent,
    data: {
      authorities: [Authority.USER, 'ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.moniteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MoniteurDetailComponent,
    resolve: {
      moniteur: MoniteurResolve,
    },
    data: {
      authorities: [Authority.USER, 'ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.moniteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MoniteurUpdateComponent,
    resolve: {
      moniteur: MoniteurResolve,
    },
    data: {
      authorities: [Authority.USER, 'ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.moniteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MoniteurUpdateComponent,
    resolve: {
      moniteur: MoniteurResolve,
    },
    data: {
      authorities: [Authority.USER, 'ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.moniteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
