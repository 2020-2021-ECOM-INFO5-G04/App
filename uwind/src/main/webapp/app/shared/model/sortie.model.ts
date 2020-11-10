import { Moment } from 'moment';
import { IInscriptionSortie } from 'app/shared/model/inscription-sortie.model';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';
import { PlanDEau } from 'app/shared/model/enumerations/plan-d-eau.model';

export interface ISortie {
  id?: number;
  nom?: string;
  date?: Moment;
  planDeau?: PlanDEau;
  coeff?: number;
  commentaire?: string;
  inscriptionSorties?: IInscriptionSortie[];
  gestionnaire?: IGestionnaire;
}

export class Sortie implements ISortie {
  constructor(
    public id?: number,
    public nom?: string,
    public date?: Moment,
    public planDeau?: PlanDEau,
    public coeff?: number,
    public commentaire?: string,
    public inscriptionSorties?: IInscriptionSortie[],
    public gestionnaire?: IGestionnaire
  ) {}
}
