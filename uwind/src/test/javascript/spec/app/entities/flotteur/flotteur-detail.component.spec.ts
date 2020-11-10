import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { FlotteurDetailComponent } from 'app/entities/flotteur/flotteur-detail.component';
import { Flotteur } from 'app/shared/model/flotteur.model';

describe('Component Tests', () => {
  describe('Flotteur Management Detail Component', () => {
    let comp: FlotteurDetailComponent;
    let fixture: ComponentFixture<FlotteurDetailComponent>;
    const route = ({ data: of({ flotteur: new Flotteur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [FlotteurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FlotteurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FlotteurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load flotteur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.flotteur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
