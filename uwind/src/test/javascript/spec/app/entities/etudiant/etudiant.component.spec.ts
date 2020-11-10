import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UwindTestModule } from '../../../test.module';
import { EtudiantComponent } from 'app/entities/etudiant/etudiant.component';
import { EtudiantService } from 'app/entities/etudiant/etudiant.service';
import { Etudiant } from 'app/shared/model/etudiant.model';

describe('Component Tests', () => {
  describe('Etudiant Management Component', () => {
    let comp: EtudiantComponent;
    let fixture: ComponentFixture<EtudiantComponent>;
    let service: EtudiantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UwindTestModule],
        declarations: [EtudiantComponent],
      })
        .overrideTemplate(EtudiantComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EtudiantComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EtudiantService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Etudiant(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.etudiants && comp.etudiants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
