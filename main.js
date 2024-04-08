    const searchBtn = document.getElementById('search-btn');
    const mealList = document.getElementById('meal');
    const mealDetailsContent = document.querySelector('.meal-details-content');
    const recipeCloseBtn = document.getElementById('recipe-close-btn');

    searchBtn.addEventListener('click', getMealList);
    mealList.addEventListener('click', getMealRecipe);
    recipeCloseBtn.addEventListener('click', closeRecipe);



//https://www.themealdb.com/api.php
//https://www.themealdb.com/api/json/v1/1/filter.php?i    
// Filter by main ingredient
// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

// get meal list that matches with the ingredients, (trim() - removes spaces)

    function getMealList() {
        const searchInput = document.getElementById('search-input').value.trim();
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
            .then(response => response.json())
            .then(data => {
                displayMeals(data.meals);
            });
    }

    function displayMeals(meals) {
        const mealContainer = document.getElementById('meal');
        if (!meals) {
            mealContainer.innerHTML = "<p>Sorry, we didn't find any meal! Please try other ingredients</p>";
            mealContainer.classList.add('notFound');
            return;
        }
        const mealItems = meals.map(meal => `
            <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
        `).join('');
        mealContainer.innerHTML = mealItems;
        mealContainer.classList.remove('notFound');
    }

// Lookup full meal details by id
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772

    function getMealRecipe(event) {
        event.preventDefault();
        const clickedElement = event.target;
        if (clickedElement.classList.contains('recipe-btn')) {
            const mealId = clickedElement.closest('.meal-item').dataset.id;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(response => response.json())
                .then(data => {
                    displayMealRecipe(data.meals[0]);
                });
        }
    }

    function displayMealRecipe(meal) {
        mealDetailsContent.innerHTML = `
            <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
                <h3>Instructions:</h3>
                <p>${meal.strInstructions}</p>
            </div>
            <div class="recipe-meal-img">
                <img src="${meal.strMealThumb}" alt="">
            </div>
            <div class="recipe-link">
                <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>
        `;
        mealDetailsContent.parentElement.classList.add('showRecipe');
    }

    function closeRecipe() {
        mealDetailsContent.parentElement.classList.remove('showRecipe');
    }




//class showRecipe - display block


// The join('') method is used to concatenate all elements of an array into a single string. When you call join('') on an array, it joins each element of the array together, separating them with an empty string ('').



// The closest() method searches up the DOM tree for elements which matches a specified CSS selector.

// The closest() method starts at the element itself, then the anchestors (parent, grandparent, ...) until a match is found.

// The closest() method returns null() if no match is found.

//event.preventDefault() - It prevents the default action of the click event (here, following the link) and retrieves the ID of the clicked meal item. 