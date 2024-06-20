document.addEventListener('DOMContentLoaded', function () {
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');
    const logoutButton = document.getElementById('logout-button');

    // Load recipes from localStorage
    function loadRecipes() {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipeList.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const recipeItem = document.createElement('div');
            recipeItem.className = 'recipe-item';
            recipeItem.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <div>
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                    <p><strong>Ingredientes:</strong> ${recipe.ingredients}</p>
                    <p><strong>Procedimiento:</strong> ${recipe.procedure}</p>
                </div>
                <div>
                    <button onclick="editRecipe(${index})">Editar</button>
                    <button onclick="deleteRecipe(${index})">Eliminar</button>
                </div>
            `;
            recipeList.appendChild(recipeItem);
        });
    }

    // Save recipe
    recipeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const recipeId = document.getElementById('recipe-id').value;
        const recipeName = document.getElementById('recipe-name').value;
        const recipeDescription = document.getElementById('recipe-description').value;
        const recipeIngredients = document.getElementById('recipe-ingredients').value;
        const recipeProcedure = document.getElementById('recipe-procedure').value;
        const recipeImage = document.getElementById('recipe-image').files[0];

        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            const recipe = {
                name: recipeName,
                description: recipeDescription,
                ingredients: recipeIngredients,
                procedure: recipeProcedure,
                image: imageData
            };

            let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
            if (recipeId) {
                recipes[recipeId] = recipe;
            } else {
                recipes.push(recipe);
            }
            localStorage.setItem('recipes', JSON.stringify(recipes));
            loadRecipes();
            recipeForm.reset();
        };
        reader.readAsDataURL(recipeImage);
    });

    // Edit recipe
    window.editRecipe = function (index) {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const recipe = recipes[index];
        document.getElementById('recipe-id').value = index;
        document.getElementById('recipe-name').value = recipe.name;
        document.getElementById('recipe-description').value = recipe.description;
        document.getElementById('recipe-ingredients').value = recipe.ingredients;
        document.getElementById('recipe-procedure').value = recipe.procedure;
    };

    // Delete recipe
    window.deleteRecipe = function (index) {
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        loadRecipes();
    };

    // Logout
    logoutButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    // Initial load
    loadRecipes();
});
