import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { MoniteurDetailComponent } from 'app/entities/moniteur/moniteur-detail.component';
import { Moniteur } from 'app/shared/model/moniteur.model';

describe('Component Tests', () => {
  describe('Moniteur Management Detail Component', () => {
    let comp: MoniteurDetailComponent;
    let fixture: ComponentFixture<MoniteurDetailComponent>;
    const route = ({ data: of({ moniteur: new Moniteur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [MoniteurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MoniteurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MoniteurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load moniteur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.moniteur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
