import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UwindTestModule } from '../../../test.module';
import { SortieComponent } from 'app/entities/sortie/sortie.component';
import { SortieService } from 'app/entities/sortie/sortie.service';
import { Sortie } from 'app/shared/model/sortie.model';

describe('Component Tests', () => {
  describe('Sortie Management Component', () => {
    let comp: SortieComponent;
    let fixture: ComponentFixture<SortieComponent>;
    let service: SortieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [SortieComponent],
      })
        .overrideTemplate(SortieComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SortieComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SortieService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Sortie(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sorties && comp.sorties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
