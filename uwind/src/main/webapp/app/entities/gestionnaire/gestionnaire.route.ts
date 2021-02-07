import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGestionnaire, Gestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from './gestionnaire.service';
import { GestionnaireComponent } from './gestionnaire.component';
import { GestionnaireDetailComponent } from './gestionnaire-detail.component';
import { GestionnaireUpdateComponent } from './gestionnaire-update.component';

@Injectable({ providedIn: 'root' })
export class GestionnaireResolve implements Resolve<IGestionnaire> {
  constructor(private service: GestionnaireService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGestionnaire> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((gestionnaire: HttpResponse<Gestionnaire>) => {
          if (gestionnaire.body) {
            return of(gestionnaire.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Gestionnaire());
  }
}

export const gestionnaireRoute: Routes = [
  {
    path: '',
    component: GestionnaireComponent,
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.gestionnaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GestionnaireDetailComponent,
    resolve: {
      gestionnaire: GestionnaireResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.gestionnaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GestionnaireUpdateComponent,
    resolve: {
      gestionnaire: GestionnaireResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.gestionnaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GestionnaireUpdateComponent,
    resolve: {
      gestionnaire: GestionnaireResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.gestionnaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
