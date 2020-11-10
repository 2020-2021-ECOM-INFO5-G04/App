import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UwindTestModule } from '../../../test.module';
import { ObservationComponent } from 'app/entities/observation/observation.component';
import { ObservationService } from 'app/entities/observation/observation.service';
import { Observation } from 'app/shared/model/observation.model';

describe('Component Tests', () => {
  describe('Observation Management Component', () => {
    let comp: ObservationComponent;
    let fixture: ComponentFixture<ObservationComponent>;
    let service: ObservationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [ObservationComponent],
      })
        .overrideTemplate(ObservationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ObservationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ObservationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Observation(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.observations && comp.observations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
