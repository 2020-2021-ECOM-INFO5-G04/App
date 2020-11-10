import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { InscriptionSortieDetailComponent } from 'app/entities/inscription-sortie/inscription-sortie-detail.component';
import { InscriptionSortie } from 'app/shared/model/inscription-sortie.model';

describe('Component Tests', () => {
  describe('InscriptionSortie Management Detail Component', () => {
    let comp: InscriptionSortieDetailComponent;
    let fixture: ComponentFixture<InscriptionSortieDetailComponent>;
    const route = ({ data: of({ inscriptionSortie: new InscriptionSortie(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [InscriptionSortieDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(InscriptionSortieDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InscriptionSortieDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load inscriptionSortie on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.inscriptionSortie).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
