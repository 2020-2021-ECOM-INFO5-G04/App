import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { GestionnaireService } from './gestionnaire.service';
import { ProfilService } from 'app/entities/profil/profil.service';
import { UserService } from 'app/core/user/user.service';

@Component({
  templateUrl: './gestionnaire-delete-dialog.component.html',
})
export class GestionnaireDeleteDialogComponent {
  gestionnaire?: IGestionnaire;

  constructor(
    protected gestionnaireService: GestionnaireService,
    protected profilService: ProfilService,
    protected userService: UserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gestionnaireService.find(id).subscribe(
      responseProfil => {
        if (responseProfil.body != null) {
          const gestionnaire = responseProfil.body;
          this.gestionnaireService.delete(id).subscribe(
            () => {
              //Deleting gestionnaire
              if (gestionnaire.profil?.id !== undefined) {
                this.profilService.delete(gestionnaire.profil.id).subscribe(
                  () => {
                    //Deleting profil
                    const user = gestionnaire.profil?.utilisateur;
                    if (user?.login !== undefined) {
                      this.userService.delete(user.login).subscribe(
                        () => {
                          //Deleting user
                          this.eventManager.broadcast('gestionnaireListModification');
                          this.activeModal.close();
                        },
                        errorUser => {
                          //TODO
                        }
                      );
                    } else {
                      //Unexisting user but no deleting problems
                      this.eventManager.broadcast('gestionnaireListModification');
                      this.activeModal.close();
                    }
                  },
                  errorProfil => {
                    //TODO
                  }
                );
              } else {
                //Unexisting profil but no deleting problems
                this.eventManager.broadcast('gestionnaireListModification');
                this.activeModal.close();
              }
            },
            errorGestionnaire => {
              //TODO
            }
          );
        } else {
          //TODO
        }
      },
      errorFindGestionnaire => {
        //TODO
      }
    );
  }
}
