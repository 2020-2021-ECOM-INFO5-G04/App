import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IObservation, Observation } from 'app/shared/model/observation.model';
import { ObservationService } from './observation.service';
import { ObservationComponent } from './observation.component';
import { ObservationDetailComponent } from './observation-detail.component';
import { ObservationUpdateComponent } from './observation-update.component';

@Injectable({ providedIn: 'root' })
export class ObservationResolve implements Resolve<IObservation> {
  constructor(private service: ObservationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IObservation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((observation: HttpResponse<Observation>) => {
          if (observation.body) {
            return of(observation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Observation());
  }
}

export const observationRoute: Routes = [
  {
    path: '',
    component: ObservationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.observation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ObservationDetailComponent,
    resolve: {
      observation: ObservationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.observation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ObservationUpdateComponent,
    resolve: {
      observation: ObservationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.observation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ObservationUpdateComponent,
    resolve: {
      observation: ObservationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.observation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
