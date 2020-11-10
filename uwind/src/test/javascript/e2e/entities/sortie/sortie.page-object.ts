import { element, by, ElementFinder } from 'protractor';

export class SortieComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sortie div table .btn-danger'));
  title = element.all(by.css('jhi-sortie div h2#page-heading span')).first();
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

export class SortieUpdatePage {
  pageTitle = element(by.id('jhi-sortie-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  dateInput = element(by.id('field_date'));
  planDeauSelect = element(by.id('field_planDeau'));
  coeffInput = element(by.id('field_coeff'));
  commentaireInput = element(by.id('field_commentaire'));

  gestionnaireSelect = element(by.id('field_gestionnaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setPlanDeauSelect(planDeau: string): Promise<void> {
    await this.planDeauSelect.sendKeys(planDeau);
  }

  async getPlanDeauSelect(): Promise<string> {
    return await this.planDeauSelect.element(by.css('option:checked')).getText();
  }

  async planDeauSelectLastOption(): Promise<void> {
    await this.planDeauSelect.all(by.tagName('option')).last().click();
  }

  async setCoeffInput(coeff: string): Promise<void> {
    await this.coeffInput.sendKeys(coeff);
  }

  async getCoeffInput(): Promise<string> {
    return await this.coeffInput.getAttribute('value');
  }

  async setCommentaireInput(commentaire: string): Promise<void> {
    await this.commentaireInput.sendKeys(commentaire);
  }

  async getCommentaireInput(): Promise<string> {
    return await this.commentaireInput.getAttribute('value');
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

export class SortieDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sortie-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sortie'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
