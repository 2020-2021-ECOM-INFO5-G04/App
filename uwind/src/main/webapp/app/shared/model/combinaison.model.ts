import { NomCombinaison } from 'app/shared/model/enumerations/nom-combinaison.model';
import { TailleCombinaison } from 'app/shared/model/enumerations/taille-combinaison.model';
import { PoidsCombinaison } from 'app/shared/model/enumerations/poids-combinaison.model';

export interface ICombinaison {
  id?: number;
  nom?: NomCombinaison;
  taille?: TailleCombinaison;
  poids?: PoidsCombinaison;
}

export class Combinaison implements ICombinaison {
  constructor(public id?: number, public nom?: NomCombinaison, public taille?: TailleCombinaison, public poids?: PoidsCombinaison) {}
}
