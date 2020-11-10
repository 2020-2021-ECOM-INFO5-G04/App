import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SortieService } from 'app/entities/sortie/sortie.service';
import { ISortie, Sortie } from 'app/shared/model/sortie.model';
import { PlanDEau } from 'app/shared/model/enumerations/plan-d-eau.model';

describe('Service Tests', () => {
  describe('Sortie Service', () => {
    let injector: TestBed;
    let service: SortieService;
    let httpMock: HttpTestingController;
    let elemDefault: ISortie;
    let expectedResult: ISortie | ISortie[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SortieService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Sortie(0, 'AAAAAAA', currentDate, PlanDEau.Laffrey, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Sortie', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.create(new Sortie()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Sortie', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            date: currentDate.format(DATE_FORMAT),
            planDeau: 'BBBBBB',
            coeff: 1,
            commentaire: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Sortie', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            date: currentDate.format(DATE_FORMAT),
            planDeau: 'BBBBBB',
            coeff: 1,
            commentaire: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Sortie', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
