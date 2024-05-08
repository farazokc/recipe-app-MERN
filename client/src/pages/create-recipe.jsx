import { useState } from "react";
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';

// ! VIDEO TIMESTAMP: 1:59:34

const CreateRecipe = () => {
  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const formValidation = () => {
    if (recipe.userOwner === "" || !recipe.userOwner) {
      alert("Please login again to the app");
      return false;
    }
    return true;
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if(formValidation()){
      try {
        const res = await axios.post('http://localhost:3001/recipes', recipe);
        alert("Recipe created");
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="create-recipe">
      <h2> Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} required/>

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <div className="flex">
            <input
              type="text"
              key={idx}
              name="ingredients"
              value={ingredient}
              minLength={1}
              onChange={(event) => handleIngredientChange(event, idx)}
              required
            />
            <button id={idx} type="button" style={{"height":"100%"}}>X</button>
          </div>
        ))}
        <button onClick={addIngredient} type="button">Add Ingredient</button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions"
          id="instructions"
          minLength={5}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          onChange={handleChange}
          required
        />

        <label htmlFor="cookingTime">Cooking Time</label>
        <input
          type="number"
          name="cookingTime"
          id="cookingTime"
          min={0}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
