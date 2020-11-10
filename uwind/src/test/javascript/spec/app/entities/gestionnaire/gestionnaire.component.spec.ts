import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UwindTestModule } from '../../../test.module';
import { GestionnaireComponent } from 'app/entities/gestionnaire/gestionnaire.component';
import { GestionnaireService } from 'app/entities/gestionnaire/gestionnaire.service';
import { Gestionnaire } from 'app/shared/model/gestionnaire.model';

describe('Component Tests', () => {
  describe('Gestionnaire Management Component', () => {
    let comp: GestionnaireComponent;
    let fixture: ComponentFixture<GestionnaireComponent>;
    let service: GestionnaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [GestionnaireComponent],
      })
        .overrideTemplate(GestionnaireComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GestionnaireComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GestionnaireService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Gestionnaire(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.gestionnaires && comp.gestionnaires[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
