import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { GestionnaireDetailComponent } from 'app/entities/gestionnaire/gestionnaire-detail.component';
import { Gestionnaire } from 'app/shared/model/gestionnaire.model';

describe('Component Tests', () => {
  describe('Gestionnaire Management Detail Component', () => {
    let comp: GestionnaireDetailComponent;
    let fixture: ComponentFixture<GestionnaireDetailComponent>;
    const route = ({ data: of({ gestionnaire: new Gestionnaire(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [GestionnaireDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GestionnaireDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GestionnaireDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load gestionnaire on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gestionnaire).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
