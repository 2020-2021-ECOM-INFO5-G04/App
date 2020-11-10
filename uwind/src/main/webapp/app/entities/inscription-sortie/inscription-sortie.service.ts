import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInscriptionSortie } from 'app/shared/model/inscription-sortie.model';

type EntityResponseType = HttpResponse<IInscriptionSortie>;
type EntityArrayResponseType = HttpResponse<IInscriptionSortie[]>;

@Injectable({ providedIn: 'root' })
export class InscriptionSortieService {
  public resourceUrl = SERVER_API_URL + 'api/inscription-sorties';

  constructor(protected http: HttpClient) {}

  create(inscriptionSortie: IInscriptionSortie): Observable<EntityResponseType> {
    return this.http.post<IInscriptionSortie>(this.resourceUrl, inscriptionSortie, { observe: 'response' });
  }

  update(inscriptionSortie: IInscriptionSortie): Observable<EntityResponseType> {
    return this.http.put<IInscriptionSortie>(this.resourceUrl, inscriptionSortie, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInscriptionSortie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInscriptionSortie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
