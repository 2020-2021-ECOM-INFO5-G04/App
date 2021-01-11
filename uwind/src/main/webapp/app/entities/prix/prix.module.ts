import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UwindSharedModule } from 'app/shared/shared.module';
import { PrixComponent } from './prix.component';
import { PrixDetailComponent } from './prix-detail.component';
import { PrixUpdateComponent } from './prix-update.component';
import { PrixDeleteDialogComponent } from './prix-delete-dialog.component';
import { prixRoute } from './prix.route';

@NgModule({
  imports: [UwindSharedModule, RouterModule.forChild(prixRoute)],
  declarations: [PrixComponent, PrixDetailComponent, PrixUpdateComponent, PrixDeleteDialogComponent],
  entryComponents: [PrixDeleteDialogComponent],
})
export class UwindPrixModule {}
