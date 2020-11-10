import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UwindSharedModule } from 'app/shared/shared.module';
import { EvaluationComponent } from './evaluation.component';
import { EvaluationDetailComponent } from './evaluation-detail.component';
import { EvaluationUpdateComponent } from './evaluation-update.component';
import { EvaluationDeleteDialogComponent } from './evaluation-delete-dialog.component';
import { evaluationRoute } from './evaluation.route';

@NgModule({
  imports: [UwindSharedModule, RouterModule.forChild(evaluationRoute)],
  declarations: [EvaluationComponent, EvaluationDetailComponent, EvaluationUpdateComponent, EvaluationDeleteDialogComponent],
  entryComponents: [EvaluationDeleteDialogComponent],
})
export class UwindEvaluationModule {}
