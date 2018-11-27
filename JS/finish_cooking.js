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


    function finish_cooking(recipeName) {
        downloadDataFromStorage();
        recipeIng = [];

        for (let i = 0; i < recipeInfo.length; i++) {
            if (recipeName === recipeInfo[i].Name)
                recipeIng = recipeInfo[i].Ingredients;
        }

        // no match
        if (recipeIng.length === 0)
            return;

        //deduct ingredients
        for (let v = 0; v < fridgeList.length; v++) {

            if (recipeIng.hasOwnProperty(fridgeList[v].Name)) {
                if (fridgeList[v].Amount > recipeIng[fridgeList[v].Name])
                {
                    fridgeList[v].Amount = fridgeList[v].Amount - recipeIng[fridgeList[v].Name];
                    console.log(fridgeList[v].Amount)
                }
                else
                    fridgeList.splice(v, 1);
            }

        }

        uploadDataToStorage();
    }

}