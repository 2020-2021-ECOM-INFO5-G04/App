import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { CombinaisonDetailComponent } from 'app/entities/combinaison/combinaison-detail.component';
import { Combinaison } from 'app/shared/model/combinaison.model';

describe('Component Tests', () => {
  describe('Combinaison Management Detail Component', () => {
    let comp: CombinaisonDetailComponent;
    let fixture: ComponentFixture<CombinaisonDetailComponent>;
    const route = ({ data: of({ combinaison: new Combinaison(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [CombinaisonDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CombinaisonDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CombinaisonDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load combinaison on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.combinaison).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
