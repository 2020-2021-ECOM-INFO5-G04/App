import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { GestionnaireUpdateComponent } from 'app/entities/gestionnaire/gestionnaire-update.component';
import { GestionnaireService } from 'app/entities/gestionnaire/gestionnaire.service';
import { Gestionnaire } from 'app/shared/model/gestionnaire.model';

describe('Component Tests', () => {
  describe('Gestionnaire Management Update Component', () => {
    let comp: GestionnaireUpdateComponent;
    let fixture: ComponentFixture<GestionnaireUpdateComponent>;
    let service: GestionnaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [GestionnaireUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GestionnaireUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GestionnaireUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GestionnaireService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Gestionnaire(123);
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
        const entity = new Gestionnaire();
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
