import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { PrixDetailComponent } from 'app/entities/prix/prix-detail.component';
import { Prix } from 'app/shared/model/prix.model';

describe('Component Tests', () => {
  describe('Prix Management Detail Component', () => {
    let comp: PrixDetailComponent;
    let fixture: ComponentFixture<PrixDetailComponent>;
    const route = ({ data: of({ prix: new Prix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [PrixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PrixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load prix on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.prix).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
