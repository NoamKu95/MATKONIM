import { images } from "../constants/images";

export interface Category {
  id: number;
  name: string;
  name_english: string;
  isWideImage: boolean;
  image: any;
}

export const CATEGORIES: Category[][] = [
  [
    {
      id: 1,
      name: "ראשונות",
      name_english: "Starters",
      isWideImage: true,
      image: images.appetizerYellow,
    },
    {
      id: 2,
      name: "מרקים",
      name_english: "Soup",
      isWideImage: false,
      image: images.soupGreen,
    },
    {
      id: 3,
      name: "סלטים",
      name_english: "Salads",
      isWideImage: false,
      image: images.saladPink,
    },
  ],
  [
    {
      id: 4,
      name: "עופות",
      name_english: "Chicken",
      isWideImage: false,
      image: images.chickenRed,
    },
    {
      id: 5,
      name: "בשרים",
      name_english: "Meat",
      isWideImage: true,
      image: images.steakBlue,
    },
    {
      id: 6,
      name: "דגים",
      name_english: "Fish",
      isWideImage: false,
      image: images.salmonPink,
    },
  ],
  [
    {
      id: 7,
      name: "פסטה",
      name_english: "Pasta",
      isWideImage: false,
      image: images.pastaPink,
    },
    {
      id: 8,
      name: "קינוחים",
      name_english: "Dessert",
      isWideImage: false,
      image: images.cakeGreen,
    },
    {
      id: 9,
      name: "קוקטיילים",
      name_english: "Cocktail",
      isWideImage: true,
      image: images.cocktailOrange,
    },
  ],
];
