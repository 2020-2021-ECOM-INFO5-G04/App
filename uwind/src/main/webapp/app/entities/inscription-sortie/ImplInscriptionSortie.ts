import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInscriptionSortie, InscriptionSortie } from 'app/shared/model/inscription-sortie.model';
import { InscriptionSortieService } from './inscription-sortie.service';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/etudiant.service';
import { ISortie } from 'app/shared/model/sortie.model';
import { SortieService } from 'app/entities/sortie/sortie.service';
import { IMoniteur } from 'app/shared/model/moniteur.model';
import { MoniteurService } from 'app/entities/moniteur/moniteur.service';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from 'app/entities/gestionnaire/gestionnaire.service';

type SelectableEntity = IEtudiant | ISortie | IMoniteur | IGestionnaire;

@Component({
  selector: 'jhi-inscription-sortie-update',
  templateUrl: './inscription-sortie-update.component.html',
})
export class InscriptionSortieUpdateComponent implements OnInit {
  isSaving = false;
  etudiants: IEtudiant[] = [];
  sorties: ISortie[] = [];
  moniteurs: IMoniteur[] = [];
  gestionnaires: IGestionnaire[] = [];

  editForm = this.fb.group({
    id: [],
    etudiant: [],
    sortie: [],
    moniteur: [],
    gestionnaire: [],
  });

  constructor(
    protected inscriptionSortieService: InscriptionSortieService,
    protected etudiantService: EtudiantService,
    protected sortieService: SortieService,
    protected moniteurService: MoniteurService,
    protected gestionnaireService: GestionnaireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscriptionSortie }) => {
      this.updateForm(inscriptionSortie);

      this.etudiantService.query().subscribe((res: HttpResponse<IEtudiant[]>) => (this.etudiants = res.body || []));

      this.sortieService.query().subscribe((res: HttpResponse<ISortie[]>) => (this.sorties = res.body || []));

      this.moniteurService.query().subscribe((res: HttpResponse<IMoniteur[]>) => (this.moniteurs = res.body || []));

      this.gestionnaireService.query().subscribe((res: HttpResponse<IGestionnaire[]>) => (this.gestionnaires = res.body || []));
    });
  }

  updateForm(inscriptionSortie: IInscriptionSortie): void {
    this.editForm.patchValue({
      id: inscriptionSortie.id,
      etudiant: inscriptionSortie.etudiant,
      sortie: inscriptionSortie.sortie,
      moniteur: inscriptionSortie.moniteur,
      gestionnaire: inscriptionSortie.gestionnaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscriptionSortie = this.createFromForm();
    if (inscriptionSortie.id !== undefined) {
      this.subscribeToSaveResponse(this.inscriptionSortieService.update(inscriptionSortie));
    } else {
      this.subscribeToSaveResponse(this.inscriptionSortieService.create(inscriptionSortie));
    }
  }

  private createFromForm(): IInscriptionSortie {
    return {
      ...new InscriptionSortie(),
      id: this.editForm.get(['id'])!.value,
      etudiant: this.editForm.get(['etudiant'])!.value,
      sortie: this.editForm.get(['sortie'])!.value,
      moniteur: this.editForm.get(['moniteur'])!.value,
      gestionnaire: this.editForm.get(['gestionnaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscriptionSortie>>): void {
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
