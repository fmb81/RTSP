import SignObjectPage from './pages/SignPage.js';
import { assert } from 'chai';

const email = `email_${new Date().getTime()}@test.test`

describe('e2e test', () => {
  it('sign up', () => {
    SignObjectPage.open('/signup')
    SignObjectPage.email.setValue(email)
    SignObjectPage.firstName.setValue('First Name')
    SignObjectPage.lastName.setValue('Last Name')
    SignObjectPage.password.setValue('123456')
    SignObjectPage.confirmPasswword.setValue('123456')
    SignObjectPage.submit()
    const notification = browser.$('div[data-test-id="notification"]')
    notification.waitForExist(5000);
    assert.equal(notification.getText(), 'Your account has been successfully created')
  });
  it('sign in', () => {
    SignObjectPage.open('/signin')
    SignObjectPage.email.setValue(email)
    SignObjectPage.password.setValue('123456')
    SignObjectPage.submit()
    const notification = browser.$('div[data-test-id="header"]')
    notification.waitForExist(5000);
  });
});
