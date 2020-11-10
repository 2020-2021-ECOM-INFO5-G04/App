import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISortie, Sortie } from 'app/shared/model/sortie.model';
import { SortieService } from './sortie.service';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from 'app/entities/gestionnaire/gestionnaire.service';

@Component({
  selector: 'jhi-sortie-update',
  templateUrl: './sortie-update.component.html',
})
export class SortieUpdateComponent implements OnInit {
  isSaving = false;
  gestionnaires: IGestionnaire[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    date: [null, [Validators.required]],
    planDeau: [null, [Validators.required]],
    coeff: [null, [Validators.required, Validators.min(0)]],
    commentaire: [],
    gestionnaire: [],
  });

  constructor(
    protected sortieService: SortieService,
    protected gestionnaireService: GestionnaireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sortie }) => {
      this.updateForm(sortie);

      this.gestionnaireService.query().subscribe((res: HttpResponse<IGestionnaire[]>) => (this.gestionnaires = res.body || []));
    });
  }

  updateForm(sortie: ISortie): void {
    this.editForm.patchValue({
      id: sortie.id,
      nom: sortie.nom,
      date: sortie.date,
      planDeau: sortie.planDeau,
      coeff: sortie.coeff,
      commentaire: sortie.commentaire,
      gestionnaire: sortie.gestionnaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sortie = this.createFromForm();
    if (sortie.id !== undefined) {
      this.subscribeToSaveResponse(this.sortieService.update(sortie));
    } else {
      this.subscribeToSaveResponse(this.sortieService.create(sortie));
    }
  }

  private createFromForm(): ISortie {
    return {
      ...new Sortie(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      date: this.editForm.get(['date'])!.value,
      planDeau: this.editForm.get(['planDeau'])!.value,
      coeff: this.editForm.get(['coeff'])!.value,
      commentaire: this.editForm.get(['commentaire'])!.value,
      gestionnaire: this.editForm.get(['gestionnaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISortie>>): void {
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

  trackById(index: number, item: IGestionnaire): any {
    return item.id;
  }
}
