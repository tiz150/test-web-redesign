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
        console.log("aas");

        let i_name= document.getElementById("a1");
        let i_amount = document.getElementById("a2");

       i_name.value = "";
       i_name.focus();
       i_amount.value = "";
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

        //format amount input, remove g if needed
        if (itemAmount.charAt(itemAmount.length - 1) === 'g' || itemAmount.charAt(itemAmount.length - 1) === 'G')
        {
            console.log(itemAmount.charAt(itemAmount.length - 1));
            itemAmount = itemAmount.replace('g', "");
        }




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
    function displayItem(itemName, itemAmount, isOdd) {
        /*
        var original = document.getElementById("motherOfAllButtons");
        var clone = original.cloneNode(true); // "deep" clone
        clone.id = "duplicater" + ++i; // there can only be one element with an ID
        clone.onclick = duplicate; // event handlers are not cloned
        original.parentNode.appendChild(clone);
        */


        var cp = document.getElementById("contentPanel");
        var outside_container = document.createElement("div");
        outside_container.idName = itemName;

        var item_container = document.createElement("div");

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

        if (isOdd)
        {
            outside_container.className = "item_container oddNumber";
            console.log("even");
        }
        else
        {
            outside_container.className = "item_container";
        }


        item_container.appendChild(name);
        item_container.appendChild(deleteImg);
        item_container.appendChild(amount);
        outside_container.appendChild(item_container);

        cp.appendChild(outside_container);

            deleteImg.addEventListener("click", function(){
                for (let i = 0; i < fridgeList.length; i++)
            {
                if (fridgeList[i].Name === itemName)
            {
                fridgeList.splice(i,1);
                break;
            }
            }
                initializeContentPanel();
            });

    }

    function displayItemWithAnimation(itemName, itemAmount, isOdd) {
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
        item_container.style.animationDuration = "2s";

        if (isOdd)
            item_container.style.animationName = "highlight2";
        else
            item_container.style.animationName = "highlight";

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
        item_container.appendChild(deleteImg);
        item_container.appendChild(amount);
        item_container.appendChild(hr);

        cp.appendChild(item_container);
        if (isOdd)
        {
            item_container.className = "item_container oddNumber";
            console.log("even");
        }
        else
        {
            item_container.className = "item_container";
        }

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

        displayItemTitle();

        var isEven = true;

        for (let i = 0; i < fridgeList.length; i++)
        {
            displayItem(fridgeList[i].Name, fridgeList[i].Amount, isEven);
            isEven = !isEven;
        }

    }

    function initializeContentPanelWithAnimation(idName) {
        var cp = document.getElementById("contentPanel");

        // clear all elements
        while (cp.firstChild) {
            cp.removeChild(cp.firstChild);
        }

        displayItemTitle();
        var isEven = true;

        for (let i = 0; i < fridgeList.length; i++)
        {
            if (fridgeList[i].Name === idName)
                displayItemWithAnimation(fridgeList[i].Name, fridgeList[i].Amount, isEven);
            else
                displayItem(fridgeList[i].Name, fridgeList[i].Amount, isEven);

            isEven = !isEven;
        }
    }

    function displayItemTitle(){
        var cp = document.getElementById("contentPanel");

        var item_container = document.createElement("div");
        item_container.className = "item_container";

        var item_name = document.createElement("h3");
        item_name.className = "item_name subtitle";
        item_name.innerHTML = "Item name";

        var item_amount = document.createElement("h3");
        item_amount.className = "item_amount subtitle";
        item_amount.innerHTML = "Amount(g)";

        var delete_button = document.createElement("h3");
        delete_button.className = "delete subtitle";
        delete_button.innerHTML = "Delete";


        var hr = document.createElement("hr");

        item_container.appendChild(item_name);
        item_container.appendChild(delete_button);
        item_container.appendChild(item_amount);
        item_container.appendChild(hr);

        cp.appendChild(item_container);
    }
}