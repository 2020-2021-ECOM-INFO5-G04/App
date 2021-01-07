import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UwindTestModule } from '../../../test.module';
import { PrixComponent } from 'app/entities/prix/prix.component';
import { PrixService } from 'app/entities/prix/prix.service';
import { Prix } from 'app/shared/model/prix.model';

describe('Component Tests', () => {
  describe('Prix Management Component', () => {
    let comp: PrixComponent;
    let fixture: ComponentFixture<PrixComponent>;
    let service: PrixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [PrixComponent],
      })
        .overrideTemplate(PrixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Prix(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.prixes && comp.prixes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
