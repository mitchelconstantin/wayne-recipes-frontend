import { Handler } from "@netlify/functions";
import { supabase } from "../../utils/db";
import { middy } from "../../utils/middleware";

const createFilterList = (arr: any[], field: string) => {
  return [...new Set(arr.flatMap((r) => r[field] || []))].sort();
};

const getAllFilters: Handler = async (event, context) => {
  const { data } = await supabase.from("recipes").select(
    `
    source,
    mainIngredient,
    region,
    type
    `
  );

  const filters = {
    sources: createFilterList(data || [], "source"),
    mainIngredients: createFilterList(data || [], "mainIngredient"),
    regions: createFilterList(data || [], "region"),
    types: createFilterList(data || [], "type"),
  };

  return {
    statusCode: 200,
    body: JSON.stringify(filters),
  };
};

exports.handler = middy(getAllFilters);
