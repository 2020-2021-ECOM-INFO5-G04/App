import { NomFlotteur } from 'app/shared/model/enumerations/nom-flotteur.model';
import { NiveauPlancheAVoile } from 'app/shared/model/enumerations/niveau-planche-a-voile.model';

export interface IFlotteur {
  id?: number;
  nom?: NomFlotteur;
  volume?: number;
  niveauPlancheAVoile?: NiveauPlancheAVoile;
  utilisable?: boolean;
  commentaire?: string;
}

export class Flotteur implements IFlotteur {
  constructor(
    public id?: number,
    public nom?: NomFlotteur,
    public volume?: number,
    public niveauPlancheAVoile?: NiveauPlancheAVoile,
    public utilisable?: boolean,
    public commentaire?: string
  ) {
    this.utilisable = this.utilisable || false;
  }
}
