import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SortieComponentsPage, SortieDeleteDialog, SortieUpdatePage } from './sortie.page-object';

const expect = chai.expect;

describe('Sortie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sortieComponentsPage: SortieComponentsPage;
  let sortieUpdatePage: SortieUpdatePage;
  let sortieDeleteDialog: SortieDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Sorties', async () => {
    await navBarPage.goToEntity('sortie');
    sortieComponentsPage = new SortieComponentsPage();
    await browser.wait(ec.visibilityOf(sortieComponentsPage.title), 5000);
    expect(await sortieComponentsPage.getTitle()).to.eq('uwindApp.sortie.home.title');
    await browser.wait(ec.or(ec.visibilityOf(sortieComponentsPage.entities), ec.visibilityOf(sortieComponentsPage.noResult)), 1000);
  });

  it('should load create Sortie page', async () => {
    await sortieComponentsPage.clickOnCreateButton();
    sortieUpdatePage = new SortieUpdatePage();
    expect(await sortieUpdatePage.getPageTitle()).to.eq('uwindApp.sortie.home.createOrEditLabel');
    await sortieUpdatePage.cancel();
  });

  it('should create and save Sorties', async () => {
    const nbButtonsBeforeCreate = await sortieComponentsPage.countDeleteButtons();

    await sortieComponentsPage.clickOnCreateButton();

    await promise.all([
      sortieUpdatePage.setNomInput('nom'),
      sortieUpdatePage.setDateInput('2000-12-31'),
      sortieUpdatePage.planDeauSelectLastOption(),
      sortieUpdatePage.setCoeffInput('5'),
      sortieUpdatePage.setCommentaireInput('commentaire'),
      sortieUpdatePage.gestionnaireSelectLastOption(),
    ]);

    expect(await sortieUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await sortieUpdatePage.getDateInput()).to.eq('2000-12-31', 'Expected date value to be equals to 2000-12-31');
    expect(await sortieUpdatePage.getCoeffInput()).to.eq('5', 'Expected coeff value to be equals to 5');
    expect(await sortieUpdatePage.getCommentaireInput()).to.eq('commentaire', 'Expected Commentaire value to be equals to commentaire');

    await sortieUpdatePage.save();
    expect(await sortieUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sortieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Sortie', async () => {
    const nbButtonsBeforeDelete = await sortieComponentsPage.countDeleteButtons();
    await sortieComponentsPage.clickOnLastDeleteButton();

    sortieDeleteDialog = new SortieDeleteDialog();
    expect(await sortieDeleteDialog.getDialogTitle()).to.eq('uwindApp.sortie.delete.question');
    await sortieDeleteDialog.clickOnConfirmButton();

    expect(await sortieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
