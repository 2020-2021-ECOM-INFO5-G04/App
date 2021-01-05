import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMoniteur } from 'app/shared/model/moniteur.model';
import { MoniteurService } from './moniteur.service';
import { ProfilService } from 'app/entities/profil/profil.service';
import { UserService } from 'app/core/user/user.service';

@Component({
  templateUrl: './moniteur-delete-dialog.component.html',
})
export class MoniteurDeleteDialogComponent {
  moniteur?: IMoniteur;

  constructor(
    protected moniteurService: MoniteurService,
    protected profilService: ProfilService,
    protected userService: UserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.moniteurService.find(id).subscribe(
      responseProfil => {
        if (responseProfil.body != null) {
          const moniteur = responseProfil.body;
          this.moniteurService.delete(id).subscribe(
            () => {
              //Deleting moniteur
              if (moniteur.profil?.id !== undefined) {
                this.profilService.delete(moniteur.profil.id).subscribe(
                  () => {
                    //Deleting profil
                    const user = moniteur.profil?.utilisateur;
                    if (user?.login !== undefined) {
                      this.userService.delete(user.login).subscribe(
                        () => {
                          //Deleting user
                          this.eventManager.broadcast('moniteurListModification');
                          this.activeModal.close();
                        },
                        errorUser => {
                          //TODO
                        }
                      );
                    } else {
                      //Unexisting user but no deleting problems
                      this.eventManager.broadcast('moniteurListModification');
                      this.activeModal.close();
                    }
                  },
                  errorProfil => {
                    //TODO
                  }
                );
              } else {
                //Unexisting profil but no deleting problems
                this.eventManager.broadcast('moniteurListModification');
                this.activeModal.close();
              }
            },
            errorMoniteur => {
              //TODO
            }
          );
        } else {
          //TODO
        }
      },
      errorFindMoniteur => {
        //TODO
      }
    );
  }
}
