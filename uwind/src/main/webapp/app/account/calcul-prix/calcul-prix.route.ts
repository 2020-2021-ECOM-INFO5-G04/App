import { Route } from '@angular/router';

import { CalculPrixComponent } from './calcul-prix.component';

export const calculPrixRoute: Route = {
  path: 'calculPrix',
  component: CalculPrixComponent,
  data: {
    authorities: [],
    pageTitle: 'calculPrix.title',
  },
};
