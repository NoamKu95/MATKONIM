import { Ingredient } from "./ingredient";

export interface Recipe {
  id: string;
  name: string;
  image: string | null;
  duration: string;
  serving: number;
  category: string;
  ingredients: Ingredient[];
  preparationSteps: string[];
}
