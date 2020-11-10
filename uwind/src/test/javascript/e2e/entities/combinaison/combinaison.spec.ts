import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CombinaisonComponentsPage, CombinaisonDeleteDialog, CombinaisonUpdatePage } from './combinaison.page-object';

const expect = chai.expect;

describe('Combinaison e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let combinaisonComponentsPage: CombinaisonComponentsPage;
  let combinaisonUpdatePage: CombinaisonUpdatePage;
  let combinaisonDeleteDialog: CombinaisonDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Combinaisons', async () => {
    await navBarPage.goToEntity('combinaison');
    combinaisonComponentsPage = new CombinaisonComponentsPage();
    await browser.wait(ec.visibilityOf(combinaisonComponentsPage.title), 5000);
    expect(await combinaisonComponentsPage.getTitle()).to.eq('uwindApp.combinaison.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(combinaisonComponentsPage.entities), ec.visibilityOf(combinaisonComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Combinaison page', async () => {
    await combinaisonComponentsPage.clickOnCreateButton();
    combinaisonUpdatePage = new CombinaisonUpdatePage();
    expect(await combinaisonUpdatePage.getPageTitle()).to.eq('uwindApp.combinaison.home.createOrEditLabel');
    await combinaisonUpdatePage.cancel();
  });

  it('should create and save Combinaisons', async () => {
    const nbButtonsBeforeCreate = await combinaisonComponentsPage.countDeleteButtons();

    await combinaisonComponentsPage.clickOnCreateButton();

    await promise.all([
      combinaisonUpdatePage.nomSelectLastOption(),
      combinaisonUpdatePage.tailleSelectLastOption(),
      combinaisonUpdatePage.poidsSelectLastOption(),
    ]);

    await combinaisonUpdatePage.save();
    expect(await combinaisonUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await combinaisonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Combinaison', async () => {
    const nbButtonsBeforeDelete = await combinaisonComponentsPage.countDeleteButtons();
    await combinaisonComponentsPage.clickOnLastDeleteButton();

    combinaisonDeleteDialog = new CombinaisonDeleteDialog();
    expect(await combinaisonDeleteDialog.getDialogTitle()).to.eq('uwindApp.combinaison.delete.question');
    await combinaisonDeleteDialog.clickOnConfirmButton();

    expect(await combinaisonComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
