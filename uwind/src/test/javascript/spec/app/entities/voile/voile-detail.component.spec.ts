import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { VoileDetailComponent } from 'app/entities/voile/voile-detail.component';
import { Voile } from 'app/shared/model/voile.model';

describe('Component Tests', () => {
  describe('Voile Management Detail Component', () => {
    let comp: VoileDetailComponent;
    let fixture: ComponentFixture<VoileDetailComponent>;
    const route = ({ data: of({ voile: new Voile(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [VoileDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(VoileDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VoileDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load voile on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.voile).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
