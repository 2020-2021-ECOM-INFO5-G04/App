import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMoniteur, Moniteur } from 'app/shared/model/moniteur.model';
import { MoniteurService } from './moniteur.service';
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
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';

type SelectableEntity = IProfil | IFlotteur | IVoile | ICombinaison;

@Component({
  selector: 'jhi-moniteur-update',
  templateUrl: './moniteur-update.component.html',
})
export class MoniteurUpdateComponent implements OnInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  errorUser = false;
  errorProfil = false;

  isSaving = false;

  flotteurs: IFlotteur[] = [];
  voiles: IVoile[] = [];
  combinaisons: ICombinaison[] = [];

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

    flotteur: [],
    voile: [],
    combinaison: [],
  });

  constructor(
    protected registerService: RegisterService,
    protected moniteurService: MoniteurService,
    protected userService: UserService,
    protected profilService: ProfilService,
    protected flotteurService: FlotteurService,
    protected voileService: VoileService,
    protected combinaisonService: CombinaisonService,
    protected activatedRoute: ActivatedRoute,
    protected languageService: JhiLanguageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ moniteur }) => {
      this.updateForm(moniteur);

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
    const profil = moniteur.profil;
    const user = profil?.utilisateur;

    this.editForm.patchValue({
      userId: user?.id,
      login: user?.login,
      email: user?.email,

      profilId: profil?.id,
      prenom: profil?.prenom,
      nom: profil?.nom,
      numTel: profil?.numTel,

      id: moniteur.id,
      profil,
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
    this.errorUser = false;
    this.errorProfil = false;

    const user = this.createUserFromForm();

    if (this.editForm.get(['id'])!.value !== undefined) {
      //If we are updating an existing moniteur
      this.userService.update(user).subscribe(
        responseUser => {
          const profil = this.createProfilFromForm(responseUser); //Create a Profil with the returned user
          this.profilService.update(profil).subscribe(
            responseProfil => {
              if (responseProfil.body != null) {
                const moniteur = this.createMoniteurFromForm(responseProfil.body);
                this.subscribeToSaveResponse(this.moniteurService.update(moniteur)); //Create a moniteur with the created profil
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
                const moniteur = this.createMoniteurFromForm(responseProfil.body);
                this.subscribeToSaveResponse(this.moniteurService.create(moniteur)); //Create a moniteur with the created profil
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
      authorities: ['ROLE_ADMIN', 'ROLE_MONITEUR'],
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

  private createMoniteurFromForm(profil: IProfil): IMoniteur {
    return {
      ...new Moniteur(),
      id: this.editForm.get(['id'])!.value,
      profil,
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
