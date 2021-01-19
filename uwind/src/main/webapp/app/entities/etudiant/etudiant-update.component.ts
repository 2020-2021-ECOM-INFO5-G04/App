import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEtudiant, Etudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';
import { IProfil, Profil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil/profil.service';
import { IFlotteur } from 'app/shared/model/flotteur.model';
import { FlotteurService } from 'app/entities/flotteur/flotteur.service';
import { IVoile } from 'app/shared/model/voile.model';
import { VoileService } from 'app/entities/voile/voile.service';
import { ICombinaison } from 'app/shared/model/combinaison.model';
import { CombinaisonService } from 'app/entities/combinaison/combinaison.service';
import { RegisterService } from 'app/account/register/register.service';
import { IUser, User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { JhiLanguageService } from 'ng-jhipster';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from 'app/entities/gestionnaire/gestionnaire.service';

type SelectableEntity = IProfil | IFlotteur | IVoile | ICombinaison | IGestionnaire;

@Component({
  selector: 'jhi-etudiant-update',
  templateUrl: './etudiant-update.component.html',
})
export class EtudiantUpdateComponent implements OnInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  errorUser = false;
  errorProfil = false;

  isSaving = false;

  flotteurs: IFlotteur[] = [];
  voiles: IVoile[] = [];
  combinaisons: ICombinaison[] = [];
  gestionnaires: IGestionnaire[] = [];

  editForm = this.fb.group({
    id: [],
    profilId: [],
    userId: [],

    // Relative to an User
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],

    // Relative to a profile
    prenom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    nom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    numTel: [],

    niveauScolaire: [null, [Validators.required]],
    departement: [null, [Validators.required]],
    niveauPlanche: [null, [Validators.required]],
    permisDeConduire: [null, [Validators.required]],
    lieuDepart: [null, [Validators.required]],
    optionSemestre: [null, [Validators.required]],
    //compteValide: [null, [Validators.required]],
    profil: [],
    flotteur: [],
    voile: [],
    combinaison: [],
    gestionnaire: [],
  });

  constructor(
    protected registerService: RegisterService,
    protected etudiantService: EtudiantService,
    protected profilService: ProfilService,
    protected userService: UserService,
    protected flotteurService: FlotteurService,
    protected voileService: VoileService,
    protected combinaisonService: CombinaisonService,
    protected gestionnaireService: GestionnaireService,
    protected languageService: JhiLanguageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etudiant }) => {
      this.updateForm(etudiant);

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
    const profil = etudiant.profil;
    const user = profil?.utilisateur;

    this.editForm.patchValue({
      userId: user?.id,
      login: user?.login,
      email: user?.email,

      profilId: profil?.id,
      prenom: profil?.prenom,
      nom: profil?.nom,
      numTel: profil?.numTel,

      id: etudiant.id,
      niveauScolaire: etudiant.niveauScolaire,
      departement: etudiant.departement,
      niveauPlanche: etudiant.niveauPlanche,
      permisDeConduire: etudiant.permisDeConduire,
      lieuDepart: etudiant.lieuDepart,
      optionSemestre: etudiant.optionSemestre,
      //compteValide: etudiant.compteValide,
      profil,
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
    this.errorUser = false;
    this.errorProfil = false;

    const user = this.createUserFromForm();

    if (this.editForm.get(['id'])!.value !== undefined) {
      //If we are updating an existing etudiant
      this.userService.update(user).subscribe(
        responseUser => {
          const profil = this.createProfilFromForm(responseUser); //Create a Profil with the returned user
          this.profilService.update(profil).subscribe(
            responseProfil => {
              if (responseProfil.body != null) {
                const etudiant = this.createEtudiantFromForm(responseProfil.body);
                this.subscribeToSaveResponse(this.etudiantService.update(etudiant)); //Create an etudiant with the created profil
              }
            },
            errorProfil => {
              this.onSaveError();
              this.errorProfil = true;
            }
          );
        },
        error => {
          this.onSaveError();
          this.errorUser = true;
        }
      );
    } else {
      this.userService.create(user).subscribe(
        responseUser => {
          const profil = this.createProfilFromForm(responseUser); //Create a Profil with the created user
          this.profilService.create(profil).subscribe(
            responseProfil => {
              if (responseProfil.body != null) {
                const etudiant = this.createEtudiantFromForm(responseProfil.body);
                this.subscribeToSaveResponse(this.etudiantService.create(etudiant)); //Create an etudiant with the created profil
              } else {
                //TODO
              }
            },
            errorProfil => {
              this.onSaveError();
              this.errorProfil = true;
            }
          );
        },
        error => {
          this.onSaveError();
          this.errorUser = true;
        }
      );
    }
  }

  private createUserFromForm(): IUser {
    return {
      ...new User(),
      id: this.editForm.get(['userId'])!.value,
      login: this.editForm.get(['login'])!.value,
      firstName: this.editForm.get(['prenom'])!.value,
      lastName: this.editForm.get(['nom'])!.value,
      email: this.editForm.get(['email'])!.value,
      activated: true,
      langKey: this.languageService.getCurrentLanguage(),
      authorities: ['ROLE_USER', 'ROLE_ETUDIANT'],
      password: this.editForm.get(['login'])!.value,
    };
  }

  private createProfilFromForm(utilisateur: IUser): IProfil {
    return {
      ...new Profil(),
      id: this.editForm.get(['profilId'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      email: this.editForm.get(['email'])!.value,
      numTel: this.editForm.get(['numTel'])!.value != null ? this.editForm.get(['numTel'])!.value : '0000000000',
      utilisateur,
    };
  }

  private createEtudiantFromForm(profil: IProfil): IEtudiant {
    return {
      ...new Etudiant(),
      id: this.editForm.get(['id'])!.value,
      niveauScolaire: this.editForm.get(['niveauScolaire'])!.value,
      departement: this.editForm.get(['departement'])!.value,
      niveauPlanche: this.editForm.get(['niveauPlanche'])!.value,
      permisDeConduire: this.editForm.get(['permisDeConduire'])!.value,
      lieuDepart: this.editForm.get(['lieuDepart'])!.value,
      optionSemestre: this.editForm.get(['optionSemestre'])!.value,
      compteValide: true, //this.editForm.get(['compteValide'])!.value,
      profil,
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
