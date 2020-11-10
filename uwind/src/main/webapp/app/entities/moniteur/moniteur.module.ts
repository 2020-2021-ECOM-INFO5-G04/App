import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UwindSharedModule } from 'app/shared/shared.module';
import { MoniteurComponent } from './moniteur.component';
import { MoniteurDetailComponent } from './moniteur-detail.component';
import { MoniteurUpdateComponent } from './moniteur-update.component';
import { MoniteurDeleteDialogComponent } from './moniteur-delete-dialog.component';
import { moniteurRoute } from './moniteur.route';

@NgModule({
  imports: [UwindSharedModule, RouterModule.forChild(moniteurRoute)],
  declarations: [MoniteurComponent, MoniteurDetailComponent, MoniteurUpdateComponent, MoniteurDeleteDialogComponent],
  entryComponents: [MoniteurDeleteDialogComponent],
})
export class UwindMoniteurModule {}
