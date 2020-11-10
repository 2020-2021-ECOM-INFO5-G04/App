import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMoniteur } from 'app/shared/model/moniteur.model';

type EntityResponseType = HttpResponse<IMoniteur>;
type EntityArrayResponseType = HttpResponse<IMoniteur[]>;

@Injectable({ providedIn: 'root' })
export class MoniteurService {
  public resourceUrl = SERVER_API_URL + 'api/moniteurs';

  constructor(protected http: HttpClient) {}

  create(moniteur: IMoniteur): Observable<EntityResponseType> {
    return this.http.post<IMoniteur>(this.resourceUrl, moniteur, { observe: 'response' });
  }

  update(moniteur: IMoniteur): Observable<EntityResponseType> {
    return this.http.put<IMoniteur>(this.resourceUrl, moniteur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMoniteur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMoniteur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
