import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CombinaisonService } from 'app/entities/combinaison/combinaison.service';
import { ICombinaison, Combinaison } from 'app/shared/model/combinaison.model';
import { NomCombinaison } from 'app/shared/model/enumerations/nom-combinaison.model';
import { TailleCombinaison } from 'app/shared/model/enumerations/taille-combinaison.model';
import { PoidsCombinaison } from 'app/shared/model/enumerations/poids-combinaison.model';

describe('Service Tests', () => {
  describe('Combinaison Service', () => {
    let injector: TestBed;
    let service: CombinaisonService;
    let httpMock: HttpTestingController;
    let elemDefault: ICombinaison;
    let expectedResult: ICombinaison | ICombinaison[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CombinaisonService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Combinaison(0, NomCombinaison.Decat_W, TailleCombinaison.T_150_155, PoidsCombinaison.P_50_55);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Combinaison', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Combinaison()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Combinaison', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            taille: 'BBBBBB',
            poids: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Combinaison', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            taille: 'BBBBBB',
            poids: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Combinaison', () => {
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
