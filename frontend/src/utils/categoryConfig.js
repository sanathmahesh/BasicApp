import { CATEGORIES } from '../constants/categories';

export function getCategoryConfig(categoryValue) {
  return CATEGORIES.find((c) => c.value === categoryValue) || CATEGORIES[CATEGORIES.length - 1];
}

export function getCategoryColor(categoryValue) {
  return getCategoryConfig(categoryValue).color;
}
