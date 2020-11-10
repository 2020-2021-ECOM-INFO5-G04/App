import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { SortieUpdateComponent } from 'app/entities/sortie/sortie-update.component';
import { SortieService } from 'app/entities/sortie/sortie.service';
import { Sortie } from 'app/shared/model/sortie.model';

describe('Component Tests', () => {
  describe('Sortie Management Update Component', () => {
    let comp: SortieUpdateComponent;
    let fixture: ComponentFixture<SortieUpdateComponent>;
    let service: SortieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [SortieUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SortieUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SortieUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SortieService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Sortie(123);
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
        const entity = new Sortie();
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
