import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { MoniteurUpdateComponent } from 'app/entities/moniteur/moniteur-update.component';
import { MoniteurService } from 'app/entities/moniteur/moniteur.service';
import { Moniteur } from 'app/shared/model/moniteur.model';

describe('Component Tests', () => {
  describe('Moniteur Management Update Component', () => {
    let comp: MoniteurUpdateComponent;
    let fixture: ComponentFixture<MoniteurUpdateComponent>;
    let service: MoniteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [MoniteurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MoniteurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MoniteurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MoniteurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Moniteur(123);
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
        const entity = new Moniteur();
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
