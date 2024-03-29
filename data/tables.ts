export interface IHeader {
  value: string;
  width?: string;
}
export const classesHeader: IHeader[] = [
  {
    value: "Title",
    width: "",
  },
  {
    value: "Price",
    width: "",
  },
  {
    value: "Sub. Month",
    width: "",
  },
  {
    value: "Created At",
    width: "",
  },
];
export const topicsHeader: IHeader[] = [
  {
    value: "Title",
    width: "",
  },
  {
    value: "Class",
    width: "",
  },
  {
    value: "Created At",
    width: "",
  },
];

export const instructorListHeader: IHeader[] = [
  {
    value: "Name",
  },
  {
    value: "Username",
  },
  {
    value: "Email",
  },
  {
    value: "Joined Date",
  },
];
