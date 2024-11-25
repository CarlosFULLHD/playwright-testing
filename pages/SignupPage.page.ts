export class SignupPage {
  page: any;
  signUpButton: any;
  nameField: any;
  emailField: any;
  passwordField: any;
  termsCheckbox: any;
  submitButton: any;

  constructor(page) {
    this.page = page;
    this.signUpButton = page.locator('.HPHeaderSignup > a');
    this.nameField = page.locator('#ctl00_MainContent_SignupControl1_TextBoxFullName');
    this.emailField = page.locator('#ctl00_MainContent_SignupControl1_TextBoxEmail');
    this.passwordField = page.locator('#ctl00_MainContent_SignupControl1_TextBoxPassword');
    this.termsCheckbox = page.getByLabel('I have read and agree to the');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async openPage() {
    await this.page.goto('https://todo.ly/');
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async fillUserData(name: string, email: string, password: string) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
  }

  async saveUser() {
    await this.termsCheckbox.check();
    await this.submitButton.click();
  }

  async verifySession() {
    await this.page.waitForSelector('#MainContentTasks');
  }
}
