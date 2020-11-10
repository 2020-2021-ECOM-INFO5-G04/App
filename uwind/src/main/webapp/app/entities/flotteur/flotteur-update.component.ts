import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFlotteur, Flotteur } from 'app/shared/model/flotteur.model';
import { FlotteurService } from './flotteur.service';

@Component({
  selector: 'jhi-flotteur-update',
  templateUrl: './flotteur-update.component.html',
})
export class FlotteurUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    volume: [null, [Validators.required, Validators.min(0.0)]],
    niveauPlancheAVoile: [null, [Validators.required]],
    utilisable: [null, [Validators.required]],
    commentaire: [],
  });

  constructor(protected flotteurService: FlotteurService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ flotteur }) => {
      this.updateForm(flotteur);
    });
  }

  updateForm(flotteur: IFlotteur): void {
    this.editForm.patchValue({
      id: flotteur.id,
      nom: flotteur.nom,
      volume: flotteur.volume,
      niveauPlancheAVoile: flotteur.niveauPlancheAVoile,
      utilisable: flotteur.utilisable,
      commentaire: flotteur.commentaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const flotteur = this.createFromForm();
    if (flotteur.id !== undefined) {
      this.subscribeToSaveResponse(this.flotteurService.update(flotteur));
    } else {
      this.subscribeToSaveResponse(this.flotteurService.create(flotteur));
    }
  }

  private createFromForm(): IFlotteur {
    return {
      ...new Flotteur(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      volume: this.editForm.get(['volume'])!.value,
      niveauPlancheAVoile: this.editForm.get(['niveauPlancheAVoile'])!.value,
      utilisable: this.editForm.get(['utilisable'])!.value,
      commentaire: this.editForm.get(['commentaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFlotteur>>): void {
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
