let fridgeList = [
    {
        "Name": "Beef",
        "Amount": 300
    },

    {
        "Name": "Cinnamon",
        "Amount": 200
    },

    {
        "Name": "Beef soup bones",
        "Amount": 400
    },

    {
        "Name": "Ginger",
        "Amount": 20
    },

    {
        "Name": "Cilantro",
        "Amount": 50
    },

    {
        "Name": "Noodle",
        "Amount": 500
    },
];

let recipeInfo = [
    {
        "Name": "Orange Chicken",
        "Ingredients": {
            "Chicken": 200,
            "Orange": 200,
            "Egg": 100,
            "Pepper": 100,
            "Lemon": 100
        },
        "Preview": "./img/OrangeChicken/oc_preview.jpg",
        "link": "./recipe_pages/recipe_page_oc.html",
        "favorite": true
    },

    {
        "Name": "Steak",
        "Ingredients": {
            "Beef": 200,
            "Garlic": 200,
            "Parsley": 100,
            "Lemon": 100
        },
        "Preview": "./img/Steak/steak_preview.jpg",
        "link": "./recipe_pages/recipe_page_steak.html",
        "favorite": true
    },

    {
        "Name": "Popcorn",
        "Ingredients": {
            "Corn": 100,
            "Sugar": 50,
            "Oil": 100,
        },
        "Preview": "./img/BP/bp_preview.jpg",
        "link": "./recipe_pages/recipe_page_bp.html",
        "favorite": true
    },

    {
        "Name": "Seafood Paella",
        "Ingredients": {
            "Onion": 100,
            "Tomato": 200,
            "Garlic": 100,
            "Shrimp": 300,
            "Mussel": 200,
            "Squid": 100,
            "Rice": 500
        },
        "Preview": "./img/SP/sp_preview.jpg",
        "link": "./recipe_pages/recipe_page_sp.html",
        "favorite": false
    },

    {
        "Name": "French Toast",
        "Ingredients": {
            "Cinnamon": 25,
            "Sugar": 50,
            "Egg": 100,
            "Bread": 500,
        },
        "Preview": "./img/FT/ft_preview.jpg",
        "link": "./recipe_pages/recipe_page_ft.html",
        "favorite": false
    },

    {
        "Name": "Chili Crab",
        "Ingredients": {
            "Cornstarch": 100,
            "Crab": 300,
            "Tomato sauce": 500,
            "Thai Chiles": 200,
        },
        "Preview": "./img/CC/cc_preview.jpg",
        "link": "./recipe_pages/recipe_page_cc.html",
        "favorite": false
    },

    {
        "Name": "Pho",
        "Ingredients": {
            "Beef soup bones": 400,
            "Ginger": 20,
            "Cilantro": 50,
            "Noodle": 500,
        },
        "Preview": "./img/Pho/pho_preview.jpg",
        "link": "./recipe_pages/recipe_page_pho.html",
        "favorite": false
    },

    {
        "Name": "Pastel de nata",
        "Ingredients": {
            "Egg": 300,
            "Flour": 270,
            "Butter": 200,
            "Cinnamon": 30,
        },
        "Preview": "./img/PDN/PDN_preview.jpg",
        "link": "./recipe_pages/recipe_page_pdn.html",
        "favorite": false
    }
];

function initializeIfEmpty() {
    if(!localStorage.hasOwnProperty("recipe"))
        initializeRecipe();
    else if(!localStorage.hasOwnProperty("fridge"))
        initializeFridge();
}

function initializeRecipe(){
    localStorage.setItem("recipe", JSON.stringify(recipeInfo));
}

function initializeFridge() {
    localStorage.setItem("fridge", JSON.stringify(fridgeList));
}

