import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPrix, Prix } from 'app/shared/model/prix.model';
import { PrixService } from './prix.service';

@Component({
  selector: 'jhi-prix-update',
  templateUrl: './prix-update.component.html',
})
export class PrixUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    prixFP: [null, [Validators.required]],
    prixFQ: [null, [Validators.required]],
    active: [null, [Validators.required]],
  });

  constructor(protected prixService: PrixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prix }) => {
      this.updateForm(prix);
    });
  }

  updateForm(prix: IPrix): void {
    this.editForm.patchValue({
      id: prix.id,
      date: prix.date,
      prixFP: prix.prixFP,
      prixFQ: prix.prixFQ,
      active: prix.active,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prix = this.createFromForm();
    if (prix.id !== undefined) {
      this.subscribeToSaveResponse(this.prixService.update(prix));
    } else {
      this.subscribeToSaveResponse(this.prixService.create(prix));
    }
  }

  private createFromForm(): IPrix {
    return {
      ...new Prix(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      prixFP: this.editForm.get(['prixFP'])!.value,
      prixFQ: this.editForm.get(['prixFQ'])!.value,
      active: this.editForm.get(['active'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrix>>): void {
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
}
