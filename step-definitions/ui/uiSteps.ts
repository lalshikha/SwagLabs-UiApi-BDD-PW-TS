import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../fixtures/world';
import CommonPage from '../../pages/CommonPage';

Then('visual validation passes for {word} element', async function (this: CustomWorld, elementName: string) {
  const commonPage = new CommonPage(this.page!);
  await commonPage.assertVisualElement(elementName);
});

Then('visual validation passes for {word} page', async function (this: CustomWorld, pageName: string) {
  const commonPage = new CommonPage(this.page!);
  await commonPage.assertVisualPage(pageName);
});
