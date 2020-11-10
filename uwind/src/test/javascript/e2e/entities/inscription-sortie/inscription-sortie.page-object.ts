import { element, by, ElementFinder } from 'protractor';

export class InscriptionSortieComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-inscription-sortie div table .btn-danger'));
  title = element.all(by.css('jhi-inscription-sortie div h2#page-heading span')).first();
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

export class InscriptionSortieUpdatePage {
  pageTitle = element(by.id('jhi-inscription-sortie-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  etudiantSelect = element(by.id('field_etudiant'));
  sortieSelect = element(by.id('field_sortie'));
  moniteurSelect = element(by.id('field_moniteur'));
  gestionnaireSelect = element(by.id('field_gestionnaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
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

  async sortieSelectLastOption(): Promise<void> {
    await this.sortieSelect.all(by.tagName('option')).last().click();
  }

  async sortieSelectOption(option: string): Promise<void> {
    await this.sortieSelect.sendKeys(option);
  }

  getSortieSelect(): ElementFinder {
    return this.sortieSelect;
  }

  async getSortieSelectedOption(): Promise<string> {
    return await this.sortieSelect.element(by.css('option:checked')).getText();
  }

  async moniteurSelectLastOption(): Promise<void> {
    await this.moniteurSelect.all(by.tagName('option')).last().click();
  }

  async moniteurSelectOption(option: string): Promise<void> {
    await this.moniteurSelect.sendKeys(option);
  }

  getMoniteurSelect(): ElementFinder {
    return this.moniteurSelect;
  }

  async getMoniteurSelectedOption(): Promise<string> {
    return await this.moniteurSelect.element(by.css('option:checked')).getText();
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

export class InscriptionSortieDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-inscriptionSortie-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-inscriptionSortie'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
