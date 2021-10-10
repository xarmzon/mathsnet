import { PER_PAGE } from "./constants";

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
  modelOptions: any
) => {
  const { limit, offset } = getPagination(page, perPage);
  //console.log("limit=%d offset=%d", limit, offset);
  const results = await Model.find(modelOptions)
    .sort("-createdAt")
    .skip(offset)
    .limit(limit);
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
