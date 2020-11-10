import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UwindTestModule } from '../../../test.module';
import { InscriptionSortieUpdateComponent } from 'app/entities/inscription-sortie/inscription-sortie-update.component';
import { InscriptionSortieService } from 'app/entities/inscription-sortie/inscription-sortie.service';
import { InscriptionSortie } from 'app/shared/model/inscription-sortie.model';

describe('Component Tests', () => {
  describe('InscriptionSortie Management Update Component', () => {
    let comp: InscriptionSortieUpdateComponent;
    let fixture: ComponentFixture<InscriptionSortieUpdateComponent>;
    let service: InscriptionSortieService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [InscriptionSortieUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(InscriptionSortieUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InscriptionSortieUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InscriptionSortieService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InscriptionSortie(123);
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
        const entity = new InscriptionSortie();
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
