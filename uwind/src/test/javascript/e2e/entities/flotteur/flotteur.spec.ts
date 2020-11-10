import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FlotteurComponentsPage, FlotteurDeleteDialog, FlotteurUpdatePage } from './flotteur.page-object';

const expect = chai.expect;

describe('Flotteur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let flotteurComponentsPage: FlotteurComponentsPage;
  let flotteurUpdatePage: FlotteurUpdatePage;
  let flotteurDeleteDialog: FlotteurDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Flotteurs', async () => {
    await navBarPage.goToEntity('flotteur');
    flotteurComponentsPage = new FlotteurComponentsPage();
    await browser.wait(ec.visibilityOf(flotteurComponentsPage.title), 5000);
    expect(await flotteurComponentsPage.getTitle()).to.eq('uwindApp.flotteur.home.title');
    await browser.wait(ec.or(ec.visibilityOf(flotteurComponentsPage.entities), ec.visibilityOf(flotteurComponentsPage.noResult)), 1000);
  });

  it('should load create Flotteur page', async () => {
    await flotteurComponentsPage.clickOnCreateButton();
    flotteurUpdatePage = new FlotteurUpdatePage();
    expect(await flotteurUpdatePage.getPageTitle()).to.eq('uwindApp.flotteur.home.createOrEditLabel');
    await flotteurUpdatePage.cancel();
  });

  it('should create and save Flotteurs', async () => {
    const nbButtonsBeforeCreate = await flotteurComponentsPage.countDeleteButtons();

    await flotteurComponentsPage.clickOnCreateButton();

    await promise.all([
      flotteurUpdatePage.nomSelectLastOption(),
      flotteurUpdatePage.setVolumeInput('5'),
      flotteurUpdatePage.niveauPlancheAVoileSelectLastOption(),
      flotteurUpdatePage.setCommentaireInput('commentaire'),
    ]);

    expect(await flotteurUpdatePage.getVolumeInput()).to.eq('5', 'Expected volume value to be equals to 5');
    const selectedUtilisable = flotteurUpdatePage.getUtilisableInput();
    if (await selectedUtilisable.isSelected()) {
      await flotteurUpdatePage.getUtilisableInput().click();
      expect(await flotteurUpdatePage.getUtilisableInput().isSelected(), 'Expected utilisable not to be selected').to.be.false;
    } else {
      await flotteurUpdatePage.getUtilisableInput().click();
      expect(await flotteurUpdatePage.getUtilisableInput().isSelected(), 'Expected utilisable to be selected').to.be.true;
    }
    expect(await flotteurUpdatePage.getCommentaireInput()).to.eq('commentaire', 'Expected Commentaire value to be equals to commentaire');

    await flotteurUpdatePage.save();
    expect(await flotteurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await flotteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Flotteur', async () => {
    const nbButtonsBeforeDelete = await flotteurComponentsPage.countDeleteButtons();
    await flotteurComponentsPage.clickOnLastDeleteButton();

    flotteurDeleteDialog = new FlotteurDeleteDialog();
    expect(await flotteurDeleteDialog.getDialogTitle()).to.eq('uwindApp.flotteur.delete.question');
    await flotteurDeleteDialog.clickOnConfirmButton();

    expect(await flotteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
