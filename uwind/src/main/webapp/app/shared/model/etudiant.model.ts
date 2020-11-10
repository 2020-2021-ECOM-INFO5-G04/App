import { IProfil } from 'app/shared/model/profil.model';
import { IFlotteur } from 'app/shared/model/flotteur.model';
import { IVoile } from 'app/shared/model/voile.model';
import { ICombinaison } from 'app/shared/model/combinaison.model';
import { IObservation } from 'app/shared/model/observation.model';
import { IEvaluation } from 'app/shared/model/evaluation.model';
import { IInscriptionSortie } from 'app/shared/model/inscription-sortie.model';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { NiveauEtudes } from 'app/shared/model/enumerations/niveau-etudes.model';
import { Filiere } from 'app/shared/model/enumerations/filiere.model';
import { NiveauPlancheAVoile } from 'app/shared/model/enumerations/niveau-planche-a-voile.model';

export interface IEtudiant {
  id?: number;
  niveauScolaire?: NiveauEtudes;
  departement?: Filiere;
  niveauPlanche?: NiveauPlancheAVoile;
  permisDeConduire?: boolean;
  lieuDepart?: string;
  optionSemestre?: boolean;
  compteValide?: boolean;
  profil?: IProfil;
  flotteur?: IFlotteur;
  voile?: IVoile;
  combinaison?: ICombinaison;
  observations?: IObservation[];
  evaluations?: IEvaluation[];
  inscriptionSorties?: IInscriptionSortie[];
  gestionnaire?: IGestionnaire;
}

export class Etudiant implements IEtudiant {
  constructor(
    public id?: number,
    public niveauScolaire?: NiveauEtudes,
    public departement?: Filiere,
    public niveauPlanche?: NiveauPlancheAVoile,
    public permisDeConduire?: boolean,
    public lieuDepart?: string,
    public optionSemestre?: boolean,
    public compteValide?: boolean,
    public profil?: IProfil,
    public flotteur?: IFlotteur,
    public voile?: IVoile,
    public combinaison?: ICombinaison,
    public observations?: IObservation[],
    public evaluations?: IEvaluation[],
    public inscriptionSorties?: IInscriptionSortie[],
    public gestionnaire?: IGestionnaire
  ) {
    this.permisDeConduire = this.permisDeConduire || false;
    this.optionSemestre = this.optionSemestre || false;
    this.compteValide = this.compteValide || false;
  }
}
