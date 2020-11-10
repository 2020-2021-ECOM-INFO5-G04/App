import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProfil, Profil } from 'app/shared/model/profil.model';
import { ProfilService } from './profil.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-profil-update',
  templateUrl: './profil-update.component.html',
})
export class ProfilUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    prenom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    nom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+.[^@\\s]+$')]],
    numTel: [null, [Validators.required, Validators.minLength(10)]],
    utilisateur: [],
  });

  constructor(
    protected profilService: ProfilService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profil }) => {
      this.updateForm(profil);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(profil: IProfil): void {
    this.editForm.patchValue({
      id: profil.id,
      prenom: profil.prenom,
      nom: profil.nom,
      email: profil.email,
      numTel: profil.numTel,
      utilisateur: profil.utilisateur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profil = this.createFromForm();
    if (profil.id !== undefined) {
      this.subscribeToSaveResponse(this.profilService.update(profil));
    } else {
      this.subscribeToSaveResponse(this.profilService.create(profil));
    }
  }

  private createFromForm(): IProfil {
    return {
      ...new Profil(),
      id: this.editForm.get(['id'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      email: this.editForm.get(['email'])!.value,
      numTel: this.editForm.get(['numTel'])!.value,
      utilisateur: this.editForm.get(['utilisateur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfil>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
