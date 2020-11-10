import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VoileService } from 'app/entities/voile/voile.service';
import { IVoile, Voile } from 'app/shared/model/voile.model';
import { NomVoile } from 'app/shared/model/enumerations/nom-voile.model';
import { NiveauPlancheAVoile } from 'app/shared/model/enumerations/niveau-planche-a-voile.model';

describe('Service Tests', () => {
  describe('Voile Service', () => {
    let injector: TestBed;
    let service: VoileService;
    let httpMock: HttpTestingController;
    let elemDefault: IVoile;
    let expectedResult: IVoile | IVoile[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(VoileService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Voile(0, NomVoile.Loft_Purelip, 0, NiveauPlancheAVoile.Deb, false, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Voile', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Voile()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Voile', () => {
        const returnedFromService = Object.assign(
          {
            nomComplet: 'BBBBBB',
            surface: 1,
            niveau: 'BBBBBB',
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

      it('should return a list of Voile', () => {
        const returnedFromService = Object.assign(
          {
            nomComplet: 'BBBBBB',
            surface: 1,
            niveau: 'BBBBBB',
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

      it('should delete a Voile', () => {
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
