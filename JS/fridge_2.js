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
                initializeContentPanelWithAnimation(fridgeList[i].Name);
                return;
            }
        }

        // add to json file
        fridgeList.push({ "Name": itemName, "Amount": itemAmount});
        initializeContentPanelWithAnimation(itemName);
    }

    /**
     * add a button to the content panel, trigger by page initialization and addItem(itemName, itemAmount) function
     */
    function displayItem(itemName, itemAmount) {
        /*
        var original = document.getElementById("motherOfAllButtons");
        var clone = original.cloneNode(true); // "deep" clone
        clone.id = "duplicater" + ++i; // there can only be one element with an ID
        clone.onclick = duplicate; // event handlers are not cloned
        original.parentNode.appendChild(clone);
        */


        var cp = document.getElementById("contentPanel");

        var item_container = document.createElement("div");
        item_container.className = "item_container";
        item_container.idName = itemName;

        var name = document.createElement("p");
        name.className = "item_name";
        name.innerHTML = itemName;

        var amount = document.createElement("p");
        amount.className = "item_amount";
        amount.innerHTML = itemAmount;

        var deleteImg = document.createElement("img");
        deleteImg.src = "./img/close-cross-icon_2.png";
        deleteImg.alt = "delete";
        deleteImg.className = "delete";

        var hr = document.createElement("hr");

        item_container.appendChild(name);
        item_container.appendChild(amount);
        item_container.appendChild(deleteImg);
        item_container.appendChild(hr);

        cp.appendChild(item_container);

            deleteImg.addEventListener("click", function(){
                for (let i = 0; i < fridgeList.length; i++)
            {
                if (fridgeList[i].Name === itemName)
            {
                fridgeList.splice(i,1);
                break;
            }
            }
                cp.removeChild(item_container);

            });

    }

    function displayItemWithAnimation(itemName, itemAmount) {
        /*
        var original = document.getElementById("motherOfAllButtons");
        var clone = original.cloneNode(true); // "deep" clone
        clone.id = "duplicater" + ++i; // there can only be one element with an ID
        clone.onclick = duplicate; // event handlers are not cloned
        original.parentNode.appendChild(clone);
        */


        var cp = document.getElementById("contentPanel");

        var item_container = document.createElement("div");
        item_container.className = "item_container";
        item_container.idName = itemName;
        item_container.style.animationName = "highlight";
        item_container.style.animationDuration = "2s";


        var name = document.createElement("p");
        name.className = "item_name";
        name.innerHTML = itemName;

        var amount = document.createElement("p");
        amount.className = "item_amount";
        amount.innerHTML = itemAmount;

        var deleteImg = document.createElement("img");
        deleteImg.src = "./img/close-cross-icon_2.png";
        deleteImg.alt = "delete";
        deleteImg.className = "delete";

        var hr = document.createElement("hr");

        item_container.appendChild(name);
        item_container.appendChild(amount);
        item_container.appendChild(deleteImg);
        item_container.appendChild(hr);

        cp.appendChild(item_container);

        deleteImg.addEventListener("click", function(){
            for (let i = 0; i < fridgeList.length; i++)
            {
                if (fridgeList[i].Name === itemName)
                {
                    fridgeList.splice(i,1);
                    break;
                }
            }
            cp.removeChild(item_container);

        });

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
            displayItem(fridgeList[i].Name, fridgeList[i].Amount);
        }

    }

    function initializeContentPanelWithAnimation(idName) {
        var cp = document.getElementById("contentPanel");

        // clear all elements
        while (cp.firstChild) {
            cp.removeChild(cp.firstChild);
        }

        for (let i = 0; i < fridgeList.length; i++)
        {
            if (fridgeList[i].Name === idName)
                displayItemWithAnimation(fridgeList[i].Name, fridgeList[i].Amount);
            else
                displayItem(fridgeList[i].Name, fridgeList[i].Amount);
        }

    }
}