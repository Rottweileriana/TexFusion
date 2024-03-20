import React, { useState, useEffect } from 'react';
import Dish from './dish'

type Recipes = {
  recipes: Recipe[];
}

type Recipe = {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  price: number;
}

type Ingredient = {
  _id: string;
  name: string;
  amount: number;
  unit: string;
}

function MenuComponent() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const API_URL = 'https://iths-2024-recept-grupp6-bc215j.reky.se/recipes';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipes();

    return () => {
      setRecipes([]);
    };
  }, []);

  return (
    <>
      <h2>MENY</h2>
      {recipes && recipes.map((recipe) => (
        (recipe.title && recipe.title.trim() !== '') && (
          <Dish
            key={recipe._id}
            imageUrl={recipe.imageUrl}
            title={recipe.title}
            ingredients={recipe.ingredients}
            price={recipe.price}
          />
        )
      ))}
    </>
  );
}

export default MenuComponent;