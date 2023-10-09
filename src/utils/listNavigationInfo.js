export const listNavigation = [
  {
    id: 0,
    navIndex: "Students",
    icon: "persons",
  },
  {
    id: 1,
    navIndex: "Lessons",
    icon: "book",
  },
];

export const getNavigationData = (index) => {
  return listNavigation.filter((nav) => nav.id === index)[0];
};
