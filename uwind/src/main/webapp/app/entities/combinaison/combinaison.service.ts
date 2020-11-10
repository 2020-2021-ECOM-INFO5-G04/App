import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICombinaison } from 'app/shared/model/combinaison.model';

type EntityResponseType = HttpResponse<ICombinaison>;
type EntityArrayResponseType = HttpResponse<ICombinaison[]>;

@Injectable({ providedIn: 'root' })
export class CombinaisonService {
  public resourceUrl = SERVER_API_URL + 'api/combinaisons';

  constructor(protected http: HttpClient) {}

  create(combinaison: ICombinaison): Observable<EntityResponseType> {
    return this.http.post<ICombinaison>(this.resourceUrl, combinaison, { observe: 'response' });
  }

  update(combinaison: ICombinaison): Observable<EntityResponseType> {
    return this.http.put<ICombinaison>(this.resourceUrl, combinaison, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICombinaison>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICombinaison[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
