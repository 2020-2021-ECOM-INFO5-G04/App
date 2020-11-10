import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMoniteur, Moniteur } from 'app/shared/model/moniteur.model';
import { MoniteurService } from './moniteur.service';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil/profil.service';
import { IFlotteur } from 'app/shared/model/flotteur.model';
import { FlotteurService } from 'app/entities/flotteur/flotteur.service';
import { IVoile } from 'app/shared/model/voile.model';
import { VoileService } from 'app/entities/voile/voile.service';
import { ICombinaison } from 'app/shared/model/combinaison.model';
import { CombinaisonService } from 'app/entities/combinaison/combinaison.service';

type SelectableEntity = IProfil | IFlotteur | IVoile | ICombinaison;

@Component({
  selector: 'jhi-moniteur-update',
  templateUrl: './moniteur-update.component.html',
})
export class MoniteurUpdateComponent implements OnInit {
  isSaving = false;
  profils: IProfil[] = [];
  flotteurs: IFlotteur[] = [];
  voiles: IVoile[] = [];
  combinaisons: ICombinaison[] = [];

  editForm = this.fb.group({
    id: [],
    profil: [],
    flotteur: [],
    voile: [],
    combinaison: [],
  });

  constructor(
    protected moniteurService: MoniteurService,
    protected profilService: ProfilService,
    protected flotteurService: FlotteurService,
    protected voileService: VoileService,
    protected combinaisonService: CombinaisonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ moniteur }) => {
      this.updateForm(moniteur);

      this.profilService
        .query({ filter: 'moniteur-is-null' })
        .pipe(
          map((res: HttpResponse<IProfil[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProfil[]) => {
          if (!moniteur.profil || !moniteur.profil.id) {
            this.profils = resBody;
          } else {
            this.profilService
              .find(moniteur.profil.id)
              .pipe(
                map((subRes: HttpResponse<IProfil>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProfil[]) => (this.profils = concatRes));
          }
        });

      this.flotteurService
        .query({ filter: 'moniteur-is-null' })
        .pipe(
          map((res: HttpResponse<IFlotteur[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IFlotteur[]) => {
          if (!moniteur.flotteur || !moniteur.flotteur.id) {
            this.flotteurs = resBody;
          } else {
            this.flotteurService
              .find(moniteur.flotteur.id)
              .pipe(
                map((subRes: HttpResponse<IFlotteur>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IFlotteur[]) => (this.flotteurs = concatRes));
          }
        });

      this.voileService
        .query({ filter: 'moniteur-is-null' })
        .pipe(
          map((res: HttpResponse<IVoile[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IVoile[]) => {
          if (!moniteur.voile || !moniteur.voile.id) {
            this.voiles = resBody;
          } else {
            this.voileService
              .find(moniteur.voile.id)
              .pipe(
                map((subRes: HttpResponse<IVoile>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IVoile[]) => (this.voiles = concatRes));
          }
        });

      this.combinaisonService
        .query({ filter: 'moniteur-is-null' })
        .pipe(
          map((res: HttpResponse<ICombinaison[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICombinaison[]) => {
          if (!moniteur.combinaison || !moniteur.combinaison.id) {
            this.combinaisons = resBody;
          } else {
            this.combinaisonService
              .find(moniteur.combinaison.id)
              .pipe(
                map((subRes: HttpResponse<ICombinaison>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICombinaison[]) => (this.combinaisons = concatRes));
          }
        });
    });
  }

  updateForm(moniteur: IMoniteur): void {
    this.editForm.patchValue({
      id: moniteur.id,
      profil: moniteur.profil,
      flotteur: moniteur.flotteur,
      voile: moniteur.voile,
      combinaison: moniteur.combinaison,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const moniteur = this.createFromForm();
    if (moniteur.id !== undefined) {
      this.subscribeToSaveResponse(this.moniteurService.update(moniteur));
    } else {
      this.subscribeToSaveResponse(this.moniteurService.create(moniteur));
    }
  }

  private createFromForm(): IMoniteur {
    return {
      ...new Moniteur(),
      id: this.editForm.get(['id'])!.value,
      profil: this.editForm.get(['profil'])!.value,
      flotteur: this.editForm.get(['flotteur'])!.value,
      voile: this.editForm.get(['voile'])!.value,
      combinaison: this.editForm.get(['combinaison'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMoniteur>>): void {
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
