import { Locator, Page, expect } from '@playwright/test';

export class ProjectsPage {
  readonly page: Page;
  readonly loader: Locator;
  readonly addProjectButton: Locator;
  readonly projectInput: Locator;
  readonly saveProjectButton: Locator;
  readonly itemInput: Locator;
  readonly sortButton: Locator;
  readonly sortPriorityButton: Locator;
  readonly messageInfo: Locator;
  readonly firstItem: Locator;
  readonly secondItem: Locator;
  readonly thirdItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loader = page.locator('#LoaderImg');
    this.addProjectButton = page.locator('#Div2');
    this.projectInput = page.locator('#NewProjNameInput');
    this.saveProjectButton = page.locator('#NewProjNameButton');
    this.itemInput = page.locator('#NewItemContentInput');
    this.sortButton = page.locator('#SortMenu');
    this.sortPriorityButton = page.locator('#moreContextMenu > li.priority > a');
    this.messageInfo = page.locator('#HeaderMessageInfo');
    this.firstItem = page.locator('#mainItemList > li:nth-child(1)');
    this.secondItem = page.locator('#mainItemList > li:nth-child(2)');
    this.thirdItem = page.locator('#mainItemList > li:nth-child(3)');
  }

  async createProject(projectName: string) {
    await this.addProjectButton.click();
    await this.projectInput.fill(projectName);
    await this.saveProjectButton.click();
    await this.loader.waitFor({ state: 'hidden' });
  }

  async createItem(content: string) {
    await this.itemInput.waitFor({ state: 'visible' });
    await this.itemInput.fill(content);
    await this.page.keyboard.press('Enter');
    await this.loader.waitFor({ state: 'hidden' });
  }

  async setItemPriority(itemIndex: number, color: string, prioritySelector: string) {
    const item = this.page.locator(`#mainItemList > li:nth-child(${itemIndex})`);
    const itemOptions = item.locator('.ItemMenu');

    await item.hover();
    await itemOptions.waitFor({ state: 'visible' });
    await itemOptions.click();

    const priorityOption = this.page.locator(prioritySelector);
    await priorityOption.waitFor({ state: 'visible', timeout: 10000 });
    await priorityOption.click();

    await this.loader.waitFor({ state: 'hidden' });
    await expect(item.locator('.ItemContentDiv')).toHaveCSS('color', color);
  }

  async sortItemsByPriority() {
    await this.sortButton.click();
    await this.sortPriorityButton.click();
    await this.loader.waitFor({ state: 'hidden' });

    await expect(this.messageInfo).toHaveText(/.*Sorted by Priority.*/);
    await expect(this.firstItem.locator('.ItemContentDiv')).toHaveCSS('color', "rgb(255, 51, 0)");
    await expect(this.secondItem.locator('.ItemContentDiv')).toHaveCSS('color', "rgb(22, 139, 184)");
    await expect(this.thirdItem.locator('.ItemContentDiv')).toHaveCSS('color', "rgb(81, 153, 45)");
  }
}
