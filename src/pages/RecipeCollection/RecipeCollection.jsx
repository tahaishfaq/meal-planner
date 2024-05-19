import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

const RecipeCollection = () => {
  const [recipes, setRecipies] = useState([]);

  useEffect(() => {
    axios.get(`${window.$BackEndURL}/api/recipe/getAll`).then((res) => {
      console.log(res?.data);
      setRecipies(res?.data);
    });
  }, []);
  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl pt-10 font-poppin">
        <h1 className="text-4xl font-poppin pb-6">Recipes</h1>
        <div className="flex items-center flex-wrap gap-4">
          {recipes?.map((recipe) => (
            <div
              key={recipe.id}
              className="flex flex-col items-start border border-gray-400 p-4 gap-y-3 rounded-md cursor-pointer w-60"
            >
              <img
                alt="image"
                src={
                    recipe.image ||
                "https://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/air_fryer_chicken_wings_39019_16x9.jpg"
              }
                className="w-60 h-60 object-cover object-center rounded-md"
              />
              <span className="text-base font-normal ">
                {recipe?.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipeCollection;
