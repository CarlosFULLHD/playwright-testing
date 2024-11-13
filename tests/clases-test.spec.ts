import { test, expect } from '@playwright/test';

class SignupPage {
  page: any;
  SignUpButon: any;
  CompleteNameField: any;
  EmailField: any;
  PWDField: any;
  TermsCheckbox: any;
  SubmitButon: any;

  constructor(page) {
    this.page = page;
    this.SignUpButon = page.locator('.HPHeaderSignup > a');
    this.CompleteNameField = page.locator('#ctl00_MainContent_SignupControl1_TextBoxFullName');
    this.EmailField = page.locator('#ctl00_MainContent_SignupControl1_TextBoxEmail');
    this.PWDField = page.locator('#ctl00_MainContent_SignupControl1_TextBoxPassword');
    this.TermsCheckbox = page.getByLabel('I have read and agree to the');
    this.SubmitButon = page.getByRole('button', { name: 'Submit' });
  }

  async OpenWebpage() {
    await this.page.goto('https://todo.ly/');
  }

  async clickOnSignUpFree() {
    await this.SignUpButon.click();
  }

  async FillUserData(fullName: string, email: string, password: string) {
    await this.CompleteNameField.fill(fullName);
    await this.EmailField.fill(email);
    await this.PWDField.fill(password);
  }

  async SaveNewUser() {
    await this.TermsCheckbox.check();
    await this.SubmitButon.click();
  }

  async checkSession() {
    await this.page.waitForSelector('#MainContentTasks');
  }
}

function GenerateRandomData() {
  const randomNum = Math.floor(Math.random() * 10000);
  const fullName = `Usuario${randomNum}`;
  const email = `usuario${randomNum}@example.com`;
  const password = `Pass${randomNum}!`;
  return { fullName, email, password };
}

test('Registro de nuevo usuario', async ({ page }) => {
  const signupPage = new SignupPage(page);

  const { fullName, email, password } = GenerateRandomData();

  await signupPage.OpenWebpage();
  await signupPage.clickOnSignUpFree();
  await signupPage.FillUserData(fullName, email, password);
  await signupPage.SaveNewUser();

  await signupPage.checkSession();
});
