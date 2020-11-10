import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VoileComponentsPage, VoileDeleteDialog, VoileUpdatePage } from './voile.page-object';

const expect = chai.expect;

describe('Voile e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let voileComponentsPage: VoileComponentsPage;
  let voileUpdatePage: VoileUpdatePage;
  let voileDeleteDialog: VoileDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Voiles', async () => {
    await navBarPage.goToEntity('voile');
    voileComponentsPage = new VoileComponentsPage();
    await browser.wait(ec.visibilityOf(voileComponentsPage.title), 5000);
    expect(await voileComponentsPage.getTitle()).to.eq('uwindApp.voile.home.title');
    await browser.wait(ec.or(ec.visibilityOf(voileComponentsPage.entities), ec.visibilityOf(voileComponentsPage.noResult)), 1000);
  });

  it('should load create Voile page', async () => {
    await voileComponentsPage.clickOnCreateButton();
    voileUpdatePage = new VoileUpdatePage();
    expect(await voileUpdatePage.getPageTitle()).to.eq('uwindApp.voile.home.createOrEditLabel');
    await voileUpdatePage.cancel();
  });

  it('should create and save Voiles', async () => {
    const nbButtonsBeforeCreate = await voileComponentsPage.countDeleteButtons();

    await voileComponentsPage.clickOnCreateButton();

    await promise.all([
      voileUpdatePage.nomCompletSelectLastOption(),
      voileUpdatePage.setSurfaceInput('5'),
      voileUpdatePage.niveauSelectLastOption(),
      voileUpdatePage.setCommentaireInput('commentaire'),
    ]);

    expect(await voileUpdatePage.getSurfaceInput()).to.eq('5', 'Expected surface value to be equals to 5');
    const selectedUtilisable = voileUpdatePage.getUtilisableInput();
    if (await selectedUtilisable.isSelected()) {
      await voileUpdatePage.getUtilisableInput().click();
      expect(await voileUpdatePage.getUtilisableInput().isSelected(), 'Expected utilisable not to be selected').to.be.false;
    } else {
      await voileUpdatePage.getUtilisableInput().click();
      expect(await voileUpdatePage.getUtilisableInput().isSelected(), 'Expected utilisable to be selected').to.be.true;
    }
    expect(await voileUpdatePage.getCommentaireInput()).to.eq('commentaire', 'Expected Commentaire value to be equals to commentaire');

    await voileUpdatePage.save();
    expect(await voileUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await voileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Voile', async () => {
    const nbButtonsBeforeDelete = await voileComponentsPage.countDeleteButtons();
    await voileComponentsPage.clickOnLastDeleteButton();

    voileDeleteDialog = new VoileDeleteDialog();
    expect(await voileDeleteDialog.getDialogTitle()).to.eq('uwindApp.voile.delete.question');
    await voileDeleteDialog.clickOnConfirmButton();

    expect(await voileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
