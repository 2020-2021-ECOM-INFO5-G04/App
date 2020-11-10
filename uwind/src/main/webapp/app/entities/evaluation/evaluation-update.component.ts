import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEvaluation, Evaluation } from 'app/shared/model/evaluation.model';
import { EvaluationService } from './evaluation.service';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/etudiant.service';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from 'app/entities/gestionnaire/gestionnaire.service';

type SelectableEntity = IEtudiant | IGestionnaire;

@Component({
  selector: 'jhi-evaluation-update',
  templateUrl: './evaluation-update.component.html',
})
export class EvaluationUpdateComponent implements OnInit {
  isSaving = false;
  etudiants: IEtudiant[] = [];
  gestionnaires: IGestionnaire[] = [];

  editForm = this.fb.group({
    id: [],
    note: [null, [Validators.required, Validators.min(0.0), Validators.max(20.0)]],
    commentaire: [],
    etudiant: [],
    gestionnaire: [],
  });

  constructor(
    protected evaluationService: EvaluationService,
    protected etudiantService: EtudiantService,
    protected gestionnaireService: GestionnaireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ evaluation }) => {
      this.updateForm(evaluation);

      this.etudiantService.query().subscribe((res: HttpResponse<IEtudiant[]>) => (this.etudiants = res.body || []));

      this.gestionnaireService.query().subscribe((res: HttpResponse<IGestionnaire[]>) => (this.gestionnaires = res.body || []));
    });
  }

  updateForm(evaluation: IEvaluation): void {
    this.editForm.patchValue({
      id: evaluation.id,
      note: evaluation.note,
      commentaire: evaluation.commentaire,
      etudiant: evaluation.etudiant,
      gestionnaire: evaluation.gestionnaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const evaluation = this.createFromForm();
    if (evaluation.id !== undefined) {
      this.subscribeToSaveResponse(this.evaluationService.update(evaluation));
    } else {
      this.subscribeToSaveResponse(this.evaluationService.create(evaluation));
    }
  }

  private createFromForm(): IEvaluation {
    return {
      ...new Evaluation(),
      id: this.editForm.get(['id'])!.value,
      note: this.editForm.get(['note'])!.value,
      commentaire: this.editForm.get(['commentaire'])!.value,
      etudiant: this.editForm.get(['etudiant'])!.value,
      gestionnaire: this.editForm.get(['gestionnaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvaluation>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
