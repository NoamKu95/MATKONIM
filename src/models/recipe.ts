import {Ingredient} from './ingredient';

export interface Recipe {
  id: string;
  name: string;
  image: string;
  duration: string;
  serving: number;
  category: string;
  ingredients: Ingredient[];
  preparationSteps: string[];
}
