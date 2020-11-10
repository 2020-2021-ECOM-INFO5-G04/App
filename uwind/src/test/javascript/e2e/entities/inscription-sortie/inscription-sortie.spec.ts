import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  InscriptionSortieComponentsPage,
  InscriptionSortieDeleteDialog,
  InscriptionSortieUpdatePage,
} from './inscription-sortie.page-object';

const expect = chai.expect;

describe('InscriptionSortie e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let inscriptionSortieComponentsPage: InscriptionSortieComponentsPage;
  let inscriptionSortieUpdatePage: InscriptionSortieUpdatePage;
  let inscriptionSortieDeleteDialog: InscriptionSortieDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load InscriptionSorties', async () => {
    await navBarPage.goToEntity('inscription-sortie');
    inscriptionSortieComponentsPage = new InscriptionSortieComponentsPage();
    await browser.wait(ec.visibilityOf(inscriptionSortieComponentsPage.title), 5000);
    expect(await inscriptionSortieComponentsPage.getTitle()).to.eq('uwindApp.inscriptionSortie.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(inscriptionSortieComponentsPage.entities), ec.visibilityOf(inscriptionSortieComponentsPage.noResult)),
      1000
    );
  });

  it('should load create InscriptionSortie page', async () => {
    await inscriptionSortieComponentsPage.clickOnCreateButton();
    inscriptionSortieUpdatePage = new InscriptionSortieUpdatePage();
    expect(await inscriptionSortieUpdatePage.getPageTitle()).to.eq('uwindApp.inscriptionSortie.home.createOrEditLabel');
    await inscriptionSortieUpdatePage.cancel();
  });

  it('should create and save InscriptionSorties', async () => {
    const nbButtonsBeforeCreate = await inscriptionSortieComponentsPage.countDeleteButtons();

    await inscriptionSortieComponentsPage.clickOnCreateButton();

    await promise.all([
      inscriptionSortieUpdatePage.etudiantSelectLastOption(),
      inscriptionSortieUpdatePage.sortieSelectLastOption(),
      inscriptionSortieUpdatePage.moniteurSelectLastOption(),
      inscriptionSortieUpdatePage.gestionnaireSelectLastOption(),
    ]);

    await inscriptionSortieUpdatePage.save();
    expect(await inscriptionSortieUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await inscriptionSortieComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last InscriptionSortie', async () => {
    const nbButtonsBeforeDelete = await inscriptionSortieComponentsPage.countDeleteButtons();
    await inscriptionSortieComponentsPage.clickOnLastDeleteButton();

    inscriptionSortieDeleteDialog = new InscriptionSortieDeleteDialog();
    expect(await inscriptionSortieDeleteDialog.getDialogTitle()).to.eq('uwindApp.inscriptionSortie.delete.question');
    await inscriptionSortieDeleteDialog.clickOnConfirmButton();

    expect(await inscriptionSortieComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
