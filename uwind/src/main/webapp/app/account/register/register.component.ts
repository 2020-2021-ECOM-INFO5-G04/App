import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { RegisterService } from './register.service';
import { EtudiantService } from '../../entities/etudiant/etudiant.service';
import { ProfilService } from 'app/entities/profil/profil.service';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  registerForm = this.fb.group({
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
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],

    //Relative to a student
    niveauScolaire: [null, [Validators.required]],
    departement: [null, [Validators.required]],
    niveauPlanche: [null, [Validators.required]],
    permisDeConduire: [null, [Validators.required]],
    lieuDepart: [null, [Validators.required]],
    optionSemestre: [null, [Validators.required]],
    profil: [],
    flotteur: [],
    voile: [],
    combinaison: [],
    gestionnaire: [],
  });

  constructor(
    private languageService: JhiLanguageService,
    private loginModalService: LoginModalService,
    private registerService: RegisterService,
    private userService: UserService, //to retrieve lastly created user
    private profilService: ProfilService, //to create new profile
    private etudiantService: EtudiantService, //to create new student
    private fb: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      const login = this.registerForm.get(['login'])!.value;
      const email = this.registerForm.get(['email'])!.value;

      //creating a new profil
      const prenom = this.registerForm.get(['prenom'])!.value;
      const nom = this.registerForm.get(['nom'])!.value;
      const numTel = this.registerForm.get(['numTel'])!.value;

      //creating an Etudiant entity after inscription
      const niveauScolaire = this.registerForm.get(['niveauScolaire'])!.value;
      const departement = this.registerForm.get(['departement'])!.value;
      const niveauPlanche = this.registerForm.get(['niveauPlanche'])!.value;
      const permisDeConduire = this.registerForm.get(['permisDeConduire'])!.value;
      const lieuDepart = this.registerForm.get(['lieuDepart'])!.value;
      const optionSemestre = this.registerForm.get(['optionSemestre'])!.value;

      //Saving user
      this.registerService.save({ login, email, password, langKey: this.languageService.getCurrentLanguage() }).subscribe(
        () => (this.success = true),
        response => this.processError(response)
      );

      /*
      //Pushing profil to DB
      this.userService.find(login).subscribe( response => )

      this.ProfilService.create ( {id, prenom, nom, email, numTel, utilisateur).subscribe(
        () => (this.success = true),
        response => this.processError(response)
      );
      
      //Pushing student to DB
      this.etudiantService.create({ , niveauScolaire, departement, niveauPlanche,
      permisDeConduire, lieuDepart, optionSemestre, false, profil, [], [], [], [] }).subscribe(
        () => (this.success = true),
        response => this.processError(response)
      );*/
    }
  }

  openLogin(): void {
    this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
