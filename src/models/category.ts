import { images } from "../constants/images";

export interface Category {
  id: number;
  name: string;
  englishName: string;
  isWideImage: boolean;
  image: any;
}

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "ראשונות",
    isWideImage: true,
    image: images.appetizerYellow,
  },
  {
    id: 2,
    name: "מרקים",
    isWideImage: false,
    image: images.soupGreen,
  },
  {
    id: 3,
    name: "סלטים",
    isWideImage: false,
    image: images.saladPink,
  },
  {
    id: 4,
    name: "עופות",
    isWideImage: false,
    image: images.chickenRed,
  },
  {
    id: 5,
    name: "בשרים",
    isWideImage: true,
    image: images.steakBlue,
  },
  {
    id: 6,
    name: "דגים",
    isWideImage: false,
    image: images.salmonPink,
  },
  {
    id: 7,
    name: "פסטה",
    isWideImage: false,
    image: images.pastaPink,
  },
  {
    id: 8,
    name: "קינוחים",
    isWideImage: false,
    image: images.cakeGreen,
  },
  {
    id: 9,
    name: "קוקטיילים",
    isWideImage: true,
    image: images.cocktailOrange,
  },
];

export const CategoryCards: Category[][] = [
  [
    {
      id: 1,
      name: "ראשונות",
      englishName: "Starters",
      isWideImage: true,
      image: images.appetizerYellow,
    },
    {
      id: 2,
      name: "מרקים",
      englishName: "Soups",
      isWideImage: false,
      image: images.soupGreen,
    },
    {
      id: 3,
      name: "סלטים",
      englishName: "Salads",
      isWideImage: false,
      image: images.saladPink,
    },
  ],
  [
    {
      id: 4,
      name: "עופות",
      englishName: "Chicken",
      isWideImage: false,
      image: images.chickenRed,
    },
    {
      id: 5,
      name: "בשרים",
      englishName: "Meat",
      isWideImage: true,
      image: images.steakBlue,
    },
    {
      id: 6,
      name: "דגים",
      englishName: "Fish",
      isWideImage: false,
      image: images.salmonPink,
    },
  ],
  [
    {
      id: 7,
      name: "פסטה",
      englishName: "Pasta",
      isWideImage: false,
      image: images.pastaPink,
    },
    {
      id: 8,
      name: "קינוחים",
      englishName: "Desserts",
      isWideImage: false,
      image: images.cakeGreen,
    },
    {
      id: 9,
      name: "קוקטיילים",
      englishName: "Cocktails",
      isWideImage: true,
      image: images.cocktailOrange,
    },
  ],
];
