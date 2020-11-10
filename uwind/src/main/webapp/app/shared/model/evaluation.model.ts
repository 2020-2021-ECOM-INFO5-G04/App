import { IEtudiant } from 'app/shared/model/etudiant.model';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';

export interface IEvaluation {
  id?: number;
  note?: number;
  commentaire?: string;
  etudiant?: IEtudiant;
  gestionnaire?: IGestionnaire;
}

export class Evaluation implements IEvaluation {
  constructor(
    public id?: number,
    public note?: number,
    public commentaire?: string,
    public etudiant?: IEtudiant,
    public gestionnaire?: IGestionnaire
  ) {}
}
