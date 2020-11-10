import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UwindSharedModule } from 'app/shared/shared.module';
import { FlotteurComponent } from './flotteur.component';
import { FlotteurDetailComponent } from './flotteur-detail.component';
import { FlotteurUpdateComponent } from './flotteur-update.component';
import { FlotteurDeleteDialogComponent } from './flotteur-delete-dialog.component';
import { flotteurRoute } from './flotteur.route';

@NgModule({
  imports: [UwindSharedModule, RouterModule.forChild(flotteurRoute)],
  declarations: [FlotteurComponent, FlotteurDetailComponent, FlotteurUpdateComponent, FlotteurDeleteDialogComponent],
  entryComponents: [FlotteurDeleteDialogComponent],
})
export class UwindFlotteurModule {}
