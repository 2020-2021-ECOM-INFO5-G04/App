import { element, by, ElementFinder } from 'protractor';

export class ObservationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-observation div table .btn-danger'));
  title = element.all(by.css('jhi-observation div h2#page-heading span')).first();
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

export class ObservationUpdatePage {
  pageTitle = element(by.id('jhi-observation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  observationInput = element(by.id('field_observation'));

  etudiantSelect = element(by.id('field_etudiant'));
  moniteurSelect = element(by.id('field_moniteur'));
  gestionnaireSelect = element(by.id('field_gestionnaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setObservationInput(observation: string): Promise<void> {
    await this.observationInput.sendKeys(observation);
  }

  async getObservationInput(): Promise<string> {
    return await this.observationInput.getAttribute('value');
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

export class ObservationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-observation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-observation'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
