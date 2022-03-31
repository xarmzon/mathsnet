export interface ITopics {
  id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  videoLink: string;
  thumbnail: string;
}
export interface IClassData {
  id: string;
  price: number;
  title: string;
  desc: string;
  slug: string;
  thumbnail: string;
  subMonths: number;
  createdAt: string;
  topics: ITopics[];
}

export interface ISort {
  by: string;
  order: 1 | -1;
}
export interface ITopicOptions {
  match?: any;
  classMatch?: any;
  sample?: { size: number };
  sort?: ISort;
}

export interface IClassOptions {
  match?: any;
  topicMatch?: any;
  sample?: { size: number };
  sort?: ISort;
}

export interface IFeaturedClass {
  thumbnail?: string;
  title: string;
  price: string;
  shortDesc: string;
  topicsCount: number;
  slug: string;
}

export interface IFeaturedTopics {
  img: string;
  title: string;
  desc: string;
  slug: string;
  classData: {
    title: string;
    shortDesc: string;
    slug: string;
  };
}

export interface ICustomPaginationOptions {
  match?: any;
  sample?: { size: number };
  sort?: ISort;
}

export interface IClassCardProps {
  img?: string;
  topicsCount: number;
  priceTag: string;
  title: string;
  desc: string;
  slug: string;
  addedOn?: string;
}

export interface IPaging {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IPagingData<T> {
  results: T[];
  paging: IPaging;
}
