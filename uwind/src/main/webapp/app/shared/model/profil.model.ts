import { IUser } from 'app/core/user/user.model';

export interface IProfil {
  id?: number;
  prenom?: string;
  nom?: string;
  email?: string;
  numTel?: string;
  utilisateur?: IUser;
}

export class Profil implements IProfil {
  constructor(
    public id?: number,
    public prenom?: string,
    public nom?: string,
    public email?: string,
    public numTel?: string,
    public utilisateur?: IUser
  ) {}
}
