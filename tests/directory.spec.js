const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const DirectoryPage = require('../pages/DirectoryPage');

const testData = require('../data/users.json');

test.describe('Directoy - OrangeHRM', () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
  
      await loginPage.goToLogin();
      await loginPage.login(testData.validUser.username,testData.validUser.password);
    });

    test('Acceder a la seccion Directory', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const directoryPage = new DirectoryPage(page);
    
        await dashboardPage.validateDashboardLoaded();
        await dashboardPage.openMenuOption('Directory');
    
        await directoryPage.validateDirectoryPageLoaded();
      });

    test('Validar elementos principales de la seccion Directory', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const directoryPage = new DirectoryPage(page);
    
        await dashboardPage.validateDashboardLoaded();
        await dashboardPage.openMenuOption('Directory');
    
        await directoryPage.validateDirectoryPageLoaded();
        await directoryPage.validateDirectoryMainElements();
      });

    test('Buscar un empleado por nombre y validar resultados', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const directoryPage = new DirectoryPage(page);
        const employeeName =testData.directoryEmployees[0].employeeName;

        await dashboardPage.openMenuOption('Directory');
        await directoryPage.validateDirectoryPageLoaded();
        
        await directoryPage.searchEmployee(employeeName);

        await expect(directoryPage.employeeCardByName(employeeName)).toBeVisible();   
    }); 

    test('Filtrar empleados por Job Title', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const directoryPage = new DirectoryPage(page);

        await dashboardPage.openMenuOption('Directory');
        await directoryPage.validateDirectoryPageLoaded();

        await directoryPage.selectJobTitle();
        await directoryPage.clickSearch();

        await directoryPage.validateRecordsFound();
    });

    test('Filtrar empleados por Location', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const directoryPage = new DirectoryPage(page);

        await dashboardPage.openMenuOption('Directory');
        await directoryPage.validateDirectoryPageLoaded();

        await directoryPage.selectLocation();
        await directoryPage.clickSearch();

        await directoryPage.validateRecordsFound();
    });

    test('Resetear la busqueda', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const directoryPage = new DirectoryPage(page);

        await dashboardPage.openMenuOption('Directory');
        await directoryPage.validateDirectoryPageLoaded();
        await directoryPage.searchEmployee(testData.directoryEmployees[0].employeeName);

        await directoryPage.clickReset();

        await expect(directoryPage.employeeNameInput).toHaveValue('');

    });

    test('Buscar empleado inexistente', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const directoryPage = new DirectoryPage(page);

        await dashboardPage.openMenuOption('Directory');
        await directoryPage.validateDirectoryPageLoaded();

        await directoryPage.searchInvalidEmployee(testData.invalidDirectoryEmployees[0].employeeName);

        await directoryPage.validateNoRecordsFound();
    });

});
