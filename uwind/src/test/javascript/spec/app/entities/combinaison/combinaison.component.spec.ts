import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UwindTestModule } from '../../../test.module';
import { CombinaisonComponent } from 'app/entities/combinaison/combinaison.component';
import { CombinaisonService } from 'app/entities/combinaison/combinaison.service';
import { Combinaison } from 'app/shared/model/combinaison.model';

describe('Component Tests', () => {
  describe('Combinaison Management Component', () => {
    let comp: CombinaisonComponent;
    let fixture: ComponentFixture<CombinaisonComponent>;
    let service: CombinaisonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [CombinaisonComponent],
      })
        .overrideTemplate(CombinaisonComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CombinaisonComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CombinaisonService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Combinaison(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.combinaisons && comp.combinaisons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
