import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ObservationComponentsPage, ObservationDeleteDialog, ObservationUpdatePage } from './observation.page-object';

const expect = chai.expect;

describe('Observation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let observationComponentsPage: ObservationComponentsPage;
  let observationUpdatePage: ObservationUpdatePage;
  let observationDeleteDialog: ObservationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Observations', async () => {
    await navBarPage.goToEntity('observation');
    observationComponentsPage = new ObservationComponentsPage();
    await browser.wait(ec.visibilityOf(observationComponentsPage.title), 5000);
    expect(await observationComponentsPage.getTitle()).to.eq('uwindApp.observation.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(observationComponentsPage.entities), ec.visibilityOf(observationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Observation page', async () => {
    await observationComponentsPage.clickOnCreateButton();
    observationUpdatePage = new ObservationUpdatePage();
    expect(await observationUpdatePage.getPageTitle()).to.eq('uwindApp.observation.home.createOrEditLabel');
    await observationUpdatePage.cancel();
  });

  it('should create and save Observations', async () => {
    const nbButtonsBeforeCreate = await observationComponentsPage.countDeleteButtons();

    await observationComponentsPage.clickOnCreateButton();

    await promise.all([
      observationUpdatePage.setObservationInput('observation'),
      observationUpdatePage.etudiantSelectLastOption(),
      observationUpdatePage.moniteurSelectLastOption(),
      observationUpdatePage.gestionnaireSelectLastOption(),
    ]);

    expect(await observationUpdatePage.getObservationInput()).to.eq(
      'observation',
      'Expected Observation value to be equals to observation'
    );

    await observationUpdatePage.save();
    expect(await observationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await observationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Observation', async () => {
    const nbButtonsBeforeDelete = await observationComponentsPage.countDeleteButtons();
    await observationComponentsPage.clickOnLastDeleteButton();

    observationDeleteDialog = new ObservationDeleteDialog();
    expect(await observationDeleteDialog.getDialogTitle()).to.eq('uwindApp.observation.delete.question');
    await observationDeleteDialog.clickOnConfirmButton();

    expect(await observationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
