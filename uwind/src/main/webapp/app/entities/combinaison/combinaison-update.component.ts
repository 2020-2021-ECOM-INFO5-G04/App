import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICombinaison, Combinaison } from 'app/shared/model/combinaison.model';
import { CombinaisonService } from './combinaison.service';

@Component({
  selector: 'jhi-combinaison-update',
  templateUrl: './combinaison-update.component.html',
})
export class CombinaisonUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    taille: [null, [Validators.required]],
    poids: [null, [Validators.required]],
  });

  constructor(protected combinaisonService: CombinaisonService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ combinaison }) => {
      this.updateForm(combinaison);
    });
  }

  updateForm(combinaison: ICombinaison): void {
    this.editForm.patchValue({
      id: combinaison.id,
      nom: combinaison.nom,
      taille: combinaison.taille,
      poids: combinaison.poids,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const combinaison = this.createFromForm();
    if (combinaison.id !== undefined) {
      this.subscribeToSaveResponse(this.combinaisonService.update(combinaison));
    } else {
      this.subscribeToSaveResponse(this.combinaisonService.create(combinaison));
    }
  }

  private createFromForm(): ICombinaison {
    return {
      ...new Combinaison(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      taille: this.editForm.get(['taille'])!.value,
      poids: this.editForm.get(['poids'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICombinaison>>): void {
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
