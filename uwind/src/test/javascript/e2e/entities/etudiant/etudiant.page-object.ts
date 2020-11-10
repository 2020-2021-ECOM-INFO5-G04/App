import { element, by, ElementFinder } from 'protractor';

export class EtudiantComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-etudiant div table .btn-danger'));
  title = element.all(by.css('jhi-etudiant div h2#page-heading span')).first();
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

export class EtudiantUpdatePage {
  pageTitle = element(by.id('jhi-etudiant-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  niveauScolaireSelect = element(by.id('field_niveauScolaire'));
  departementSelect = element(by.id('field_departement'));
  niveauPlancheSelect = element(by.id('field_niveauPlanche'));
  permisDeConduireInput = element(by.id('field_permisDeConduire'));
  lieuDepartInput = element(by.id('field_lieuDepart'));
  optionSemestreInput = element(by.id('field_optionSemestre'));
  compteValideInput = element(by.id('field_compteValide'));

  profilSelect = element(by.id('field_profil'));
  flotteurSelect = element(by.id('field_flotteur'));
  voileSelect = element(by.id('field_voile'));
  combinaisonSelect = element(by.id('field_combinaison'));
  gestionnaireSelect = element(by.id('field_gestionnaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNiveauScolaireSelect(niveauScolaire: string): Promise<void> {
    await this.niveauScolaireSelect.sendKeys(niveauScolaire);
  }

  async getNiveauScolaireSelect(): Promise<string> {
    return await this.niveauScolaireSelect.element(by.css('option:checked')).getText();
  }

  async niveauScolaireSelectLastOption(): Promise<void> {
    await this.niveauScolaireSelect.all(by.tagName('option')).last().click();
  }

  async setDepartementSelect(departement: string): Promise<void> {
    await this.departementSelect.sendKeys(departement);
  }

  async getDepartementSelect(): Promise<string> {
    return await this.departementSelect.element(by.css('option:checked')).getText();
  }

  async departementSelectLastOption(): Promise<void> {
    await this.departementSelect.all(by.tagName('option')).last().click();
  }

  async setNiveauPlancheSelect(niveauPlanche: string): Promise<void> {
    await this.niveauPlancheSelect.sendKeys(niveauPlanche);
  }

  async getNiveauPlancheSelect(): Promise<string> {
    return await this.niveauPlancheSelect.element(by.css('option:checked')).getText();
  }

  async niveauPlancheSelectLastOption(): Promise<void> {
    await this.niveauPlancheSelect.all(by.tagName('option')).last().click();
  }

  getPermisDeConduireInput(): ElementFinder {
    return this.permisDeConduireInput;
  }

  async setLieuDepartInput(lieuDepart: string): Promise<void> {
    await this.lieuDepartInput.sendKeys(lieuDepart);
  }

  async getLieuDepartInput(): Promise<string> {
    return await this.lieuDepartInput.getAttribute('value');
  }

  getOptionSemestreInput(): ElementFinder {
    return this.optionSemestreInput;
  }

  getCompteValideInput(): ElementFinder {
    return this.compteValideInput;
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

export class EtudiantDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-etudiant-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-etudiant'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
