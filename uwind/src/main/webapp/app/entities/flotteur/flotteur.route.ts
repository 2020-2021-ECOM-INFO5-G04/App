import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFlotteur, Flotteur } from 'app/shared/model/flotteur.model';
import { FlotteurService } from './flotteur.service';
import { FlotteurComponent } from './flotteur.component';
import { FlotteurDetailComponent } from './flotteur-detail.component';
import { FlotteurUpdateComponent } from './flotteur-update.component';

@Injectable({ providedIn: 'root' })
export class FlotteurResolve implements Resolve<IFlotteur> {
  constructor(private service: FlotteurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFlotteur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((flotteur: HttpResponse<Flotteur>) => {
          if (flotteur.body) {
            return of(flotteur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Flotteur());
  }
}

export const flotteurRoute: Routes = [
  {
    path: '',
    component: FlotteurComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.flotteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FlotteurDetailComponent,
    resolve: {
      flotteur: FlotteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.flotteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FlotteurUpdateComponent,
    resolve: {
      flotteur: FlotteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.flotteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FlotteurUpdateComponent,
    resolve: {
      flotteur: FlotteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.flotteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
