import { useParams, useSearchParams } from "react-router-dom";
import Container from "../../../components/container/Container";
import Layout from "../../../layout/Layout";
import ButtonLight from "../../../components/button/button-light/ButtonLight";
import { useState } from "react";
import Feed from "../../../components/feed/Feed";
import CategoryService from "../../../services/CategoryService";
import NavbarItems from "../../../components/navbar/navbar-items/NavbarItems";
import AdlibCategoriesSearchCard from "../../../components/adlib/adlib-categories/adlib-categories-search-card/AdlibCategoriesSearchCard";

const CategoriesPage = () => {
  const [searchParmas, setSearchParams] = useSearchParams();

  const categoryName = searchParmas.get("q");

  const [timestamp] = useState<Date>(new Date());
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(25);

  const getAdlibs = () => {
    return CategoryService.getAdlibsByCategory(
      categoryName ?? "",
      timestamp,
      page,
      size
    );
  };

  return (
    <Layout>
      <Container className="grid-aside gap-5 my-5">
        <aside className="flex flex-col gap-5">
          <NavbarItems />
        </aside>
        <div className="flex flex-col gap-5">
          <AdlibCategoriesSearchCard />
          <Feed
            executable={getAdlibs}
            setPage={setPage}
            feedType={categoryName ?? ""}
            header={
              <header className="flex justify-between">
                <h2 className="text-xl font-semibold">
                  Results for #{categoryName}
                </h2>
                <ul className="flex items-center">
                  <li>
                    <ButtonLight>Newest</ButtonLight>
                  </li>
                  <li>
                    <ButtonLight>Popular</ButtonLight>
                  </li>
                  <li>
                    <ButtonLight>Oldest</ButtonLight>
                  </li>
                </ul>
              </header>
            }
          />
        </div>
        <div></div>
      </Container>
    </Layout>
  );
};

export default CategoriesPage;
