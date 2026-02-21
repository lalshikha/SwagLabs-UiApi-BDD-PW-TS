import { Then } from '@cucumber/cucumber';
import { Fixtures } from '../../fixtures/Fixtures';
import CommonPage from '../../pages/CommonPage';

Then('visual validation passes for {word} element', async function (this: Fixtures, elementName: string) {
  const commonPage = new CommonPage(this.page!);
  await commonPage.assertVisualElement(elementName);
});

Then('visual validation passes for {word} page', async function (this: Fixtures, pageName: string) {
  const commonPage = new CommonPage(this.page!);
  await commonPage.assertVisualPage(pageName);
});
