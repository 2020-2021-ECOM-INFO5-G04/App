import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { UwindTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { GestionnaireDeleteDialogComponent } from 'app/entities/gestionnaire/gestionnaire-delete-dialog.component';
import { GestionnaireService } from 'app/entities/gestionnaire/gestionnaire.service';

describe('Component Tests', () => {
  describe('Gestionnaire Management Delete Component', () => {
    let comp: GestionnaireDeleteDialogComponent;
    let fixture: ComponentFixture<GestionnaireDeleteDialogComponent>;
    let service: GestionnaireService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [GestionnaireDeleteDialogComponent],
      })
        .overrideTemplate(GestionnaireDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GestionnaireDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GestionnaireService);
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
