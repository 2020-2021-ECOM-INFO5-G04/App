import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEtudiant, Etudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil/profil.service';
import { IFlotteur } from 'app/shared/model/flotteur.model';
import { FlotteurService } from 'app/entities/flotteur/flotteur.service';
import { IVoile } from 'app/shared/model/voile.model';
import { VoileService } from 'app/entities/voile/voile.service';
import { ICombinaison } from 'app/shared/model/combinaison.model';
import { CombinaisonService } from 'app/entities/combinaison/combinaison.service';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from 'app/entities/gestionnaire/gestionnaire.service';

type SelectableEntity = IProfil | IFlotteur | IVoile | ICombinaison | IGestionnaire;

@Component({
  selector: 'jhi-etudiant-update',
  templateUrl: './etudiant-update.component.html',
})
export class EtudiantUpdateComponent implements OnInit {
  isSaving = false;
  profils: IProfil[] = [];
  flotteurs: IFlotteur[] = [];
  voiles: IVoile[] = [];
  combinaisons: ICombinaison[] = [];
  gestionnaires: IGestionnaire[] = [];

  editForm = this.fb.group({
    id: [],
    niveauScolaire: [null, [Validators.required]],
    departement: [null, [Validators.required]],
    niveauPlanche: [null, [Validators.required]],
    permisDeConduire: [null, [Validators.required]],
    lieuDepart: [null, [Validators.required]],
    optionSemestre: [null, [Validators.required]],
    compteValide: [null, [Validators.required]],
    profil: [],
    flotteur: [],
    voile: [],
    combinaison: [],
    gestionnaire: [],
  });

  constructor(
    protected etudiantService: EtudiantService,
    protected profilService: ProfilService,
    protected flotteurService: FlotteurService,
    protected voileService: VoileService,
    protected combinaisonService: CombinaisonService,
    protected gestionnaireService: GestionnaireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etudiant }) => {
      this.updateForm(etudiant);

      this.profilService
        .query({ filter: 'etudiant-is-null' })
        .pipe(
          map((res: HttpResponse<IProfil[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProfil[]) => {
          if (!etudiant.profil || !etudiant.profil.id) {
            this.profils = resBody;
          } else {
            this.profilService
              .find(etudiant.profil.id)
              .pipe(
                map((subRes: HttpResponse<IProfil>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProfil[]) => (this.profils = concatRes));
          }
        });

      this.flotteurService
        .query({ filter: 'etudiant-is-null' })
        .pipe(
          map((res: HttpResponse<IFlotteur[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IFlotteur[]) => {
          if (!etudiant.flotteur || !etudiant.flotteur.id) {
            this.flotteurs = resBody;
          } else {
            this.flotteurService
              .find(etudiant.flotteur.id)
              .pipe(
                map((subRes: HttpResponse<IFlotteur>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IFlotteur[]) => (this.flotteurs = concatRes));
          }
        });

      this.voileService
        .query({ filter: 'etudiant-is-null' })
        .pipe(
          map((res: HttpResponse<IVoile[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IVoile[]) => {
          if (!etudiant.voile || !etudiant.voile.id) {
            this.voiles = resBody;
          } else {
            this.voileService
              .find(etudiant.voile.id)
              .pipe(
                map((subRes: HttpResponse<IVoile>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IVoile[]) => (this.voiles = concatRes));
          }
        });

      this.combinaisonService
        .query({ filter: 'etudiant-is-null' })
        .pipe(
          map((res: HttpResponse<ICombinaison[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICombinaison[]) => {
          if (!etudiant.combinaison || !etudiant.combinaison.id) {
            this.combinaisons = resBody;
          } else {
            this.combinaisonService
              .find(etudiant.combinaison.id)
              .pipe(
                map((subRes: HttpResponse<ICombinaison>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICombinaison[]) => (this.combinaisons = concatRes));
          }
        });

      this.gestionnaireService.query().subscribe((res: HttpResponse<IGestionnaire[]>) => (this.gestionnaires = res.body || []));
    });
  }

  updateForm(etudiant: IEtudiant): void {
    this.editForm.patchValue({
      id: etudiant.id,
      niveauScolaire: etudiant.niveauScolaire,
      departement: etudiant.departement,
      niveauPlanche: etudiant.niveauPlanche,
      permisDeConduire: etudiant.permisDeConduire,
      lieuDepart: etudiant.lieuDepart,
      optionSemestre: etudiant.optionSemestre,
      compteValide: etudiant.compteValide,
      profil: etudiant.profil,
      flotteur: etudiant.flotteur,
      voile: etudiant.voile,
      combinaison: etudiant.combinaison,
      gestionnaire: etudiant.gestionnaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etudiant = this.createFromForm();
    if (etudiant.id !== undefined) {
      this.subscribeToSaveResponse(this.etudiantService.update(etudiant));
    } else {
      this.subscribeToSaveResponse(this.etudiantService.create(etudiant));
    }
  }

  private createFromForm(): IEtudiant {
    return {
      ...new Etudiant(),
      id: this.editForm.get(['id'])!.value,
      niveauScolaire: this.editForm.get(['niveauScolaire'])!.value,
      departement: this.editForm.get(['departement'])!.value,
      niveauPlanche: this.editForm.get(['niveauPlanche'])!.value,
      permisDeConduire: this.editForm.get(['permisDeConduire'])!.value,
      lieuDepart: this.editForm.get(['lieuDepart'])!.value,
      optionSemestre: this.editForm.get(['optionSemestre'])!.value,
      compteValide: this.editForm.get(['compteValide'])!.value,
      profil: this.editForm.get(['profil'])!.value,
      flotteur: this.editForm.get(['flotteur'])!.value,
      voile: this.editForm.get(['voile'])!.value,
      combinaison: this.editForm.get(['combinaison'])!.value,
      gestionnaire: this.editForm.get(['gestionnaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtudiant>>): void {
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
