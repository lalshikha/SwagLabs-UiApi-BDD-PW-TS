import { Then } from '../../fixtures/Fixtures';

Then('visual validation passes for {word} element', async ({ commonPage }, elementName: string) => {
  await commonPage.assertVisualElement(elementName);
});

Then('visual validation passes for {word} page', async ({ commonPage }, pageName: string) => {
  await commonPage.assertVisualPage(pageName);
});
