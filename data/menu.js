import { CONSTANTS, ROUTES } from "../utils/constants";
import {
  HiOutlineChartPie,
  HiOutlineBookOpen,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineCreditCard,
} from "react-icons/hi";

export const menu = [
  {
    name: "Dashboard",
    for: CONSTANTS.USER_TYPES.ALL,
    link: ROUTES.GENERAL.OVERVIEW,
    icon: <HiOutlineChartPie />,
  },
  {
    name: "Class",
    for: CONSTANTS.USER_TYPES.STUDENT,
    link: ROUTES.STUDENT.MY_CLASS,
    icon: <HiOutlineBookOpen />,
  },
  {
    name: "Classes",
    for: CONSTANTS.USER_TYPES.ADMIN,
    link: ROUTES.ADMIN.CLASSES,
    icon: <HiOutlineBookOpen />,
  },
  {
    name: "Students",
    for: CONSTANTS.USER_TYPES.ADMIN,
    link: ROUTES.ADMIN.STUDENTS,
    icon: <HiOutlineUserGroup />,
  },
  {
    name: "Instructors",
    for: CONSTANTS.USER_TYPES.ADMIN,
    link: ROUTES.ADMIN.INSTRUCTORS,
    icon: <HiOutlineUsers />,
  },
  {
    name: "Payments",
    for: CONSTANTS.USER_TYPES.ADMIN,
    link: ROUTES.ADMIN.PAYMENTS,
    icon: <HiOutlineCreditCard />,
  },
  {
    name: "Topics",
    for: CONSTANTS.USER_TYPES.INSTRUCTOR,
    link: ROUTES.INSTRUCTOR.TOPICS,
    icon: <HiOutlineBookOpen />,
  },
];
