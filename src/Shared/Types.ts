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
  reviewScore?: number;
  numberOfReviews?: number;
}

export interface IFilterOptions {
  mainIngredients: string[];
  regions: string[];
  types: string[];
  sources: string[];
}

export const emptyFilterOptions: IFilterOptions = {
  mainIngredients: [] as string[],
  regions: [] as string[],
  types: [] as string[],
  sources: [] as string[],
};

export interface IFilters {
  debouncedSearchTerm: string;
  mainIngredient: string;
  region: string;
  type: string;
  source: string;
}

export const emptyFilters: IFilters = {
  debouncedSearchTerm: "",
  mainIngredient: "",
  region: "",
  type: "",
  source: "",
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
  reviewScore: undefined,
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
