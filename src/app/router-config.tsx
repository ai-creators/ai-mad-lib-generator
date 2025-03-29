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
  adlibPlayResult: {
    path: "/adlib/:adlibId/play/:resultId",
    execute: ({ adlibId, resultId }: { adlibId: string; resultId: string }) =>
      `/adlib/${encodeURIComponent(adlibId)}/play/${encodeURIComponent(resultId)}`,
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
