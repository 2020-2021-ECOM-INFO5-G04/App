import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICombinaison, Combinaison } from 'app/shared/model/combinaison.model';
import { CombinaisonService } from './combinaison.service';
import { CombinaisonComponent } from './combinaison.component';
import { CombinaisonDetailComponent } from './combinaison-detail.component';
import { CombinaisonUpdateComponent } from './combinaison-update.component';

@Injectable({ providedIn: 'root' })
export class CombinaisonResolve implements Resolve<ICombinaison> {
  constructor(private service: CombinaisonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICombinaison> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((combinaison: HttpResponse<Combinaison>) => {
          if (combinaison.body) {
            return of(combinaison.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Combinaison());
  }
}

export const combinaisonRoute: Routes = [
  {
    path: '',
    component: CombinaisonComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.combinaison.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CombinaisonDetailComponent,
    resolve: {
      combinaison: CombinaisonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.combinaison.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CombinaisonUpdateComponent,
    resolve: {
      combinaison: CombinaisonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.combinaison.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CombinaisonUpdateComponent,
    resolve: {
      combinaison: CombinaisonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'uwindApp.combinaison.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
