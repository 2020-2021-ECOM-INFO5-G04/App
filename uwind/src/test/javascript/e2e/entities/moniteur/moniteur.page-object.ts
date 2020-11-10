import { element, by, ElementFinder } from 'protractor';

export class MoniteurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-moniteur div table .btn-danger'));
  title = element.all(by.css('jhi-moniteur div h2#page-heading span')).first();
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

export class MoniteurUpdatePage {
  pageTitle = element(by.id('jhi-moniteur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  profilSelect = element(by.id('field_profil'));
  flotteurSelect = element(by.id('field_flotteur'));
  voileSelect = element(by.id('field_voile'));
  combinaisonSelect = element(by.id('field_combinaison'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async profilSelectLastOption(): Promise<void> {
    await this.profilSelect.all(by.tagName('option')).last().click();
  }

  async profilSelectOption(option: string): Promise<void> {
    await this.profilSelect.sendKeys(option);
  }

  getProfilSelect(): ElementFinder {
    return this.profilSelect;
  }

  async getProfilSelectedOption(): Promise<string> {
    return await this.profilSelect.element(by.css('option:checked')).getText();
  }

  async flotteurSelectLastOption(): Promise<void> {
    await this.flotteurSelect.all(by.tagName('option')).last().click();
  }

  async flotteurSelectOption(option: string): Promise<void> {
    await this.flotteurSelect.sendKeys(option);
  }

  getFlotteurSelect(): ElementFinder {
    return this.flotteurSelect;
  }

  async getFlotteurSelectedOption(): Promise<string> {
    return await this.flotteurSelect.element(by.css('option:checked')).getText();
  }

  async voileSelectLastOption(): Promise<void> {
    await this.voileSelect.all(by.tagName('option')).last().click();
  }

  async voileSelectOption(option: string): Promise<void> {
    await this.voileSelect.sendKeys(option);
  }

  getVoileSelect(): ElementFinder {
    return this.voileSelect;
  }

  async getVoileSelectedOption(): Promise<string> {
    return await this.voileSelect.element(by.css('option:checked')).getText();
  }

  async combinaisonSelectLastOption(): Promise<void> {
    await this.combinaisonSelect.all(by.tagName('option')).last().click();
  }

  async combinaisonSelectOption(option: string): Promise<void> {
    await this.combinaisonSelect.sendKeys(option);
  }

  getCombinaisonSelect(): ElementFinder {
    return this.combinaisonSelect;
  }

  async getCombinaisonSelectedOption(): Promise<string> {
    return await this.combinaisonSelect.element(by.css('option:checked')).getText();
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

export class MoniteurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-moniteur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-moniteur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
