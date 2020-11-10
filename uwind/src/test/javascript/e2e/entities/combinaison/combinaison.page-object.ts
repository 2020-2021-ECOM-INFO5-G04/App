import { element, by, ElementFinder } from 'protractor';

export class CombinaisonComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-combinaison div table .btn-danger'));
  title = element.all(by.css('jhi-combinaison div h2#page-heading span')).first();
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

export class CombinaisonUpdatePage {
  pageTitle = element(by.id('jhi-combinaison-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomSelect = element(by.id('field_nom'));
  tailleSelect = element(by.id('field_taille'));
  poidsSelect = element(by.id('field_poids'));

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

  async setTailleSelect(taille: string): Promise<void> {
    await this.tailleSelect.sendKeys(taille);
  }

  async getTailleSelect(): Promise<string> {
    return await this.tailleSelect.element(by.css('option:checked')).getText();
  }

  async tailleSelectLastOption(): Promise<void> {
    await this.tailleSelect.all(by.tagName('option')).last().click();
  }

  async setPoidsSelect(poids: string): Promise<void> {
    await this.poidsSelect.sendKeys(poids);
  }

  async getPoidsSelect(): Promise<string> {
    return await this.poidsSelect.element(by.css('option:checked')).getText();
  }

  async poidsSelectLastOption(): Promise<void> {
    await this.poidsSelect.all(by.tagName('option')).last().click();
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

export class CombinaisonDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-combinaison-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-combinaison'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
