import { element, by, ElementFinder } from 'protractor';

export class VoileComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-voile div table .btn-danger'));
  title = element.all(by.css('jhi-voile div h2#page-heading span')).first();
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

export class VoileUpdatePage {
  pageTitle = element(by.id('jhi-voile-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomCompletSelect = element(by.id('field_nomComplet'));
  surfaceInput = element(by.id('field_surface'));
  niveauSelect = element(by.id('field_niveau'));
  utilisableInput = element(by.id('field_utilisable'));
  commentaireInput = element(by.id('field_commentaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomCompletSelect(nomComplet: string): Promise<void> {
    await this.nomCompletSelect.sendKeys(nomComplet);
  }

  async getNomCompletSelect(): Promise<string> {
    return await this.nomCompletSelect.element(by.css('option:checked')).getText();
  }

  async nomCompletSelectLastOption(): Promise<void> {
    await this.nomCompletSelect.all(by.tagName('option')).last().click();
  }

  async setSurfaceInput(surface: string): Promise<void> {
    await this.surfaceInput.sendKeys(surface);
  }

  async getSurfaceInput(): Promise<string> {
    return await this.surfaceInput.getAttribute('value');
  }

  async setNiveauSelect(niveau: string): Promise<void> {
    await this.niveauSelect.sendKeys(niveau);
  }

  async getNiveauSelect(): Promise<string> {
    return await this.niveauSelect.element(by.css('option:checked')).getText();
  }

  async niveauSelectLastOption(): Promise<void> {
    await this.niveauSelect.all(by.tagName('option')).last().click();
  }

  getUtilisableInput(): ElementFinder {
    return this.utilisableInput;
  }

  async setCommentaireInput(commentaire: string): Promise<void> {
    await this.commentaireInput.sendKeys(commentaire);
  }

  async getCommentaireInput(): Promise<string> {
    return await this.commentaireInput.getAttribute('value');
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

export class VoileDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-voile-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-voile'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
