import { test } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage.page';
import { ProjectsPage } from '../pages/ProjectPage.page';

function generateRandomData() {
  const randomNum = Math.floor(Math.random() * 10000);
  const name = `Usuario${randomNum}`;
  const email = `usuario${randomNum}@example.com`;
  const password = `Pass${randomNum}!`;
  return { name, email, password };
}

test.beforeEach(async ({ page }) => {
  const signupPage = new SignupPage(page);
  const { name, email, password } = generateRandomData();

  await signupPage.openPage();
  await signupPage.clickSignUp();
  await signupPage.fillUserData(name, email, password);
  await signupPage.saveUser();
  await signupPage.verifySession();
});

test('Create 3 items in an empty project with different priorities', async ({ page }) => {
  const projectsPage = new ProjectsPage(page);

  await projectsPage.createProject('Test Projectaso');
  await projectsPage.createItem('Medium Priority Item MEDIUM');
  await projectsPage.createItem('Low Priority Item LOW');
  await projectsPage.createItem('High Priority Item IMPORTANT');

  await projectsPage.setItemPriority(2, 'rgb(255, 51, 0)', '#Div1 > span:nth-child(1)');
  await projectsPage.setItemPriority(3, 'rgb(22, 139, 184)', '#Div1 > span:nth-child(2)');
  await projectsPage.setItemPriority(1, 'rgb(81, 153, 45)', '#Div1 > span:nth-child(3)');
  await projectsPage.sortItemsByPriority();
});
