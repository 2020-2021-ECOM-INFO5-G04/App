import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MoniteurComponentsPage, MoniteurDeleteDialog, MoniteurUpdatePage } from './moniteur.page-object';

const expect = chai.expect;

describe('Moniteur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let moniteurComponentsPage: MoniteurComponentsPage;
  let moniteurUpdatePage: MoniteurUpdatePage;
  let moniteurDeleteDialog: MoniteurDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Moniteurs', async () => {
    await navBarPage.goToEntity('moniteur');
    moniteurComponentsPage = new MoniteurComponentsPage();
    await browser.wait(ec.visibilityOf(moniteurComponentsPage.title), 5000);
    expect(await moniteurComponentsPage.getTitle()).to.eq('uwindApp.moniteur.home.title');
    await browser.wait(ec.or(ec.visibilityOf(moniteurComponentsPage.entities), ec.visibilityOf(moniteurComponentsPage.noResult)), 1000);
  });

  it('should load create Moniteur page', async () => {
    await moniteurComponentsPage.clickOnCreateButton();
    moniteurUpdatePage = new MoniteurUpdatePage();
    expect(await moniteurUpdatePage.getPageTitle()).to.eq('uwindApp.moniteur.home.createOrEditLabel');
    await moniteurUpdatePage.cancel();
  });

  it('should create and save Moniteurs', async () => {
    const nbButtonsBeforeCreate = await moniteurComponentsPage.countDeleteButtons();

    await moniteurComponentsPage.clickOnCreateButton();

    await promise.all([
      moniteurUpdatePage.profilSelectLastOption(),
      moniteurUpdatePage.flotteurSelectLastOption(),
      moniteurUpdatePage.voileSelectLastOption(),
      moniteurUpdatePage.combinaisonSelectLastOption(),
    ]);

    await moniteurUpdatePage.save();
    expect(await moniteurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await moniteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Moniteur', async () => {
    const nbButtonsBeforeDelete = await moniteurComponentsPage.countDeleteButtons();
    await moniteurComponentsPage.clickOnLastDeleteButton();

    moniteurDeleteDialog = new MoniteurDeleteDialog();
    expect(await moniteurDeleteDialog.getDialogTitle()).to.eq('uwindApp.moniteur.delete.question');
    await moniteurDeleteDialog.clickOnConfirmButton();

    expect(await moniteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
