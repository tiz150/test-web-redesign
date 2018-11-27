{
    let itemCount = 0;

    // initial list
    let fridgeList;
    let recipeInfo;

    function downloadDataFromStorage(){
        fridgeList = JSON.parse(localStorage["fridge"]);
        recipeInfo = JSON.parse(localStorage["recipe"]);
    }

    function uploadDataToStorage() {
        localStorage.setItem("fridge", JSON.stringify(fridgeList));
        localStorage.setItem("recipe", JSON.stringify(recipeInfo));
    }


    function initalizeSearchPanel() {
        // clear all elements
        var cp = document.getElementById("entreePanel");

        while (cp.firstChild) {
            cp.removeChild(cp.firstChild);
        }

        console.log("aaa");
        initializePerfectSearchResult();
        initializePartialSearchResult();
    }

    function getSelectedIngredient() {
        var ingredientList = {};
        var allIngredients = document.getElementsByClassName("ingredientCheckbox");


        for (let i = 0; i < allIngredients.length; i++)
        {
            if (allIngredients[i].checked)
                ingredientList[allIngredients[i].name] = allIngredients[i].value;
        }

        return ingredientList;
    }


    function initializePerfectSearchResult()
    {
        var ingredientList = getSelectedIngredient();
        var cp = document.getElementById("entreePanel");

        // add title
        var banner = document.createElement("div");
        banner.id = "fullmatchBanner";

        var text = document.createElement("h2");
        text.innerHTML = "Perfect match:";

        banner.appendChild(text);
        cp.appendChild(banner);


        // loop through recipes
        var anyEntree = false;
        var match = true;
        var keys = null;

        for (let i = 0; i < recipeInfo.length; i++)
        {
            // compare ingredients
            keys = recipeInfo[i].Ingredients;

            for(var key in keys)
            {

                if (!(ingredientList.hasOwnProperty(key) && ingredientList[key] >= keys[key]))
                {
                    match = false;
                    break;
                }
            }

            // match and add
            if (match)
            {
                let entreeContainer = document.createElement("a");
                entreeContainer.href = recipeInfo[i].link;
                entreeContainer.className = "entree";

                let entreeOverlay = document.createElement("div");
                entreeOverlay.className = "entreeOverlay";

                let overlayText = document.createElement("span");
                overlayText.innerHTML = "You have all the ingredients";

                let entreeElement = document.createElement("div");
                entreeElement.className = "entreeElements";

                let entreeImg = document.createElement("img");
                entreeImg.src = recipeInfo[i].Preview;

                let entreeName = document.createElement("h3");
                entreeName.innerHTML = recipeInfo[i].Name;

                displayfavIcon(entreeContainer, recipeInfo[i]);

                entreeElement.appendChild(entreeImg);
                entreeElement.appendChild(entreeName);

                entreeOverlay.appendChild(overlayText);


                entreeElement.appendChild(entreeImg);
                entreeElement.appendChild(entreeName);

                entreeOverlay.appendChild(overlayText);
                entreeContainer.appendChild(entreeOverlay);
                entreeContainer.appendChild(entreeElement);

                cp.appendChild(entreeContainer);

                anyEntree = true;
            }
            match = true;
        }

        if(!anyEntree)
        {
            let none = document.createElement("h3");
            none.innerHTML = "(None)";
            none.className = "none";
            cp.appendChild(none);
        }

    }

    function initializePartialSearchResult()
    {
        var ingredientList = getSelectedIngredient();
        var cp = document.getElementById("entreePanel");


        // add title
        var banner = document.createElement("div");
        banner.id = "paritalmatchBanner";

        var text = document.createElement("h2");
        text.innerHTML = "Partial match:";

        banner.appendChild(text);
        cp.appendChild(banner);


        // loop through recipes
        var anyEntree = false;
        var match = false;
        var keys = null;

        for (let i = 0; i < recipeInfo.length; i++)
        {
            // compare ingredients
            keys = recipeInfo[i].Ingredients;

            for(var key in keys)
            {
                // have at least one item
                if (ingredientList.hasOwnProperty(key))
                {
                    match = true;
                    break;
                }
            }

            var needList = null;

            // match and add
            if (match)
            {
                needList = getNeededIngredient(keys);

                // perfect match
                if (Object.keys(needList).length === 0)
                    continue;


                let entreeContainer = document.createElement("a");
                entreeContainer.href = recipeInfo[i].link;
                entreeContainer.className = "entree";

                let entreeOverlay = document.createElement("div");
                entreeOverlay.className = "entreeOverlay";

                let overlayText = document.createElement("ul");

                let entreeElement = document.createElement("div");
                entreeElement.className = "entreeElements";

                let entreeImg = document.createElement("img");
                entreeImg.src = recipeInfo[i].Preview;

                let entreeName = document.createElement("h3");
                entreeName.innerHTML = recipeInfo[i].Name;

                entreeElement.appendChild(entreeImg);
                entreeElement.appendChild(entreeName);

                //display fav
                displayfavIcon(entreeContainer, recipeInfo[i]);


                var overlayTitle = document.createElement("span");
                overlayTitle.innerHTML = "You will need: ";
                overlayText.append(overlayTitle);
                overlayText.append(document.createElement("br"));

                var needItem = null;
                for (var key in needList)
                {
                    needItem = document.createElement("li");
                    needItem = document.createElement("li");
                    needItem.innerHTML = key.concat(": ", needList[key], "g");

                    overlayText.appendChild(needItem);
                }
                entreeOverlay.appendChild(overlayText);
                entreeContainer.appendChild(entreeOverlay);
                entreeContainer.appendChild(entreeElement);

                cp.appendChild(entreeContainer);

                anyEntree = true;
            }
            match = false;
        }


        if(!anyEntree)
        {
            let none = document.createElement("h3");
            none.innerHTML = "(None)";
            none.className = "none";
            cp.appendChild(none);
        }
    }

    function displayfavIcon(entreeContainer, recipe)
    {
        //display fav icon
        if (recipe.favorite)
        {
            let favoriteIcon = document.createElement("img");
            favoriteIcon.src = "./img/like.png";
            favoriteIcon.className = "favoriteIcon";
            entreeContainer.appendChild(favoriteIcon);
        }
    }

    function getNeededIngredient(recipeIngredients) {
        var needList = {};
        var iList = getSelectedIngredient();

        for(let key in recipeIngredients)
        {
            // if exist
            if (iList.hasOwnProperty(key))
            {
                if (iList[key] >= recipeIngredients[key])
                    continue;
                else
                    needList[key] = recipeIngredients[key] - iList[key];
            }
            else // not exist
            {
                needList[key] = recipeIngredients[key];
            }

        }

        return needList;
    }

    /**
     * initialize checkbox
     */
    function initializeCheckBox() {
        var cp = document.getElementById("checkboxPanel");

        // remove old checkboxs
        while (cp.firstChild) {
            cp.removeChild(cp.firstChild);
        }

        // add new
        for (let i = 0; i < fridgeList.length; i++)
        {
            console.log(fridgeList[i]);
            addCheckbox(cp, fridgeList[i].Name, fridgeList[i].Amount);
        }
    }

    function addCheckbox(contentPanel, itemName, itemAmount) {
        var newCheckbox = document.createElement("input");
        newCheckbox.className = "ingredientCheckbox";
        newCheckbox.type = "checkbox";
        newCheckbox.name = itemName;
        newCheckbox.value = itemAmount;
        newCheckbox.checked = true;
        newCheckbox.addEventListener("click", initalizeSearchPanel);

        console.log(itemName, "+", itemAmount);

        var newTextSpan = document.createElement("span");
        newTextSpan.innerHTML = itemName.concat("(",itemAmount,"g)");

        contentPanel.appendChild(newCheckbox);
        contentPanel.appendChild(newTextSpan);
        contentPanel.appendChild(document.createElement("br"));
    }
}