/**
 * Single category of duviri choices
 */
export default class DuviriChoice {
  constructor(data) {
    switch (data.Category) {
      case 'EXC_NORMAL':
        this.category = 'normal';
        break;
      case 'EXC_HARD':
        this.category = 'hard';
    }
    this.categoryKey = data.Category;
    this.choices = data.Choices;
  }
}
