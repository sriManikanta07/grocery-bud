// ****** SELECT ITEMS **********
const form = document.querySelector(".grocery-form");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const clearBtn = document.querySelector(".clear-btn");
const submitBtn = document.querySelector(".submit-btn");




// edit option
let editFlag = false;
let editID = "";
let EditElement;
// ****** EVENT LISTENERS **********
form.addEventListener("submit",addItem);
clearBtn.addEventListener("click",clear);
window.addEventListener("DOMContentLoaded",setup);
// ****** FUNCTIONS **********
    
//add item

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    element.innerHTML = `
      <p class="title">${value}</p>
      <div class="btn-container">
        <button type="button" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>`;

    // event listeners for buttons
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deletefun);
    const EditBtn = element.querySelector(".edit-btn");
    EditBtn.addEventListener("click", Editfun);
    

    // set data-id attribute
    element.setAttribute("data-id", id);

    // append child to list
    // console.log(element);
    list.appendChild(element);

    // alert and display container
    displayalert("Item added successfully", "success");

    container.classList.add("show-container");

    // set local storage
    addToLocalStorage(id, value);

    // set back to default
    setBackToDefault();
  } else if (value !== "" && editFlag) {
      // edit functionality 
      EditElement.innerHTML = value;
     
      displayalert("value changed", "success");
      //editted local storage
      editLocalStorage(editID, value);
      //
      setBackToDefault()
  } else {
      displayalert("Invalid input", "danger");
  }
}
    
//dispaly alert
function displayalert(text,action){
  alert.textContent = text ;
  alert.classList.add(`alert-${action}`);
  setTimeout(function(){
    alert.textContent ="";
    alert.classList.toggle(`alert-${action}`);
  },1000);
}
//clearAll
function clear(){
  const items = document.querySelectorAll(".grocery-item");
  if(items.length>0){
    items.forEach(function(item){
      list.removeChild(item);
    })
    container.classList.remove("show-container");
    displayalert("Cleared","danger");
  }
  localStorage.removeItem("basket");
}
//delete item
function deletefun(e) {
  // console.log("delete");
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayalert("item removed", "danger");

  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}


//edit item
function Editfun(e){
  console.log("edited");
  const element = e.currentTarget.parentElement.parentElement;
  //accessing edit element
  EditElement = e.currentTarget.parentElement.previousElementSibling;
  //set value
  grocery.value = EditElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  //edit button
  submitBtn.textContent = "edit";
}
//default
function setBackToDefault(){
  console.log("HELLO");
  grocery.value =" ";
  editFlag = false;
  editID ="";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id,value){
   const grocery = { id , value };
   console.log(grocery);
   let items = getLocalStorage() ;
   
   items.push(grocery);
   console.log(items);

   localStorage.setItem("basket",JSON.stringify(items));
};

function removeFromLocalStorage(id){
  let items = getLocalStorage();
  items = items.filter(function(item) {
    if(item.id !== id){
      return item ;
    }
  })
  localStorage.setItem("basket",JSON.stringify(items));
};

function editLocalStorage(editid,value){
  let items = getLocalStorage();
  items = items.map(function(item) {
    if(item.id == editid){
      item.value = value;
    }
    return item ;
  })
  localStorage.setItem("basket",JSON.stringify(items));
};

//getLocalStorage
function getLocalStorage() {
  return localStorage.getItem("basket")?JSON.parse(localStorage.getItem("basket")):[];
}
// ****** SETUP ITEMS **********

function setup(){
  const items = getLocalStorage();
  if(items.length > 0){
    items.forEach(item => {
      createElement(item.id,item.value);;
    });
    container.classList.add("show-container");
  }
};
// loading items to container
function createElement(id,value){
  const element = document.createElement("article");
  element.classList.add("grocery-item");
  element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;

  // event listeners for buttons
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deletefun);
  const EditBtn = element.querySelector(".edit-btn");
  EditBtn.addEventListener("click", Editfun);
  

  // set data-id attribute
  element.setAttribute("data-id", id);

  // append child to list
  // console.log(element);
  list.appendChild(element);
}

