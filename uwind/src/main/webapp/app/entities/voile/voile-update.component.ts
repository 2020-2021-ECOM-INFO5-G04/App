import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVoile, Voile } from 'app/shared/model/voile.model';
import { VoileService } from './voile.service';

@Component({
  selector: 'jhi-voile-update',
  templateUrl: './voile-update.component.html',
})
export class VoileUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomComplet: [null, [Validators.required]],
    surface: [null, [Validators.required, Validators.min(0.0)]],
    niveau: [null, [Validators.required]],
    utilisable: [null, [Validators.required]],
    commentaire: [],
  });

  constructor(protected voileService: VoileService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ voile }) => {
      this.updateForm(voile);
    });
  }

  updateForm(voile: IVoile): void {
    this.editForm.patchValue({
      id: voile.id,
      nomComplet: voile.nomComplet,
      surface: voile.surface,
      niveau: voile.niveau,
      utilisable: voile.utilisable,
      commentaire: voile.commentaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const voile = this.createFromForm();
    if (voile.id !== undefined) {
      this.subscribeToSaveResponse(this.voileService.update(voile));
    } else {
      this.subscribeToSaveResponse(this.voileService.create(voile));
    }
  }

  private createFromForm(): IVoile {
    return {
      ...new Voile(),
      id: this.editForm.get(['id'])!.value,
      nomComplet: this.editForm.get(['nomComplet'])!.value,
      surface: this.editForm.get(['surface'])!.value,
      niveau: this.editForm.get(['niveau'])!.value,
      utilisable: this.editForm.get(['utilisable'])!.value,
      commentaire: this.editForm.get(['commentaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVoile>>): void {
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
