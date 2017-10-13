import { VirgilAppPage } from './app.po';

describe('virgil-app App', () => {
  let page: VirgilAppPage;

  beforeEach(() => {
    page = new VirgilAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
