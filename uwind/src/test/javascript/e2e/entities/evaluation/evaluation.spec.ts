import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EvaluationComponentsPage, EvaluationDeleteDialog, EvaluationUpdatePage } from './evaluation.page-object';

const expect = chai.expect;

describe('Evaluation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let evaluationComponentsPage: EvaluationComponentsPage;
  let evaluationUpdatePage: EvaluationUpdatePage;
  let evaluationDeleteDialog: EvaluationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Evaluations', async () => {
    await navBarPage.goToEntity('evaluation');
    evaluationComponentsPage = new EvaluationComponentsPage();
    await browser.wait(ec.visibilityOf(evaluationComponentsPage.title), 5000);
    expect(await evaluationComponentsPage.getTitle()).to.eq('uwindApp.evaluation.home.title');
    await browser.wait(ec.or(ec.visibilityOf(evaluationComponentsPage.entities), ec.visibilityOf(evaluationComponentsPage.noResult)), 1000);
  });

  it('should load create Evaluation page', async () => {
    await evaluationComponentsPage.clickOnCreateButton();
    evaluationUpdatePage = new EvaluationUpdatePage();
    expect(await evaluationUpdatePage.getPageTitle()).to.eq('uwindApp.evaluation.home.createOrEditLabel');
    await evaluationUpdatePage.cancel();
  });

  it('should create and save Evaluations', async () => {
    const nbButtonsBeforeCreate = await evaluationComponentsPage.countDeleteButtons();

    await evaluationComponentsPage.clickOnCreateButton();

    await promise.all([
      evaluationUpdatePage.setNoteInput('5'),
      evaluationUpdatePage.setCommentaireInput('commentaire'),
      evaluationUpdatePage.etudiantSelectLastOption(),
      evaluationUpdatePage.gestionnaireSelectLastOption(),
    ]);

    expect(await evaluationUpdatePage.getNoteInput()).to.eq('5', 'Expected note value to be equals to 5');
    expect(await evaluationUpdatePage.getCommentaireInput()).to.eq('commentaire', 'Expected Commentaire value to be equals to commentaire');

    await evaluationUpdatePage.save();
    expect(await evaluationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await evaluationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Evaluation', async () => {
    const nbButtonsBeforeDelete = await evaluationComponentsPage.countDeleteButtons();
    await evaluationComponentsPage.clickOnLastDeleteButton();

    evaluationDeleteDialog = new EvaluationDeleteDialog();
    expect(await evaluationDeleteDialog.getDialogTitle()).to.eq('uwindApp.evaluation.delete.question');
    await evaluationDeleteDialog.clickOnConfirmButton();

    expect(await evaluationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
