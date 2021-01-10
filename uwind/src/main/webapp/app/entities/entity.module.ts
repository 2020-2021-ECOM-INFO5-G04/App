import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'profil',
        loadChildren: () => import('./profil/profil.module').then(m => m.UwindProfilModule),
      },
      {
        path: 'etudiant',
        loadChildren: () => import('./etudiant/etudiant.module').then(m => m.UwindEtudiantModule),
      },
      {
        path: 'moniteur',
        loadChildren: () => import('./moniteur/moniteur.module').then(m => m.UwindMoniteurModule),
      },
      {
        path: 'gestionnaire',
        loadChildren: () => import('./gestionnaire/gestionnaire.module').then(m => m.UwindGestionnaireModule),
      },
      {
        path: 'sortie',
        loadChildren: () => import('./sortie/sortie.module').then(m => m.UwindSortieModule),
      },
      {
        path: 'inscription-sortie',
        loadChildren: () => import('./inscription-sortie/inscription-sortie.module').then(m => m.UwindInscriptionSortieModule),
      },
      {
        path: 'observation',
        loadChildren: () => import('./observation/observation.module').then(m => m.UwindObservationModule),
      },
      {
        path: 'evaluation',
        loadChildren: () => import('./evaluation/evaluation.module').then(m => m.UwindEvaluationModule),
      },
      {
        path: 'voile',
        loadChildren: () => import('./voile/voile.module').then(m => m.UwindVoileModule),
      },
      {
        path: 'flotteur',
        loadChildren: () => import('./flotteur/flotteur.module').then(m => m.UwindFlotteurModule),
      },
      {
        path: 'combinaison',
        loadChildren: () => import('./combinaison/combinaison.module').then(m => m.UwindCombinaisonModule),
      },
      {
        path: 'prix',
        loadChildren: () => import('./prix/prix.module').then(m => m.UwindPrixModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class UwindEntityModule {}
