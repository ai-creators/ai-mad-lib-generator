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
  adlibPlay: {
    path: "/adlib/:adlibId/play",
    execute: ({ id }: { id: string }) =>
      `/adlib/${encodeURIComponent(id)}/play`,
  },
  adlib: {
    path: "/adlib/:adlibId",
    execute: ({ id }: { id: string }) => `/adlib/${encodeURIComponent(id)}`,
  },
  saves: {
    path: "/saves",
  },
  settings: {
    path: "/settings",
  },
  category: {
    path: "/category/:categoryName",
    execute: ({ category }: { category: string }) =>
      `/categories/${encodeURIComponent(category)}`,
  },
  categories: {
    path: "/categories",
    execute: ({ category }: { category: string }) =>
      `/categories?q=${encodeURIComponent(category)}`,
  },
};
