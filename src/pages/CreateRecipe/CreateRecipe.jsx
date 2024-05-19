import React from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import HeroSection from "../../components/HeroSection";
import Header from "../../components/Header";
import { XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
const CreateRecipe = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      description: "",
      servings: "",
      cookingTime: "",
      ingredients: [{ name: "" }],
      steps: [""],
    },
    onSubmit: (values) => {
      console.log(values);
      const json = {
        title: values.name,
        shortDescription: values.description,
        cookingTime: values.cookingTime,
        ingredients: values.ingredients,
        methodSteps: values.steps,
      };
      console.log(json);
      try {
        axios.post(`${window.$BackEndURL}/api/recipe/add`, json).then((res) => {
          console.log(res?.data);
          toast.success(res?.data?.message);
          setTimeout(() => {
            navigate("/recipe-collection")
          }, 200);
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <HeroSection>
      <Toaster richColors />
      <Header />
      <div className="flex flex-col gap-y-5 justify-center items-center pt-6 font-poppin pb-10">
        <div className="pt-10">
          <h1 className="font-normal text-4xl">Create Recipe Manually</h1>
        </div>
        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-center gap-y-2"
          >
            <div className="flex items-center justify-center w-[30%]">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-1 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 ">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    formik.setFieldValue("image", e.target.files[0])
                  }
                />
              </label>
            </div>
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
                      onClick={() => push("")}
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
              Save
            </button>
          </form>
        </FormikProvider>
      </div>
    </HeroSection>
  );
};

export default CreateRecipe;
