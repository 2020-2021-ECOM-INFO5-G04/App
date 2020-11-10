import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { ObservationDetailComponent } from 'app/entities/observation/observation-detail.component';
import { Observation } from 'app/shared/model/observation.model';

describe('Component Tests', () => {
  describe('Observation Management Detail Component', () => {
    let comp: ObservationDetailComponent;
    let fixture: ComponentFixture<ObservationDetailComponent>;
    const route = ({ data: of({ observation: new Observation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [ObservationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ObservationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ObservationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load observation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.observation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
