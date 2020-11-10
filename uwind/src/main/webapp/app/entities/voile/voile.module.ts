import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UwindSharedModule } from 'app/shared/shared.module';
import { VoileComponent } from './voile.component';
import { VoileDetailComponent } from './voile-detail.component';
import { VoileUpdateComponent } from './voile-update.component';
import { VoileDeleteDialogComponent } from './voile-delete-dialog.component';
import { voileRoute } from './voile.route';

@NgModule({
  imports: [UwindSharedModule, RouterModule.forChild(voileRoute)],
  declarations: [VoileComponent, VoileDetailComponent, VoileUpdateComponent, VoileDeleteDialogComponent],
  entryComponents: [VoileDeleteDialogComponent],
})
export class UwindVoileModule {}
