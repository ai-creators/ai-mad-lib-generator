import React from "react";
import { CategoryModel } from "../../../models/CategoryModel";
import CategoriesCard from "../categories-card/CategoriesCard";

type Props = {
  data: CategoryModel[];
};

const CategoriesList = ({ data }: Props) => {
  return (
    <ul>
      {data.map((category) => (
        <li key={category.id}>
          <CategoriesCard category={category} />
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
