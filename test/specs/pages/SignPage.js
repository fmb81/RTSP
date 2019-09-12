import Page from './Page';

class SignInPage extends Page {

  get email() { return $('#email'); }
  get firstName() { return $('#firstName'); }
  get lastName() { return $('#lastName'); }
  get password() { return $('#password'); }
  get confirmPasswword() { return $('#confirmPasswword'); }
  get submitBtn() { return $('form button[type="submit"]'); }

  open(url) {
    super.open(url);
  }

  submit() {
    this.submitBtn.click();
  }

}

export default new SignInPage();