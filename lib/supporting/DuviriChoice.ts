import type { BaseContentObject } from '../models/WorldstateObject';

export interface RawChoice extends BaseContentObject {
  Category: 'EXC_NORMAL' | 'EXC_HARD';
  Choices: string[];
}

/**
 * Single category of duviri choices
 */
export default class DuviriChoice {
  category: string;
  categoryKey: string;
  choices: string[];

  constructor(data: RawChoice) {
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
