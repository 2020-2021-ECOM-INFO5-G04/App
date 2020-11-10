import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { ObservationUpdateComponent } from 'app/entities/observation/observation-update.component';
import { ObservationService } from 'app/entities/observation/observation.service';
import { Observation } from 'app/shared/model/observation.model';

describe('Component Tests', () => {
  describe('Observation Management Update Component', () => {
    let comp: ObservationUpdateComponent;
    let fixture: ComponentFixture<ObservationUpdateComponent>;
    let service: ObservationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [ObservationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ObservationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ObservationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ObservationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Observation(123);
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
        const entity = new Observation();
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
