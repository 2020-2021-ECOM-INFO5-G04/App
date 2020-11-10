import { element, by, ElementFinder } from 'protractor';

export class FlotteurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-flotteur div table .btn-danger'));
  title = element.all(by.css('jhi-flotteur div h2#page-heading span')).first();
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

export class FlotteurUpdatePage {
  pageTitle = element(by.id('jhi-flotteur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomSelect = element(by.id('field_nom'));
  volumeInput = element(by.id('field_volume'));
  niveauPlancheAVoileSelect = element(by.id('field_niveauPlancheAVoile'));
  utilisableInput = element(by.id('field_utilisable'));
  commentaireInput = element(by.id('field_commentaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomSelect(nom: string): Promise<void> {
    await this.nomSelect.sendKeys(nom);
  }

  async getNomSelect(): Promise<string> {
    return await this.nomSelect.element(by.css('option:checked')).getText();
  }

  async nomSelectLastOption(): Promise<void> {
    await this.nomSelect.all(by.tagName('option')).last().click();
  }

  async setVolumeInput(volume: string): Promise<void> {
    await this.volumeInput.sendKeys(volume);
  }

  async getVolumeInput(): Promise<string> {
    return await this.volumeInput.getAttribute('value');
  }

  async setNiveauPlancheAVoileSelect(niveauPlancheAVoile: string): Promise<void> {
    await this.niveauPlancheAVoileSelect.sendKeys(niveauPlancheAVoile);
  }

  async getNiveauPlancheAVoileSelect(): Promise<string> {
    return await this.niveauPlancheAVoileSelect.element(by.css('option:checked')).getText();
  }

  async niveauPlancheAVoileSelectLastOption(): Promise<void> {
    await this.niveauPlancheAVoileSelect.all(by.tagName('option')).last().click();
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

export class FlotteurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-flotteur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-flotteur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
