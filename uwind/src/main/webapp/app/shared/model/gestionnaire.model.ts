import { IProfil } from 'app/shared/model/profil.model';
import { IEvaluation } from 'app/shared/model/evaluation.model';
import { IObservation } from 'app/shared/model/observation.model';
import { ISortie } from 'app/shared/model/sortie.model';
import { IInscriptionSortie } from 'app/shared/model/inscription-sortie.model';

export interface IGestionnaire {
  id?: number;
  profil?: IProfil;
  evaluations?: IEvaluation[];
  observations?: IObservation[];
  sorties?: ISortie[];
  inscriptionSorties?: IInscriptionSortie[];
}

export class Gestionnaire implements IGestionnaire {
  constructor(
    public id?: number,
    public profil?: IProfil,
    public evaluations?: IEvaluation[],
    public observations?: IObservation[],
    public sorties?: ISortie[],
    public inscriptionSorties?: IInscriptionSortie[]
  ) {}
}
