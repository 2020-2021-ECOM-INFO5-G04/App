import { element, by, ElementFinder } from 'protractor';

export class GestionnaireComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-gestionnaire div table .btn-danger'));
  title = element.all(by.css('jhi-gestionnaire div h2#page-heading span')).first();
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

export class GestionnaireUpdatePage {
  pageTitle = element(by.id('jhi-gestionnaire-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  profilSelect = element(by.id('field_profil'));

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

export class GestionnaireDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-gestionnaire-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-gestionnaire'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
