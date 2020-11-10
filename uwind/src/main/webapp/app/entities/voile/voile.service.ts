import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVoile } from 'app/shared/model/voile.model';

type EntityResponseType = HttpResponse<IVoile>;
type EntityArrayResponseType = HttpResponse<IVoile[]>;

@Injectable({ providedIn: 'root' })
export class VoileService {
  public resourceUrl = SERVER_API_URL + 'api/voiles';

  constructor(protected http: HttpClient) {}

  create(voile: IVoile): Observable<EntityResponseType> {
    return this.http.post<IVoile>(this.resourceUrl, voile, { observe: 'response' });
  }

  update(voile: IVoile): Observable<EntityResponseType> {
    return this.http.put<IVoile>(this.resourceUrl, voile, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVoile>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVoile[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
