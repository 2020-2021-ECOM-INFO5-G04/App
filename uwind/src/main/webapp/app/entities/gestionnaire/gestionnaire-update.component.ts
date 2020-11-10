import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IGestionnaire, Gestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from './gestionnaire.service';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil/profil.service';

@Component({
  selector: 'jhi-gestionnaire-update',
  templateUrl: './gestionnaire-update.component.html',
})
export class GestionnaireUpdateComponent implements OnInit {
  isSaving = false;
  profils: IProfil[] = [];

  editForm = this.fb.group({
    id: [],
    profil: [],
  });

  constructor(
    protected gestionnaireService: GestionnaireService,
    protected profilService: ProfilService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gestionnaire }) => {
      this.updateForm(gestionnaire);

      this.profilService
        .query({ filter: 'gestionnaire-is-null' })
        .pipe(
          map((res: HttpResponse<IProfil[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProfil[]) => {
          if (!gestionnaire.profil || !gestionnaire.profil.id) {
            this.profils = resBody;
          } else {
            this.profilService
              .find(gestionnaire.profil.id)
              .pipe(
                map((subRes: HttpResponse<IProfil>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProfil[]) => (this.profils = concatRes));
          }
        });
    });
  }

  updateForm(gestionnaire: IGestionnaire): void {
    this.editForm.patchValue({
      id: gestionnaire.id,
      profil: gestionnaire.profil,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gestionnaire = this.createFromForm();
    if (gestionnaire.id !== undefined) {
      this.subscribeToSaveResponse(this.gestionnaireService.update(gestionnaire));
    } else {
      this.subscribeToSaveResponse(this.gestionnaireService.create(gestionnaire));
    }
  }

  private createFromForm(): IGestionnaire {
    return {
      ...new Gestionnaire(),
      id: this.editForm.get(['id'])!.value,
      profil: this.editForm.get(['profil'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGestionnaire>>): void {
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

  trackById(index: number, item: IProfil): any {
    return item.id;
  }
}
