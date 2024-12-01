
var bookmarkNameInput=document.getElementById("bookmarkName");
var bookmarkUrlInput=document.getElementById("bookmarkUrl");
var bookMarkList=[];

if (JSON.parse(localStorage.getItem("allBookMark") !== null)) {
    bookMarkList = JSON.parse(localStorage.getItem("allBookMark"));
    displayBookmark(bookMarkList);
}

function submitBookMark(){
    if (validateForm(bookmarkNameInput)&& validateForm(bookmarkUrlInput)) {
        var bookMark={
            name:bookmarkNameInput.value,
            url:bookmarkUrlInput.value,
        }

        if(!isExist(bookMark)){
            bookMarkList.push(bookMark);
            localStorage.setItem("allBookMark", JSON.stringify(bookMarkList));
            clearForm();
            displayBookmark(bookMarkList);
        }else{
            Swal.fire("that Bookmark is Founded");
            
            clearForm();
        }
    }


   
}

function clearForm() {
    bookmarkNameInput.value="";
    bookmarkUrlInput.value="";
}
function displayBookmark(list) {
    var blackBox="";
    for(var i=0; i<bookMarkList.length;i++){
        blackBox+=` <tr>
                        <th scope="row">${i+1}</th>
                        <td>${list[i].name}</td>
                        <td><a class="btn btn-success" target="_blank" id="btn-visit"  href='https://${list[i].url}' >
                            <i class="fa-solid fa-eye pe-2"></i>
                            Visite
                        </a>
                        </td>
                        <td>
                            <button class="btn btn-danger" id="btn-delete" onclick="deleteBookMark(${i})">
                                <i class="fa-solid fa-trash-can"></i>
                                Delete
                            </button>
                        </td>
                      </tr>`
    }
    document.getElementById("bookMarkRow").innerHTML= blackBox;
    
    
}

function deleteBookMark(bookMarkItem) {
    bookMarkList.splice(bookMarkItem, 1);
    localStorage.setItem("allBookMark", JSON.stringify(bookMarkList));
    displayBookmark(bookMarkList);
}

function validateForm(input) {
    var regex={
        bookmarkName:/^\w{3,20}$/,
        bookmarkUrl:/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    };
    var isValide=regex[input.id].test(input.value);
    if (isValide) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        input.nextElementSibling.classList.replace("d-block","d-none");

    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        input.nextElementSibling.classList.replace("d-none","d-block");

    }
  
    return isValide;
}

function isExist(bookMark) {
    var found;

    for(var i=0;i<bookMarkList.length;i++){
        if(bookMarkList[i].name.toLowerCase()==bookMark.name.toLowerCase()
            || bookMarkList[i].url.toLowerCase()==bookMark.url.toLowerCase()
        ){
            found=true;
            
           
        }else{
            found= false;
        }

        if(found){
            break;
        }
        
    }
    return found;
}


 