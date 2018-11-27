{
    function downloadDataFromStorage(){
        fridgeList = JSON.parse(localStorage["fridge"]);
        recipeInfo = JSON.parse(localStorage["recipe"]);
    }

    function uploadDataToStorage() {
        localStorage.setItem("fridge", JSON.stringify(fridgeList));
        localStorage.setItem("recipe", JSON.stringify(recipeInfo));
    }


    /**
     * display AddItem panel, trigger by pressing adding new item button
     */
    function displayAddItemPanel() {
        document.getElementById("addNewItemPanel").style.display = "flex";
        console.log("aaa")
    }

    /**
     * hide AddItem panel, trigger by pressing cancel or confirm button on the AddItem page
     */
    function hideAddItemPanel() {
        document.getElementById("addNewItemPanel").style.display = "none";
    }

    /**
     * add an ingredient list, also add a button to the content panel, triggered by the confirm button on the add item
     * panel
     */
    function addItem() {
        var itemName = (document.getElementsByName("Ingredient_name"))[0].value;
        var itemAmount = (document.getElementsByName("Ingredient_amount"))[0].value;

        //format name input, capitalize first letter
        itemName = itemName.toLowerCase();
        itemName= itemName.charAt(0).toUpperCase() + itemName.slice(1);


        //check input
        if (itemName === "" || itemName === undefined)
        {
            alert("please enter ingredient name");
            return;
        }
        else if(itemAmount === "" || itemAmount === undefined)
        {
            alert("please enter ingredient amount");
            return;
        }
        else if(isNaN(itemAmount))
        {
            alert("please enter ingredient amount as a number");
            return;
        }

        //input good, check duplicate, merge if found
        for (let i = 0; i < fridgeList.length; i++)
        {
            if (fridgeList[i].Name === itemName)
            {
                fridgeList[i].Amount = (fridgeList[i].Amount * 1) + parseInt(itemAmount);
                initializeContentPanel();
                return;
            }
        }

        // add to json file
        fridgeList.push({ "Name": itemName, "Amount": itemAmount});
        initializeContentPanel();
    }

    /**
     * add a button to the content panel, trigger by page initialization and addItem(itemName, itemAmount) function
     */
    function displayButton(itemName, itemAmount) {
        /*
        var original = document.getElementById("motherOfAllButtons");
        var clone = original.cloneNode(true); // "deep" clone
        clone.id = "duplicater" + ++i; // there can only be one element with an ID
        clone.onclick = duplicate; // event handlers are not cloned
        original.parentNode.appendChild(clone);
        */


        var cp = document.getElementById("contentPanel");
        var labelText = itemName.concat(": ", itemAmount, "g");

        var node = document.createElement("div");
        node.className = "buttonContainer";

        var button = document.createElement("button");
        button.className = "ui button blue itemButton";

        var editImg = document.createElement("img");
        editImg.src = "./img/Editing-edit-icon.png";
        var deleteImg = document.createElement("img");
        deleteImg.src = "./img/close-cross-icon.png";


        var textSpan = document.createElement("span");
        textSpan.innerHTML = labelText;

        // button.appendChild(editImg);
        button.appendChild(deleteImg);
        button.appendChild(textSpan);
        node.appendChild(button);
        cp.appendChild(node);

        deleteImg.addEventListener("click", function() {
            for (let i = 0; i < fridgeList.length; i++)
            {
                if (fridgeList[i].Name === itemName)
                {
                    fridgeList.splice(i,1);
                    break;
                }
            }
            cp.removeChild(node);

        });
    }

    function displayFridgePanel() {

        document.getElementById("fridgePanel").style.display = "flex";
        initializeContentPanel();
    }

    function hideFridgePanel() {
        document.getElementById("fridgePanel").style.display = "none";
        document.getElementById("fridgePanel").style.display = "none";
        initalizeSearchPanel();
    }
    /**
     * initialize contentPanel
     */
    function initializeContentPanel() {
        var cp = document.getElementById("contentPanel");

        // clear all elements
        while (cp.firstChild) {
            cp.removeChild(cp.firstChild);
        }

        for (let i = 0; i < fridgeList.length; i++)
        {
            console.log("aqa");
            displayButton(fridgeList[i].Name, fridgeList[i].Amount);

        }

    }
}