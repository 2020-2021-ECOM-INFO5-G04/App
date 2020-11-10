import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISortie } from 'app/shared/model/sortie.model';

type EntityResponseType = HttpResponse<ISortie>;
type EntityArrayResponseType = HttpResponse<ISortie[]>;

@Injectable({ providedIn: 'root' })
export class SortieService {
  public resourceUrl = SERVER_API_URL + 'api/sorties';

  constructor(protected http: HttpClient) {}

  create(sortie: ISortie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sortie);
    return this.http
      .post<ISortie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sortie: ISortie): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sortie);
    return this.http
      .put<ISortie>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISortie>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISortie[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(sortie: ISortie): ISortie {
    const copy: ISortie = Object.assign({}, sortie, {
      date: sortie.date && sortie.date.isValid() ? sortie.date.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((sortie: ISortie) => {
        sortie.date = sortie.date ? moment(sortie.date) : undefined;
      });
    }
    return res;
  }
}
