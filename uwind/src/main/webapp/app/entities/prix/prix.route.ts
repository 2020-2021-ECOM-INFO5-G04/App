import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPrix, Prix } from 'app/shared/model/prix.model';
import { PrixService } from './prix.service';
import { PrixComponent } from './prix.component';
import { PrixDetailComponent } from './prix-detail.component';
import { PrixUpdateComponent } from './prix-update.component';

@Injectable({ providedIn: 'root' })
export class PrixResolve implements Resolve<IPrix> {
  constructor(private service: PrixService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((prix: HttpResponse<Prix>) => {
          if (prix.body) {
            return of(prix.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Prix());
  }
}

export const prixRoute: Routes = [
  {
    path: '',
    component: PrixComponent,
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.prix.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PrixDetailComponent,
    resolve: {
      prix: PrixResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.prix.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PrixUpdateComponent,
    resolve: {
      prix: PrixResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.prix.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PrixUpdateComponent,
    resolve: {
      prix: PrixResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.prix.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
