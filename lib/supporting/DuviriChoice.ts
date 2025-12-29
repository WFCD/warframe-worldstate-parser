import type { BaseContentObject } from '../models';

export interface RawChoice extends BaseContentObject {
  Category: 'EXC_NORMAL' | 'EXC_HARD';
  Choices: string[];
}

/**
 * Single category of duviri choices
 */
export class DuviriChoice {
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
