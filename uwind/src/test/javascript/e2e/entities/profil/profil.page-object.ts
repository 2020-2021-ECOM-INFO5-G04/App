import { element, by, ElementFinder } from 'protractor';

export class ProfilComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-profil div table .btn-danger'));
  title = element.all(by.css('jhi-profil div h2#page-heading span')).first();
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

export class ProfilUpdatePage {
  pageTitle = element(by.id('jhi-profil-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  prenomInput = element(by.id('field_prenom'));
  nomInput = element(by.id('field_nom'));
  emailInput = element(by.id('field_email'));
  numTelInput = element(by.id('field_numTel'));

  utilisateurSelect = element(by.id('field_utilisateur'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPrenomInput(prenom: string): Promise<void> {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput(): Promise<string> {
    return await this.prenomInput.getAttribute('value');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setNumTelInput(numTel: string): Promise<void> {
    await this.numTelInput.sendKeys(numTel);
  }

  async getNumTelInput(): Promise<string> {
    return await this.numTelInput.getAttribute('value');
  }

  async utilisateurSelectLastOption(): Promise<void> {
    await this.utilisateurSelect.all(by.tagName('option')).last().click();
  }

  async utilisateurSelectOption(option: string): Promise<void> {
    await this.utilisateurSelect.sendKeys(option);
  }

  getUtilisateurSelect(): ElementFinder {
    return this.utilisateurSelect;
  }

  async getUtilisateurSelectedOption(): Promise<string> {
    return await this.utilisateurSelect.element(by.css('option:checked')).getText();
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

export class ProfilDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-profil-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-profil'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
