import { useState } from "react";

import RecipeModal from "./RecipeModal";



const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function HeroSection({children}) {
 
  return (
    <>
    <div className="w-full mx-auto ">
     {children}
      </div>

      
    </>
  );
}
