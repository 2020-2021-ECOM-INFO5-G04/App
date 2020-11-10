import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UwindTestModule } from '../../../test.module';
import { MoniteurComponent } from 'app/entities/moniteur/moniteur.component';
import { MoniteurService } from 'app/entities/moniteur/moniteur.service';
import { Moniteur } from 'app/shared/model/moniteur.model';

describe('Component Tests', () => {
  describe('Moniteur Management Component', () => {
    let comp: MoniteurComponent;
    let fixture: ComponentFixture<MoniteurComponent>;
    let service: MoniteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [MoniteurComponent],
      })
        .overrideTemplate(MoniteurComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MoniteurComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MoniteurService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Moniteur(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.moniteurs && comp.moniteurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
