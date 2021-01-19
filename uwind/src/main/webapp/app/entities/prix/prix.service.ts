import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPrix } from 'app/shared/model/prix.model';

type EntityResponseType = HttpResponse<IPrix>;
type EntityArrayResponseType = HttpResponse<IPrix[]>;

@Injectable({ providedIn: 'root' })
export class PrixService {
  public resourceUrl = SERVER_API_URL + 'api/prixes';

  constructor(protected http: HttpClient) {}

  create(prix: IPrix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prix);
    return this.http
      .post<IPrix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(prix: IPrix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prix);
    return this.http
      .put<IPrix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPrix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getActive(): Observable<EntityResponseType> {
    return this.http
      .get<IPrix>(`${this.resourceUrl}/getActive`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPrix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  activate(prix: IPrix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(prix);
    return this.http
      .put<IPrix>(`${this.resourceUrl}/activate`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  protected convertDateFromClient(prix: IPrix): IPrix {
    const copy: IPrix = Object.assign({}, prix, {
      date: prix.date && prix.date.isValid() ? prix.date.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((prix: IPrix) => {
        prix.date = prix.date ? moment(prix.date) : undefined;
      });
    }
    return res;
  }
}
