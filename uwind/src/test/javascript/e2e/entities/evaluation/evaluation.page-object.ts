import { element, by, ElementFinder } from 'protractor';

export class EvaluationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-evaluation div table .btn-danger'));
  title = element.all(by.css('jhi-evaluation div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EvaluationUpdatePage {
  pageTitle = element(by.id('jhi-evaluation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  noteInput = element(by.id('field_note'));
  commentaireInput = element(by.id('field_commentaire'));

  etudiantSelect = element(by.id('field_etudiant'));
  gestionnaireSelect = element(by.id('field_gestionnaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNoteInput(note: string): Promise<void> {
    await this.noteInput.sendKeys(note);
  }

  async getNoteInput(): Promise<string> {
    return await this.noteInput.getAttribute('value');
  }

  async setCommentaireInput(commentaire: string): Promise<void> {
    await this.commentaireInput.sendKeys(commentaire);
  }

  async getCommentaireInput(): Promise<string> {
    return await this.commentaireInput.getAttribute('value');
  }

  async etudiantSelectLastOption(): Promise<void> {
    await this.etudiantSelect.all(by.tagName('option')).last().click();
  }

  async etudiantSelectOption(option: string): Promise<void> {
    await this.etudiantSelect.sendKeys(option);
  }

  getEtudiantSelect(): ElementFinder {
    return this.etudiantSelect;
  }

  async getEtudiantSelectedOption(): Promise<string> {
    return await this.etudiantSelect.element(by.css('option:checked')).getText();
  }

  async gestionnaireSelectLastOption(): Promise<void> {
    await this.gestionnaireSelect.all(by.tagName('option')).last().click();
  }

  async gestionnaireSelectOption(option: string): Promise<void> {
    await this.gestionnaireSelect.sendKeys(option);
  }

  getGestionnaireSelect(): ElementFinder {
    return this.gestionnaireSelect;
  }

  async getGestionnaireSelectedOption(): Promise<string> {
    return await this.gestionnaireSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EvaluationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-evaluation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-evaluation'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
