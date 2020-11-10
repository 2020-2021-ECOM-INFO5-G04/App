import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { UwindTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { InscriptionSortieDeleteDialogComponent } from 'app/entities/inscription-sortie/inscription-sortie-delete-dialog.component';
import { InscriptionSortieService } from 'app/entities/inscription-sortie/inscription-sortie.service';

describe('Component Tests', () => {
  describe('InscriptionSortie Management Delete Component', () => {
    let comp: InscriptionSortieDeleteDialogComponent;
    let fixture: ComponentFixture<InscriptionSortieDeleteDialogComponent>;
    let service: InscriptionSortieService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [InscriptionSortieDeleteDialogComponent],
      })
        .overrideTemplate(InscriptionSortieDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InscriptionSortieDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InscriptionSortieService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
