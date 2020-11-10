import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UwindTestModule } from '../../../test.module';
import { FlotteurComponent } from 'app/entities/flotteur/flotteur.component';
import { FlotteurService } from 'app/entities/flotteur/flotteur.service';
import { Flotteur } from 'app/shared/model/flotteur.model';

describe('Component Tests', () => {
  describe('Flotteur Management Component', () => {
    let comp: FlotteurComponent;
    let fixture: ComponentFixture<FlotteurComponent>;
    let service: FlotteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [FlotteurComponent],
      })
        .overrideTemplate(FlotteurComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FlotteurComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FlotteurService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Flotteur(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.flotteurs && comp.flotteurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
