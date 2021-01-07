import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PrixComponentsPage, PrixDeleteDialog, PrixUpdatePage } from './prix.page-object';

const expect = chai.expect;

describe('Prix e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prixComponentsPage: PrixComponentsPage;
  let prixUpdatePage: PrixUpdatePage;
  let prixDeleteDialog: PrixDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Prixes', async () => {
    await navBarPage.goToEntity('prix');
    prixComponentsPage = new PrixComponentsPage();
    await browser.wait(ec.visibilityOf(prixComponentsPage.title), 5000);
    expect(await prixComponentsPage.getTitle()).to.eq('uwindApp.prix.home.title');
    await browser.wait(ec.or(ec.visibilityOf(prixComponentsPage.entities), ec.visibilityOf(prixComponentsPage.noResult)), 1000);
  });

  it('should load create Prix page', async () => {
    await prixComponentsPage.clickOnCreateButton();
    prixUpdatePage = new PrixUpdatePage();
    expect(await prixUpdatePage.getPageTitle()).to.eq('uwindApp.prix.home.createOrEditLabel');
    await prixUpdatePage.cancel();
  });

  it('should create and save Prixes', async () => {
    const nbButtonsBeforeCreate = await prixComponentsPage.countDeleteButtons();

    await prixComponentsPage.clickOnCreateButton();

    await promise.all([prixUpdatePage.setDateInput('2000-12-31'), prixUpdatePage.setPrixFPInput('5'), prixUpdatePage.setPrixFQInput('5')]);

    expect(await prixUpdatePage.getDateInput()).to.eq('2000-12-31', 'Expected date value to be equals to 2000-12-31');
    expect(await prixUpdatePage.getPrixFPInput()).to.eq('5', 'Expected prixFP value to be equals to 5');
    expect(await prixUpdatePage.getPrixFQInput()).to.eq('5', 'Expected prixFQ value to be equals to 5');
    const selectedActive = prixUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await prixUpdatePage.getActiveInput().click();
      expect(await prixUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await prixUpdatePage.getActiveInput().click();
      expect(await prixUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }

    await prixUpdatePage.save();
    expect(await prixUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await prixComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Prix', async () => {
    const nbButtonsBeforeDelete = await prixComponentsPage.countDeleteButtons();
    await prixComponentsPage.clickOnLastDeleteButton();

    prixDeleteDialog = new PrixDeleteDialog();
    expect(await prixDeleteDialog.getDialogTitle()).to.eq('uwindApp.prix.delete.question');
    await prixDeleteDialog.clickOnConfirmButton();

    expect(await prixComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
