import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVoile, Voile } from 'app/shared/model/voile.model';
import { VoileService } from './voile.service';
import { VoileComponent } from './voile.component';
import { VoileDetailComponent } from './voile-detail.component';
import { VoileUpdateComponent } from './voile-update.component';

@Injectable({ providedIn: 'root' })
export class VoileResolve implements Resolve<IVoile> {
  constructor(private service: VoileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVoile> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((voile: HttpResponse<Voile>) => {
          if (voile.body) {
            return of(voile.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Voile());
  }
}

export const voileRoute: Routes = [
  {
    path: '',
    component: VoileComponent,
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.voile.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VoileDetailComponent,
    resolve: {
      voile: VoileResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.voile.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VoileUpdateComponent,
    resolve: {
      voile: VoileResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.voile.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VoileUpdateComponent,
    resolve: {
      voile: VoileResolve,
    },
    data: {
      authorities: ['ROLE_GESTIONNAIRE'],
      pageTitle: 'uwindApp.voile.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
