import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { PrixUpdateComponent } from 'app/entities/prix/prix-update.component';
import { PrixService } from 'app/entities/prix/prix.service';
import { Prix } from 'app/shared/model/prix.model';

describe('Component Tests', () => {
  describe('Prix Management Update Component', () => {
    let comp: PrixUpdateComponent;
    let fixture: ComponentFixture<PrixUpdateComponent>;
    let service: PrixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [PrixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PrixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Prix(123);
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
        const entity = new Prix();
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
