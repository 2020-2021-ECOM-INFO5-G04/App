import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EtudiantComponentsPage, EtudiantDeleteDialog, EtudiantUpdatePage } from './etudiant.page-object';

const expect = chai.expect;

describe('Etudiant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let etudiantComponentsPage: EtudiantComponentsPage;
  let etudiantUpdatePage: EtudiantUpdatePage;
  let etudiantDeleteDialog: EtudiantDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Etudiants', async () => {
    await navBarPage.goToEntity('etudiant');
    etudiantComponentsPage = new EtudiantComponentsPage();
    await browser.wait(ec.visibilityOf(etudiantComponentsPage.title), 5000);
    expect(await etudiantComponentsPage.getTitle()).to.eq('uwindApp.etudiant.home.title');
    await browser.wait(ec.or(ec.visibilityOf(etudiantComponentsPage.entities), ec.visibilityOf(etudiantComponentsPage.noResult)), 1000);
  });

  it('should load create Etudiant page', async () => {
    await etudiantComponentsPage.clickOnCreateButton();
    etudiantUpdatePage = new EtudiantUpdatePage();
    expect(await etudiantUpdatePage.getPageTitle()).to.eq('uwindApp.etudiant.home.createOrEditLabel');
    await etudiantUpdatePage.cancel();
  });

  it('should create and save Etudiants', async () => {
    const nbButtonsBeforeCreate = await etudiantComponentsPage.countDeleteButtons();

    await etudiantComponentsPage.clickOnCreateButton();

    await promise.all([
      etudiantUpdatePage.niveauScolaireSelectLastOption(),
      etudiantUpdatePage.departementSelectLastOption(),
      etudiantUpdatePage.niveauPlancheSelectLastOption(),
      etudiantUpdatePage.setLieuDepartInput('lieuDepart'),
      etudiantUpdatePage.profilSelectLastOption(),
      etudiantUpdatePage.flotteurSelectLastOption(),
      etudiantUpdatePage.voileSelectLastOption(),
      etudiantUpdatePage.combinaisonSelectLastOption(),
      etudiantUpdatePage.gestionnaireSelectLastOption(),
    ]);

    const selectedPermisDeConduire = etudiantUpdatePage.getPermisDeConduireInput();
    if (await selectedPermisDeConduire.isSelected()) {
      await etudiantUpdatePage.getPermisDeConduireInput().click();
      expect(await etudiantUpdatePage.getPermisDeConduireInput().isSelected(), 'Expected permisDeConduire not to be selected').to.be.false;
    } else {
      await etudiantUpdatePage.getPermisDeConduireInput().click();
      expect(await etudiantUpdatePage.getPermisDeConduireInput().isSelected(), 'Expected permisDeConduire to be selected').to.be.true;
    }
    expect(await etudiantUpdatePage.getLieuDepartInput()).to.eq('lieuDepart', 'Expected LieuDepart value to be equals to lieuDepart');
    const selectedOptionSemestre = etudiantUpdatePage.getOptionSemestreInput();
    if (await selectedOptionSemestre.isSelected()) {
      await etudiantUpdatePage.getOptionSemestreInput().click();
      expect(await etudiantUpdatePage.getOptionSemestreInput().isSelected(), 'Expected optionSemestre not to be selected').to.be.false;
    } else {
      await etudiantUpdatePage.getOptionSemestreInput().click();
      expect(await etudiantUpdatePage.getOptionSemestreInput().isSelected(), 'Expected optionSemestre to be selected').to.be.true;
    }
    const selectedCompteValide = etudiantUpdatePage.getCompteValideInput();
    if (await selectedCompteValide.isSelected()) {
      await etudiantUpdatePage.getCompteValideInput().click();
      expect(await etudiantUpdatePage.getCompteValideInput().isSelected(), 'Expected compteValide not to be selected').to.be.false;
    } else {
      await etudiantUpdatePage.getCompteValideInput().click();
      expect(await etudiantUpdatePage.getCompteValideInput().isSelected(), 'Expected compteValide to be selected').to.be.true;
    }

    await etudiantUpdatePage.save();
    expect(await etudiantUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await etudiantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Etudiant', async () => {
    const nbButtonsBeforeDelete = await etudiantComponentsPage.countDeleteButtons();
    await etudiantComponentsPage.clickOnLastDeleteButton();

    etudiantDeleteDialog = new EtudiantDeleteDialog();
    expect(await etudiantDeleteDialog.getDialogTitle()).to.eq('uwindApp.etudiant.delete.question');
    await etudiantDeleteDialog.clickOnConfirmButton();

    expect(await etudiantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
