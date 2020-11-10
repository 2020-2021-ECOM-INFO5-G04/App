import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { CombinaisonUpdateComponent } from 'app/entities/combinaison/combinaison-update.component';
import { CombinaisonService } from 'app/entities/combinaison/combinaison.service';
import { Combinaison } from 'app/shared/model/combinaison.model';

describe('Component Tests', () => {
  describe('Combinaison Management Update Component', () => {
    let comp: CombinaisonUpdateComponent;
    let fixture: ComponentFixture<CombinaisonUpdateComponent>;
    let service: CombinaisonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [CombinaisonUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CombinaisonUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CombinaisonUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CombinaisonService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Combinaison(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Combinaison();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
