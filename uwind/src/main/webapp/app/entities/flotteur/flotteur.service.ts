import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFlotteur } from 'app/shared/model/flotteur.model';

type EntityResponseType = HttpResponse<IFlotteur>;
type EntityArrayResponseType = HttpResponse<IFlotteur[]>;

@Injectable({ providedIn: 'root' })
export class FlotteurService {
  public resourceUrl = SERVER_API_URL + 'api/flotteurs';

  constructor(protected http: HttpClient) {}

  create(flotteur: IFlotteur): Observable<EntityResponseType> {
    return this.http.post<IFlotteur>(this.resourceUrl, flotteur, { observe: 'response' });
  }

  update(flotteur: IFlotteur): Observable<EntityResponseType> {
    return this.http.put<IFlotteur>(this.resourceUrl, flotteur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFlotteur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFlotteur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
