import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProfilComponentsPage, ProfilDeleteDialog, ProfilUpdatePage } from './profil.page-object';

const expect = chai.expect;

describe('Profil e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profilComponentsPage: ProfilComponentsPage;
  let profilUpdatePage: ProfilUpdatePage;
  let profilDeleteDialog: ProfilDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Profils', async () => {
    await navBarPage.goToEntity('profil');
    profilComponentsPage = new ProfilComponentsPage();
    await browser.wait(ec.visibilityOf(profilComponentsPage.title), 5000);
    expect(await profilComponentsPage.getTitle()).to.eq('uwindApp.profil.home.title');
    await browser.wait(ec.or(ec.visibilityOf(profilComponentsPage.entities), ec.visibilityOf(profilComponentsPage.noResult)), 1000);
  });

  it('should load create Profil page', async () => {
    await profilComponentsPage.clickOnCreateButton();
    profilUpdatePage = new ProfilUpdatePage();
    expect(await profilUpdatePage.getPageTitle()).to.eq('uwindApp.profil.home.createOrEditLabel');
    await profilUpdatePage.cancel();
  });

  it('should create and save Profils', async () => {
    const nbButtonsBeforeCreate = await profilComponentsPage.countDeleteButtons();

    await profilComponentsPage.clickOnCreateButton();

    await promise.all([
      profilUpdatePage.setPrenomInput('prenom'),
      profilUpdatePage.setNomInput('nom'),
      profilUpdatePage.setEmailInput('k(d@DQ~'),
      profilUpdatePage.setNumTelInput('numTel'),
      profilUpdatePage.utilisateurSelectLastOption(),
    ]);

    expect(await profilUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await profilUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await profilUpdatePage.getEmailInput()).to.eq('k(d@DQ~', 'Expected Email value to be equals to k(d@DQ~');
    expect(await profilUpdatePage.getNumTelInput()).to.eq('numTel', 'Expected NumTel value to be equals to numTel');

    await profilUpdatePage.save();
    expect(await profilUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profilComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Profil', async () => {
    const nbButtonsBeforeDelete = await profilComponentsPage.countDeleteButtons();
    await profilComponentsPage.clickOnLastDeleteButton();

    profilDeleteDialog = new ProfilDeleteDialog();
    expect(await profilDeleteDialog.getDialogTitle()).to.eq('uwindApp.profil.delete.question');
    await profilDeleteDialog.clickOnConfirmButton();

    expect(await profilComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
