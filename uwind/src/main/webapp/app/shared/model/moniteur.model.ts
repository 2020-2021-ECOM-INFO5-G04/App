import { IProfil } from 'app/shared/model/profil.model';
import { IFlotteur } from 'app/shared/model/flotteur.model';
import { IVoile } from 'app/shared/model/voile.model';
import { ICombinaison } from 'app/shared/model/combinaison.model';
import { IObservation } from 'app/shared/model/observation.model';
import { IInscriptionSortie } from 'app/shared/model/inscription-sortie.model';

export interface IMoniteur {
  id?: number;
  profil?: IProfil;
  flotteur?: IFlotteur;
  voile?: IVoile;
  combinaison?: ICombinaison;
  observations?: IObservation[];
  inscriptionSorties?: IInscriptionSortie[];
}

export class Moniteur implements IMoniteur {
  constructor(
    public id?: number,
    public profil?: IProfil,
    public flotteur?: IFlotteur,
    public voile?: IVoile,
    public combinaison?: ICombinaison,
    public observations?: IObservation[],
    public inscriptionSorties?: IInscriptionSortie[]
  ) {}
}
