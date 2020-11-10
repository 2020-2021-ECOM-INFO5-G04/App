import { IEtudiant } from 'app/shared/model/etudiant.model';
import { ISortie } from 'app/shared/model/sortie.model';
import { IMoniteur } from 'app/shared/model/moniteur.model';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';

export interface IInscriptionSortie {
  id?: number;
  etudiant?: IEtudiant;
  sortie?: ISortie;
  moniteur?: IMoniteur;
  gestionnaire?: IGestionnaire;
}

export class InscriptionSortie implements IInscriptionSortie {
  constructor(
    public id?: number,
    public etudiant?: IEtudiant,
    public sortie?: ISortie,
    public moniteur?: IMoniteur,
    public gestionnaire?: IGestionnaire
  ) {}
}
