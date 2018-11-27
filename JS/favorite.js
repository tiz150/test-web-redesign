{
    let itemCount = 0;

    // initial list
    let fridgeList;
    let recipeInfo;

    function download(){
        fridgeList = JSON.parse(localStorage["fridge"]);
        recipeInfo = JSON.parse(localStorage["recipe"]);
    }

    function upload() {
        localStorage.setItem("fridge", JSON.stringify(fridgeList));
        localStorage.setItem("recipe", JSON.stringify(recipeInfo));
    }

    function initializeFavorite()
    {
        download();
        var ingredientList = fridgeList;
        var cp = document.getElementById("entreePanel_main");

        // loop through recipes
        var anyEntree = false;

        for (let i = 0; i < recipeInfo.length; i++)
        {
            // match and add
            if (recipeInfo[i].favorite)
            {
                let needList = getNeededIngredient(recipeInfo[i].Ingredients);

                let entreeContainer = document.createElement("a");
                entreeContainer.href = recipeInfo[i].link;
                entreeContainer.target = "blank";
                entreeContainer.className = "entree";

                let entreeOverlay = document.createElement("div");
                entreeOverlay.className = "entreeOverlay";

                let overlayText = document.createElement("span");
                if (needList.length == 0)
                {
                    overlayText.innerHTML = "You have all the ingredients";
                }
                else
                {
                    var overlayTitle = document.createElement("span");
                    overlayTitle.innerHTML = "You will need: ";
                    overlayText.append(overlayTitle);
                    overlayText.append(document.createElement("br"));

                    let needItem = null;
                    for (let item in needList)
                    {
                        needItem = document.createElement("li");
                        console.log(item.concat(": ", needList[item], "g"));
                        needItem.innerHTML = item.concat(": ", needList[item], "g");

                        overlayText.appendChild(needItem);
                    }
                }

                let entreeElement = document.createElement("div");
                entreeElement.className = "entreeElements";

                let entreeImg = document.createElement("img");
                entreeImg.src = recipeInfo[i].Preview;

                let entreeName = document.createElement("h3");
                entreeName.innerHTML = recipeInfo[i].Name;

                let favoriteIcon = document.createElement("img");
                favoriteIcon.src = "./img/like.png";
                favoriteIcon.className = "favoriteIcon";

                entreeElement.appendChild(entreeImg);
                entreeElement.appendChild(entreeName);

                entreeOverlay.appendChild(overlayText);

                entreeContainer.appendChild(favoriteIcon);
                entreeContainer.appendChild(entreeOverlay);
                entreeContainer.appendChild(entreeElement);


                cp.appendChild(entreeContainer);

                anyEntree = true;
            }
            match = true;
        }

        if(!anyEntree)
        {
            var none = document.createElement("h3");
            none.textAlign = "center";
            none.color = "#686868";
            none.marginLeft = "200px";
            none.innerHTML = "(None)";
            cp.appendChild(none);

        }

    }
    function getNeededIngredient(recipeIngredients) {
        var needList = {};
        var iList = {};

        for (let i = 0; i < fridgeList.length; i++)
            iList[fridgeList[i].name] = fridgeList[i].value;


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

    function addToFavorite(recipeName){
        download();

        for (let i =0; i < recipeInfo.length; i++)
        {
            if(recipeInfo[i].Name === recipeName)
            {
                recipeInfo[i].favorite = true;
                console.log(recipeInfo[i].favorite);
                break;
            }
        }

        //display favorite button
        document.getElementById("favorite").style.display = "none";
        document.getElementById("not_favorite").style.display = "block";

        upload();

    }

    function removeFromFavorite(recipeName){
        download();

        for (let i =0; i < recipeInfo.length; i++)
        {
            if(recipeInfo[i].Name === recipeName)
            {
                recipeInfo[i].favorite = false;
                console.log(recipeInfo[i].favorite);
                break;
            }
        }

        //display favorite button
        document.getElementById("favorite").style.display = "block";
        document.getElementById("not_favorite").style.display = "none";

        upload();
    }

    function initalizeFavoriteButton(recipeName){
        download();

        for (let i =0; i < recipeInfo.length; i++)
        {
            if(recipeInfo[i].Name === recipeName)
            {
                if(recipeInfo[i].favorite == false)
                {
                    document.getElementById("favorite").style.display = "block";
                    document.getElementById("not_favorite").style.display = "none";
                }
                else
                {
                    document.getElementById("favorite").style.display = "none";
                    document.getElementById("not_favorite").style.display = "block";
                }
                break;
            }
        }
    }

}