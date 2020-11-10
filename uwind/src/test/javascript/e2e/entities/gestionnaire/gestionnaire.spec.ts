import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GestionnaireComponentsPage, GestionnaireDeleteDialog, GestionnaireUpdatePage } from './gestionnaire.page-object';

const expect = chai.expect;

describe('Gestionnaire e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gestionnaireComponentsPage: GestionnaireComponentsPage;
  let gestionnaireUpdatePage: GestionnaireUpdatePage;
  let gestionnaireDeleteDialog: GestionnaireDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Gestionnaires', async () => {
    await navBarPage.goToEntity('gestionnaire');
    gestionnaireComponentsPage = new GestionnaireComponentsPage();
    await browser.wait(ec.visibilityOf(gestionnaireComponentsPage.title), 5000);
    expect(await gestionnaireComponentsPage.getTitle()).to.eq('uwindApp.gestionnaire.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(gestionnaireComponentsPage.entities), ec.visibilityOf(gestionnaireComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Gestionnaire page', async () => {
    await gestionnaireComponentsPage.clickOnCreateButton();
    gestionnaireUpdatePage = new GestionnaireUpdatePage();
    expect(await gestionnaireUpdatePage.getPageTitle()).to.eq('uwindApp.gestionnaire.home.createOrEditLabel');
    await gestionnaireUpdatePage.cancel();
  });

  it('should create and save Gestionnaires', async () => {
    const nbButtonsBeforeCreate = await gestionnaireComponentsPage.countDeleteButtons();

    await gestionnaireComponentsPage.clickOnCreateButton();

    await promise.all([gestionnaireUpdatePage.profilSelectLastOption()]);

    await gestionnaireUpdatePage.save();
    expect(await gestionnaireUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await gestionnaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Gestionnaire', async () => {
    const nbButtonsBeforeDelete = await gestionnaireComponentsPage.countDeleteButtons();
    await gestionnaireComponentsPage.clickOnLastDeleteButton();

    gestionnaireDeleteDialog = new GestionnaireDeleteDialog();
    expect(await gestionnaireDeleteDialog.getDialogTitle()).to.eq('uwindApp.gestionnaire.delete.question');
    await gestionnaireDeleteDialog.clickOnConfirmButton();

    expect(await gestionnaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
