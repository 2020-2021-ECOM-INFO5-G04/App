import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UwindSharedModule } from 'app/shared/shared.module';
import { InscriptionSortieComponent } from './inscription-sortie.component';
import { InscriptionSortieDetailComponent } from './inscription-sortie-detail.component';
import { InscriptionSortieUpdateComponent } from './inscription-sortie-update.component';
import { InscriptionSortieDeleteDialogComponent } from './inscription-sortie-delete-dialog.component';
import { inscriptionSortieRoute } from './inscription-sortie.route';

@NgModule({
  imports: [UwindSharedModule, RouterModule.forChild(inscriptionSortieRoute)],
  declarations: [
    InscriptionSortieComponent,
    InscriptionSortieDetailComponent,
    InscriptionSortieUpdateComponent,
    InscriptionSortieDeleteDialogComponent,
  ],
  entryComponents: [InscriptionSortieDeleteDialogComponent],
})
export class UwindInscriptionSortieModule {}
