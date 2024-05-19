import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GlobeAltIcon, PencilIcon } from "@heroicons/react/24/solid";
import Logo from "../assets/Logo.png";
import HeroSection from "./HeroSection";
import RecipeModal from "./RecipeModal";

const HeroSectionLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <HeroSection>
        <div className="flex items-center justify-center flex-col h-full">
          <div className="sm:flex sm:justify-center">
            <div className="">
              <img className="w-96 h-auto " src={Logo} alt="" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-normal   sm:text-2xl">
              How do you want to create your recipe?
            </h1>

            <div className="mt-10 flex lg:flex-row flex-col gap-y-4 items-center justify-center gap-x-6">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center rounded-md bg-[#FF6259] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#fc5950] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <GlobeAltIcon className="h-5 w-5 mr-2" />
                Import from the Web
              </button>

              <Link
                to="CreateRecipe"
                className="inline-flex items-center rounded-md bg-[#FF6259] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#fc5950] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PencilIcon className="h-5 w-5 mr-2" />
                Create from the scratch
              </Link>
            </div>
          </div>
        </div>
      </HeroSection>
      <RecipeModal open={open} setOpen={setOpen} />
    </>
  );
};

export default HeroSectionLayout;
