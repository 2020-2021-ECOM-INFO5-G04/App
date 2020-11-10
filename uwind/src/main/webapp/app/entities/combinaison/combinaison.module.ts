import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UwindSharedModule } from 'app/shared/shared.module';
import { CombinaisonComponent } from './combinaison.component';
import { CombinaisonDetailComponent } from './combinaison-detail.component';
import { CombinaisonUpdateComponent } from './combinaison-update.component';
import { CombinaisonDeleteDialogComponent } from './combinaison-delete-dialog.component';
import { combinaisonRoute } from './combinaison.route';

@NgModule({
  imports: [UwindSharedModule, RouterModule.forChild(combinaisonRoute)],
  declarations: [CombinaisonComponent, CombinaisonDetailComponent, CombinaisonUpdateComponent, CombinaisonDeleteDialogComponent],
  entryComponents: [CombinaisonDeleteDialogComponent],
})
export class UwindCombinaisonModule {}
