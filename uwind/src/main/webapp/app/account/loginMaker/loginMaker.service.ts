import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginMakerService {
  nom?: string;
  prenom?: string;
  login?: string;
  res = false;

  public resourceUrl = SERVER_API_URL + 'api/checkLogin';

  constructor(private http: HttpClient) {}

  async makeLogin(nom: string, prenom: string): Promise<string> {
    this.nom = nom.replace(/\s/g, '');
    this.prenom = prenom.replace(/\s/g, '');
    this.login = this.nom + this.prenom[0] + this.prenom[1];
    let i = 1;
    this.res = await this.checkLogin(this.login).toPromise();
    while (this.res && i < 5) {
      this.login = this.nom + this.prenom[0] + this.prenom[1] + i;
      i++;
      this.res = await this.checkLogin(this.login).toPromise();
    }
    return this.login;
  }

  checkLogin(login: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.resourceUrl}/${login}`);
  }
}
