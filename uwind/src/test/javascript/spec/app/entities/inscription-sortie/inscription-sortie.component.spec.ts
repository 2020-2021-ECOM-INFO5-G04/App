import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UwindTestModule } from '../../../test.module';
import { InscriptionSortieComponent } from 'app/entities/inscription-sortie/inscription-sortie.component';
import { InscriptionSortieService } from 'app/entities/inscription-sortie/inscription-sortie.service';
import { InscriptionSortie } from 'app/shared/model/inscription-sortie.model';

describe('Component Tests', () => {
  describe('InscriptionSortie Management Component', () => {
    let comp: InscriptionSortieComponent;
    let fixture: ComponentFixture<InscriptionSortieComponent>;
    let service: InscriptionSortieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [InscriptionSortieComponent],
      })
        .overrideTemplate(InscriptionSortieComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InscriptionSortieComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InscriptionSortieService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InscriptionSortie(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.inscriptionSorties && comp.inscriptionSorties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
