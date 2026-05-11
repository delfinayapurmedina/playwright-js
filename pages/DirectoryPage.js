const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class DirectoryPage extends BasePage {

    constructor(page) {

      super(page);

      this.directoryTitle = page.locator('h6');
      this.employeeNameLabel = page.getByText('Employee Name', { exact: true });
      this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
      this.jobTitleDropdown = page.locator('.oxd-select-text').nth(0);;
      this.locationDropdown = page.locator('.oxd-select-text').nth(1);;
      this.searchButton = page.getByRole('button', { name: 'Search' });
      this.resetButton = page.getByRole('button', { name: 'Reset' });
      this.recordsFoundText = page.getByText(/\(\d+\)\sRecords Found/, { exact: true });
      this.noRecordsText = page.getByText('No Records Found', { exact: true});
      this.employeeCards = page.locator('.orangehrm-directory-card');
      this.recordsCount = page.locator('.orangehrm-horizontal-padding span');

    }

    async validateDirectoryPageLoaded() {

        await expect(this.page).toHaveURL(/directory/);
        await expect(this.directoryTitle).toHaveText('Directory');
    }

    async validateDirectoryMainElements() {

        await expect(this.employeeNameLabel).toBeVisible();
        await expect(this.jobTitleDropdown).toBeVisible();
        await expect(this.locationDropdown).toBeVisible();
        await expect(this.searchButton).toBeVisible();
        await expect(this.resetButton).toBeVisible();
        await expect(this.recordsFoundText).toBeVisible();
        await expect(this.employeeCards.first()).toBeVisible();
    }

    async searchEmployee(employeeName) {

        await this.employeeNameInput.fill(employeeName);
        await this.page.getByRole('option', { name: 'Manda Betsy Spinka' }).click();
        await this.searchButton.click({force: true});
    }

    async searchInvalidEmployee(employeeName) {

        await this.employeeNameInput.fill(employeeName);
    }

    async selectJobTitle() {

        await this.jobTitleDropdown.click();
        await this.page.getByRole('option', { name: 'HR Manager' }).click();

    }

    async selectLocation() {

        await this.locationDropdown.click();
        await this.page.getByRole('option', { name: 'Texas R&D' }).click();
    }

    async clickSearch() {

        await this.searchButton.click();
    }

    async clickReset() {

        await this.resetButton.click();
    }

    async validateRecordsFound() {

        await expect(this.recordsFoundText).toBeVisible();
    }

    async validateNoRecordsFound() {

        await expect(this.noRecordsText).toBeVisible();
        await expect(this.noRecordsText).toContainText('No Records Found');
    }

    async validateEmployeeCardsVisible() {

        await expect(this.employeeCards.first()).toBeVisible();
    }


    employeeCardByName(employeeName) {

        return this.page.locator('.orangehrm-directory-card-header',{ hasText: employeeName });
      }
}
module.exports = DirectoryPage;