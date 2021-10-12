import { PER_PAGE } from "./constants";
import { NextApiRequest } from "next";

export const getParamsForGetRequest = (req: NextApiRequest) => {
  let limit: number = req.query.limit
    ? parseInt(req.query.limit as string)
    : PER_PAGE;
  let page: number = req.query.page
    ? parseInt(req.query.page as string) - 1
    : 0;
  const searchTerm: string = req.query.search
    ? (req.query.search as string)
    : "";

  return { limit, page, searchTerm };
};

export const getPagination = (page: number, size?: number) => {
  const limit = size ? +size : PER_PAGE;
  const offset = page ? +page * limit : 0 * PER_PAGE;

  //console.log(offset, limit);
  return { limit, offset };
};

export const getPaginatedData = async (
  page: number,
  perPage: number,
  Model: any,
  modelOptions: any,
  removeItems?: string[]
) => {
  const { limit, offset } = getPagination(page, perPage);
  //console.log("limit=%d offset=%d", limit, offset);

  let results;

  if (removeItems && removeItems.length > 0) {
    results = await Model.find(modelOptions)
      .select(removeItems.map((d) => `-${d}`).join(" "))
      .sort("-createdAt")
      .skip(offset)
      .limit(limit);
  } else {
    results = await Model.find(modelOptions)
      .sort("-createdAt")
      .skip(offset)
      .limit(limit);
  }
  const totalItems = await Model.find(modelOptions).count();

  const totalPages = Math.ceil(totalItems / limit);
  return {
    results,
    paging: {
      totalPages,
      page: page + 1,
      totalItems,
      perPage,
    },
  };
};
