import { IEtudiant } from 'app/shared/model/etudiant.model';
import { IMoniteur } from 'app/shared/model/moniteur.model';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';

export interface IObservation {
  id?: number;
  observation?: string;
  etudiant?: IEtudiant;
  moniteur?: IMoniteur;
  gestionnaire?: IGestionnaire;
}

export class Observation implements IObservation {
  constructor(
    public id?: number,
    public observation?: string,
    public etudiant?: IEtudiant,
    public moniteur?: IMoniteur,
    public gestionnaire?: IGestionnaire
  ) {}
}
