import { NomVoile } from 'app/shared/model/enumerations/nom-voile.model';
import { NiveauPlancheAVoile } from 'app/shared/model/enumerations/niveau-planche-a-voile.model';

export interface IVoile {
  id?: number;
  nomComplet?: NomVoile;
  surface?: number;
  niveau?: NiveauPlancheAVoile;
  utilisable?: boolean;
  commentaire?: string;
}

export class Voile implements IVoile {
  constructor(
    public id?: number,
    public nomComplet?: NomVoile,
    public surface?: number,
    public niveau?: NiveauPlancheAVoile,
    public utilisable?: boolean,
    public commentaire?: string
  ) {
    this.utilisable = this.utilisable || false;
  }
}
