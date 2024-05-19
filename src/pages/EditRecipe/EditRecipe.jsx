import React, { useEffect, useState } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import HeroSection from "../../components/HeroSection";
import Header from "../../components/Header";
import { XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [image, setRecipeImage] = useState("");

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      servings: "",
      cookingTime: "",
      ingredients: [{ name: "" }],
      steps: [""],
    },
    onSubmit: (values) => {
      const json = {
        title: values.name,
        shortDescription: values.description,
        cookingTime: values.cookingTime,
        ingredients: values.ingredients,
        methodSteps: values.steps,
      };
      console.log(json);
      try {
        axios
          .put(`${window.$BackEndURL}/api/recipe/edit-recipe/${recipeId}`, json)
          .then((res) => {
            console.log(res?.data);
            toast.success(res?.data?.message);
            setTimeout(() => {
              navigate("/recipe-collection");
            }, 200);
          });
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while updating the recipe.");
      }
    },
  });

  useEffect(() => {
    // Fetch the recipe data by ID and populate the form
    axios
      .get(`${window.$BackEndURL}/api/recipe/get-recipe/${recipeId}`)
      .then((res) => {
        const recipe = res.data;
        console.log(recipe);
        setRecipeImage(recipe.image);
        formik.setValues({
          name: recipe.title || "",
          description: recipe.shortDescription || "",
          servings: recipe.servings || "",
          cookingTime: recipe.cookingTime || "",
          ingredients: recipe.ingredients || [{ name: "" }],
          steps: recipe.methodSteps || [""],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        toast.error("An error occurred while fetching the recipe.");
        setLoading(false);
      });
  }, [recipeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <HeroSection>
      <Toaster richColors />
      <Header />
      <div className="flex flex-col gap-y-5 justify-center items-center pt-6 font-poppin pb-10">
        <div className="pt-10">
          <h1 className="font-normal text-4xl">Add Imported Recipe</h1>
        </div>
        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-center gap-y-2"
          >
            <img
              src={
                image ||
                "https://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/air_fryer_chicken_wings_39019_16x9.jpg"
              }
              alt="image"
              className="w-[30%] rounded-md"
            />

            <input
              className="border border-black w-[30%] p-2 rounded-lg"
              type="text"
              placeholder="Recipe Name"
              {...formik.getFieldProps("name")}
            />
            <textarea
              className="border border-black w-[30%] p-2 rounded-lg"
              placeholder="Description"
              {...formik.getFieldProps("description")}
            />
            <input
              className="border border-black w-[30%] p-2 rounded-lg"
              type="text"
              placeholder="Servings"
              {...formik.getFieldProps("servings")}
            />
            <input
              className="border border-black w-[30%] p-2 rounded-lg"
              type="text"
              placeholder="Cooking Time"
              {...formik.getFieldProps("cookingTime")}
            />
            <div className="w-[30%]">
              <h3 className="py-2 font-normal text-xl">Ingredients</h3>
              <FieldArray name="ingredients">
                {({ push, remove, form }) => (
                  <div>
                    {form.values.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-x-2">
                        <input
                          className="p-2 border border-black mb-1.5 rounded-lg"
                          type="text"
                          placeholder="Ingredient"
                          {...formik.getFieldProps(`ingredients.${index}.name`)}
                        />
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            <XCircleIcon className="h-7 w-7 text-red-500" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ name: "" })}
                      className="mt-2 inline-flex items-center rounded-full bg-[#FF6259] hover:bg-[#fc5950] px-3.5 py-2.5 text-sm font-normal text-white shadow-sm "
                    >
                      Add Ingredient
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="w-[30%]">
              <h3 className="py-2 font-normal text-xl">Steps</h3>
              <FieldArray name="steps">
                {({ push, remove, form }) => (
                  <div>
                    {form.values.steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-x-2">
                        <input
                          className="p-2 border border-black w-80 mb-1.5 rounded-lg"
                          type="text"
                          placeholder={`Step ${index + 1}`}
                          {...formik.getFieldProps(`steps.${index}`)}
                        />
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            <XCircleIcon className="h-7 w-7 text-red-500" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push("")}
                      className="mt-2 inline-flex items-center rounded-full bg-[#FF6259] hover:bg-[#fc5950] px-3.5 py-2.5 text-sm font-normal text-white shadow-sm "
                    >
                      Add Step
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <button
              type="submit"
              className="w-[30%] mt-5 justify-center items-center rounded-full bg-[#FF6259] py-2.5 text-sm font-normal text-white shadow-sm hover:bg-[#fc5950]"
            >
              Update
            </button>
          </form>
        </FormikProvider>
      </div>
    </HeroSection>
  );
};

export default EditRecipe;
