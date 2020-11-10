import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { VoileUpdateComponent } from 'app/entities/voile/voile-update.component';
import { VoileService } from 'app/entities/voile/voile.service';
import { Voile } from 'app/shared/model/voile.model';

describe('Component Tests', () => {
  describe('Voile Management Update Component', () => {
    let comp: VoileUpdateComponent;
    let fixture: ComponentFixture<VoileUpdateComponent>;
    let service: VoileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [VoileUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(VoileUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VoileUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VoileService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Voile(123);
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
        const entity = new Voile();
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
