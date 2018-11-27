function editPassword(){
    var addPanel = document.getElementById("addNewItemPanel");
    console.log(document.getElementById("addNewItemPanel").style.display === 'none')

    if (document.getElementById("addNewItemPanel").style.display === 'none')
    {
        document.getElementById("addNewItemPanel").style.display = "block";
        console.log("edit password")
    }
    else
    {
        document.getElementById("addNewItemPanel").style.display = "none";
        console.log(document.getElementById("addNewItemPanel").style.display)
    }
}