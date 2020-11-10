import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlotteurService } from 'app/entities/flotteur/flotteur.service';
import { IFlotteur, Flotteur } from 'app/shared/model/flotteur.model';
import { NomFlotteur } from 'app/shared/model/enumerations/nom-flotteur.model';
import { NiveauPlancheAVoile } from 'app/shared/model/enumerations/niveau-planche-a-voile.model';

describe('Service Tests', () => {
  describe('Flotteur Service', () => {
    let injector: TestBed;
    let service: FlotteurService;
    let httpMock: HttpTestingController;
    let elemDefault: IFlotteur;
    let expectedResult: IFlotteur | IFlotteur[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(FlotteurService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Flotteur(0, NomFlotteur.Beach, 0, NiveauPlancheAVoile.Deb, false, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Flotteur', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Flotteur()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Flotteur', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            volume: 1,
            niveauPlancheAVoile: 'BBBBBB',
            utilisable: true,
            commentaire: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Flotteur', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            volume: 1,
            niveauPlancheAVoile: 'BBBBBB',
            utilisable: true,
            commentaire: 'BBBBBB',
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

      it('should delete a Flotteur', () => {
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
