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
