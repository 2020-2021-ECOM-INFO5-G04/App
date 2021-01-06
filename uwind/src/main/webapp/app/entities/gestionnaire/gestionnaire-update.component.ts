import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IGestionnaire, Gestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from './gestionnaire.service';
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
  selector: 'jhi-gestionnaire-update',
  templateUrl: './gestionnaire-update.component.html',
})
export class GestionnaireUpdateComponent implements OnInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  errorUser = false;
  errorProfil = false;

  isSaving = false;

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
  });

  constructor(
    protected registerService: RegisterService,
    protected gestionnaireService: GestionnaireService,
    protected userService: UserService,
    protected profilService: ProfilService,
    protected activatedRoute: ActivatedRoute,
    protected languageService: JhiLanguageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gestionnaire }) => {
      this.updateForm(gestionnaire);
    });
  }

  updateForm(gestionnaire: IGestionnaire): void {
    const profil = gestionnaire.profil;
    const user = profil?.utilisateur;

    this.editForm.patchValue({
      userId: user?.id,
      login: user?.login,
      email: user?.email,

      profilId: profil?.id,
      prenom: profil?.prenom,
      nom: profil?.nom,
      numTel: profil?.numTel,

      id: gestionnaire.id,
      profil,
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
      //If we are updating an existing gestionnaire
      this.userService.update(user).subscribe(
        responseUser => {
          const profil = this.createProfilFromForm(responseUser); //Create a Profil with the returned user
          this.profilService.update(profil).subscribe(
            responseProfil => {
              if (responseProfil.body != null) {
                const gestionnaire = this.createGestionnaireFromForm(responseProfil.body);
                this.subscribeToSaveResponse(this.gestionnaireService.update(gestionnaire)); //Create a gestionnaire with the created profil
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
                const gestionnaire = this.createGestionnaireFromForm(responseProfil.body);
                this.subscribeToSaveResponse(this.gestionnaireService.create(gestionnaire)); //Create a gestionnaire with the created profil
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
      authorities: ['ROLE_ADMIN', 'ROLE_GESTIONNAIRE'],
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

  private createGestionnaireFromForm(profil: IProfil): IGestionnaire {
    return {
      ...new Gestionnaire(),
      id: this.editForm.get(['id'])!.value,
      profil,
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
