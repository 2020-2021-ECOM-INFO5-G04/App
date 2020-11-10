import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UwindTestModule } from '../../../test.module';
import { VoileComponent } from 'app/entities/voile/voile.component';
import { VoileService } from 'app/entities/voile/voile.service';
import { Voile } from 'app/shared/model/voile.model';

describe('Component Tests', () => {
  describe('Voile Management Component', () => {
    let comp: VoileComponent;
    let fixture: ComponentFixture<VoileComponent>;
    let service: VoileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [VoileComponent],
      })
        .overrideTemplate(VoileComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VoileComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VoileService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Voile(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.voiles && comp.voiles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
