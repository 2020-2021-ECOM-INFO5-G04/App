import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { FlotteurUpdateComponent } from 'app/entities/flotteur/flotteur-update.component';
import { FlotteurService } from 'app/entities/flotteur/flotteur.service';
import { Flotteur } from 'app/shared/model/flotteur.model';

describe('Component Tests', () => {
  describe('Flotteur Management Update Component', () => {
    let comp: FlotteurUpdateComponent;
    let fixture: ComponentFixture<FlotteurUpdateComponent>;
    let service: FlotteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [FlotteurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FlotteurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FlotteurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FlotteurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Flotteur(123);
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
        const entity = new Flotteur();
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
