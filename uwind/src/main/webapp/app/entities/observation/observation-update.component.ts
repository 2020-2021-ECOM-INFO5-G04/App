import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IObservation, Observation } from 'app/shared/model/observation.model';
import { ObservationService } from './observation.service';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/etudiant.service';
import { IMoniteur } from 'app/shared/model/moniteur.model';
import { MoniteurService } from 'app/entities/moniteur/moniteur.service';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from 'app/entities/gestionnaire/gestionnaire.service';

type SelectableEntity = IEtudiant | IMoniteur | IGestionnaire;

@Component({
  selector: 'jhi-observation-update',
  templateUrl: './observation-update.component.html',
})
export class ObservationUpdateComponent implements OnInit {
  isSaving = false;
  etudiants: IEtudiant[] = [];
  moniteurs: IMoniteur[] = [];
  gestionnaires: IGestionnaire[] = [];

  editForm = this.fb.group({
    id: [],
    observation: [null, [Validators.required]],
    etudiant: [],
    moniteur: [],
    gestionnaire: [],
  });

  constructor(
    protected observationService: ObservationService,
    protected etudiantService: EtudiantService,
    protected moniteurService: MoniteurService,
    protected gestionnaireService: GestionnaireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ observation }) => {
      this.updateForm(observation);

      this.etudiantService.query().subscribe((res: HttpResponse<IEtudiant[]>) => (this.etudiants = res.body || []));

      this.moniteurService.query().subscribe((res: HttpResponse<IMoniteur[]>) => (this.moniteurs = res.body || []));

      this.gestionnaireService.query().subscribe((res: HttpResponse<IGestionnaire[]>) => (this.gestionnaires = res.body || []));
    });
  }

  updateForm(observation: IObservation): void {
    this.editForm.patchValue({
      id: observation.id,
      observation: observation.observation,
      etudiant: observation.etudiant,
      moniteur: observation.moniteur,
      gestionnaire: observation.gestionnaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const observation = this.createFromForm();
    if (observation.id !== undefined) {
      this.subscribeToSaveResponse(this.observationService.update(observation));
    } else {
      this.subscribeToSaveResponse(this.observationService.create(observation));
    }
  }

  private createFromForm(): IObservation {
    return {
      ...new Observation(),
      id: this.editForm.get(['id'])!.value,
      observation: this.editForm.get(['observation'])!.value,
      etudiant: this.editForm.get(['etudiant'])!.value,
      moniteur: this.editForm.get(['moniteur'])!.value,
      gestionnaire: this.editForm.get(['gestionnaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IObservation>>): void {
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
