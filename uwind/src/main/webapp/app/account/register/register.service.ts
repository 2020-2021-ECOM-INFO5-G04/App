import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IUser } from 'app/core/user/user.model';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient) {}

  save(account: IUser): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/register', account);
  }

  makeLogin(nom: string, prenom: string): string {
    const nom2 = nom.replace(/\s/g, '');
    const prenom2 = prenom.replace(/\s/g, '');
    return nom2 + prenom2[0] + prenom2[1];
  }
}
