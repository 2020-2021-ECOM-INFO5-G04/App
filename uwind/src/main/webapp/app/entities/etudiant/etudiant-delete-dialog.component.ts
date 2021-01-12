import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';
import { ProfilService } from 'app/entities/profil/profil.service';
import { UserService } from 'app/core/user/user.service';

@Component({
  templateUrl: './etudiant-delete-dialog.component.html',
})
export class EtudiantDeleteDialogComponent {
  etudiant?: IEtudiant;

  constructor(
    protected etudiantService: EtudiantService,
    protected profilService: ProfilService,
    protected userService: UserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.etudiantService.find(id).subscribe(
      responseProfil => {
        if (responseProfil.body != null) {
          const etudiant = responseProfil.body;
          this.etudiantService.delete(id).subscribe(
            () => {
              //Deleting etudiant
              if (etudiant.profil?.id !== undefined) {
                this.profilService.delete(etudiant.profil.id).subscribe(
                  () => {
                    //Deleting profil
                    const user = etudiant.profil?.utilisateur;
                    if (user?.login !== undefined) {
                      this.userService.delete(user.login).subscribe(
                        () => {
                          //Deleting user
                          this.eventManager.broadcast('etudiantListModification');
                          this.activeModal.close();
                        },
                        errorUser => {
                          //TODO
                        }
                      );
                    } else {
                      //Unexisting user but no deleting problems
                      this.eventManager.broadcast('etudiantListModification');
                      this.activeModal.close();
                    }
                  },
                  errorProfil => {
                    //TODO
                  }
                );
              } else {
                //Unexisting profil but no deleting problems
                this.eventManager.broadcast('etudiantListModification');
                this.activeModal.close();
              }
            },
            errorEtudiant => {
              //TODO
            }
          );
        } else {
          //TODO
        }
      },
      errorFindEtudiant => {
        //TODO
      }
    );
  }
}
