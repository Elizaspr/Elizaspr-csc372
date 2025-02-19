// script.js
document.addEventListener("DOMContentLoaded", () => {
    setupDishClickEffects();
    setupMealPlan();
});

function setupDishClickEffects() {
    const dishes = document.querySelectorAll(".dish");
    
    dishes.forEach(dish => {
        dish.addEventListener("click", () => {
            dishes.forEach(d => {
                d.classList.remove("selected");
                const info = d.nextElementSibling;
                if (info && info.classList.contains("dish-info")) {
                    info.style.display = "none";
                }
            });
            
            dish.classList.add("selected");
            const info = dish.nextElementSibling;
            if (info && info.classList.contains("dish-info")) {
                info.style.display = "block";
            }
        });
    });
}
// Meal Plan Logic
let mealPlan = [];

function setupMealPlan() {
    document.querySelector("#dish-list").addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const [dishName, price] = event.target.innerText.split(" - $");
            addToMealPlan(dishName.trim(), parseFloat(price));
        }
    });
}

function addToMealPlan(dishName, price) {
    let existingDish = mealPlan.find(item => item.name === dishName);
    if (existingDish) {
        existingDish.quantity++;
    } else {
        mealPlan.push({ name: dishName, price: price, quantity: 1 });
    }
    updateMealPlan();
}

function removeFromMealPlan(dishName) {
    let dishIndex = mealPlan.findIndex(item => item.name === dishName);
    if (dishIndex !== -1) {
        if (mealPlan[dishIndex].quantity > 1) {
            mealPlan[dishIndex].quantity--;
        } else {
            mealPlan.splice(dishIndex, 1);
        }
    }
    updateMealPlan();
}

function updateMealPlan() {
    let selectedDishList = document.getElementById("selected-dish-list");
    let totalCost = document.getElementById("total-cost");
    selectedDishList.innerHTML = "";
    let total = 0;

    mealPlan.forEach(item => {
        total += item.price * item.quantity;
        let listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} - $${(item.price * item.quantity).toFixed(2)} (x${item.quantity}) 
            <button onclick="removeFromMealPlan('${item.name}')">Remove One</button>`;
        selectedDishList.appendChild(listItem);
    });

    totalCost.innerText = total.toFixed(2);
}
