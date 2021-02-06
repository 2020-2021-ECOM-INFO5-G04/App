import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFlotteur, Flotteur } from 'app/shared/model/flotteur.model';
import { FlotteurService } from './flotteur.service';

@Component({
  selector: 'jhi-flotteur-assign',
  templateUrl: './flotteur-assign.component.html',
})
export class FlotteurAssignComponent implements OnInit {
  isSaving = false;

  assignForm = this.fb.group({
    nom: [null, [Validators.required]],
  });

  constructor(protected flotteurService: FlotteurService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ flotteur }) => {
      this.updateForm(flotteur);
    });
  }

  updateForm(flotteur: IFlotteur): void {
    this.assignForm.patchValue({
      nom: flotteur.nom,
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
      nom: this.editForm.get(['nom'])!.value,
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
