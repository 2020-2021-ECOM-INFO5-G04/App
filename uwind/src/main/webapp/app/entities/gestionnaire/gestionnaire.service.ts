import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGestionnaire } from 'app/shared/model/gestionnaire.model';

type EntityResponseType = HttpResponse<IGestionnaire>;
type EntityArrayResponseType = HttpResponse<IGestionnaire[]>;

@Injectable({ providedIn: 'root' })
export class GestionnaireService {
  public resourceUrl = SERVER_API_URL + 'api/gestionnaires';

  constructor(protected http: HttpClient) {}

  create(gestionnaire: IGestionnaire): Observable<EntityResponseType> {
    return this.http.post<IGestionnaire>(this.resourceUrl, gestionnaire, { observe: 'response' });
  }

  update(gestionnaire: IGestionnaire): Observable<EntityResponseType> {
    return this.http.put<IGestionnaire>(this.resourceUrl, gestionnaire, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGestionnaire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGestionnaire[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
