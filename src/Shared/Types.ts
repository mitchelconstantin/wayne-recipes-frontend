export interface IRecipe {
  id: string | undefined;
  type?: string;
  source?: string;
  serves?: string;
  title: string;
  picture?: string;
  ingredients: string;
  directions?: string;
  mainIngredient?: string;
  region: string;
  netCarbs?: string;
  rating?: number;
  // reviewScore?: number;
  numberOfReviews?: number;
}

export interface IFilterOptions {
  mainIngredients: string[];
  regions: string[];
  types: string[];
  sources: string[];
  ratings: number[];
}

export const emptyFilterOptions: IFilterOptions = {
  mainIngredients: [] as string[],
  regions: [] as string[],
  types: [] as string[],
  sources: [] as string[],
  ratings: [0, 1, 2, 3, 4, 5],
};

export interface IFilters {
  debouncedSearchTerm: string;
  mainIngredient: string;
  region: string;
  type: string;
  source: string;
  rating: number;
}

export const emptyFilters: IFilters = {
  debouncedSearchTerm: "",
  mainIngredient: "",
  region: "",
  type: "",
  source: "",
  rating: 0,
};

export const emptyRecipe: IRecipe = {
  id: undefined,
  type: "",
  title: "",
  picture: "",
  source: "",
  serves: "",
  ingredients: "",
  directions: "",
  mainIngredient: "",
  region: "",
  netCarbs: "",
  rating: undefined,
};

export type IShoppingListItem = {
  id: string | undefined;
  title: string;
  picture?: string;
  ingredients: string;
  quantity: number;
  recipe_id: string;
};

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  isOwner: boolean;
}

export const emptyUser: IUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  isAdmin: false,
  isOwner: false,
};

export interface IReview {
  reviewerEmail: string;
  reviewerName?: string;
  recipeId: string;
  score: number | null;
  comment: string;
  date?: string;
}
