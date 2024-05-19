import { useState} from 'react'
import './App.css'
import Homepage from "./pages/Homepage/Homepage"
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditRecipe from './pages/EditRecipe/EditRecipe';
import RecipeCollection from './pages/RecipeCollection/RecipeCollection';

function App() {
  const [count, setCount] = useState(0)

  

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/createrecipe" element={<CreateRecipe />} />
          <Route path="/edit-recipe/:recipeId" element={<EditRecipe />} />
          <Route path="/recipe-collection" element={<RecipeCollection />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
