export const routerConfig = {
  root: {
    path: "/",
  },
  create: {
    path: "/create",
  },
  browse: {
    path: "/browse",
    execute: ({ search }: { search: string }) =>
      `/browse?q=${encodeURIComponent(search)}`,
  },
};
