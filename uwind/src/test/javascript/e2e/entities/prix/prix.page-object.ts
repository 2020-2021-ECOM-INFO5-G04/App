import { element, by, ElementFinder } from 'protractor';

export class PrixComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-prix div table .btn-danger'));
  title = element.all(by.css('jhi-prix div h2#page-heading span')).first();
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

export class PrixUpdatePage {
  pageTitle = element(by.id('jhi-prix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateInput = element(by.id('field_date'));
  prixFPInput = element(by.id('field_prixFP'));
  prixFQInput = element(by.id('field_prixFQ'));
  activeInput = element(by.id('field_active'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setPrixFPInput(prixFP: string): Promise<void> {
    await this.prixFPInput.sendKeys(prixFP);
  }

  async getPrixFPInput(): Promise<string> {
    return await this.prixFPInput.getAttribute('value');
  }

  async setPrixFQInput(prixFQ: string): Promise<void> {
    await this.prixFQInput.sendKeys(prixFQ);
  }

  async getPrixFQInput(): Promise<string> {
    return await this.prixFQInput.getAttribute('value');
  }

  getActiveInput(): ElementFinder {
    return this.activeInput;
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

export class PrixDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-prix-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-prix'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
