//selecting items
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.querySelector('#grocery'); //input
const submitBtn = document.querySelector('.submit-btn');
const list = document.querySelector('.grocery-list');
const container = document.querySelector('.grocery-container');
const clearBtn = document.querySelector('.clear-btn');


//edit options
let editElement;
let editFlag = false;
let editID = "";


//event listeners
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);

/** 
 * !getting from localstorage and displaying when loads()
**/
window.addEventListener('DOMContentLoaded', setUpItems);

const deleteBtn = document.querySelector('.delete-btn');

//functions
function addItem(e){
  e.preventDefault();

  const value = grocery.value;

  //assigning sepecific id to each item 👻 cheating
  const id = new Date().getTime().toString();

  if(value && !editFlag){
     createListItem(id,value);
 
     displayAlert("item added to list", "success");

     //showing
     container.classList.add('show-container');


     //adding to localStorage
     addToLocalStorage(id, value);

     //set back to default
     setBackToDefault();

  }
  else if(value && editFlag){
      editElement.innerHTML = value;
      displayAlert("value changed", "success");

      //edit also in localstorage
      editLocalStorage(editID, value);

      setBackToDefault();
  }
  else{
      displayAlert("please add item", "danger");
  }
}

/** 
   *? HELPER FUNCTIONS ?
**/

function deleteItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  
  list.removeChild(element);
  
  if(list.children.length === 0){
    container.classList.remove('show-container');
  }

  displayAlert("item deleted", "success");
  setBackToDefault();

  //removing from local storage
  removeFromLocalStorage(id);
}

function editItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  
  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;

  //set the value
  grocery.value = editElement.innerHTML;

  editFlag= true;
  editID = element.dataset.id;

  submitBtn.textContent = "edit";
}

function clearItems(){
  const items = document.querySelectorAll('.grocery-item');

  if(items.length > 0){
    items.forEach(function(item){
      list.removeChild(item);

    })
  }
  //not showing container
  container.classList.remove('show-container');

  displayAlert("cleared list", "danger");

  setBackToDefault();
  localStorage.removeItem('list');
}

function displayAlert(text, action){
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);


  //remove alert by settimeout
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1300);
}

//set back to default function
function setBackToDefault(){
  grocery.value = "";
  editFlag = false;
  editID = '';
  submitBtn.textContent = "Now";
}


// ****LOCAL STORAGE**** //
/**
 * ! methods
 * ! 1) Local storage API
 * ! 2) setItem
 * ! 3) getItem
 * ! 4) removeItem
 * ! 5) save as String (JSON.stringfy)
 * ! 6) get by JSON.parse() method
**/
function addToLocalStorage(id , value){
  const todo = {id,value};  //! in ES6 shorthand {id, value} when names are same
  
  let items = getLocalStorage();
  
  items.push(todo);
  localStorage.setItem("list", JSON.stringify(items));
};

function getLocalStorage(){
  return localStorage.getItem("list") ? JSON.parse(localStorage.getItem('list')) : [];
};

function removeFromLocalStorage(id){
  let items = getLocalStorage();

  items = items.filter(function(item){
    if(item.id !== id){
      return item
    }
  })
  //reassigning items
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value){
   let items = getLocalStorage();

   items = items.map(function(item){
     if(item.id === id){
         item.value = value;
     }
     //if not match return items
     return item;
   })

   //reassigning items
  localStorage.setItem("list", JSON.stringify(items));
};

// ***********SETUP ITEMS**************
function setUpItems(){
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value){
  const element = document.createElement('article');
     //adding class
     element.classList.add('grocery-item');
     //adding data attribute and adding id
     const attr = document.createAttribute('data-id');
     attr.value = id;
     element.setAttributeNode(attr);

     element.innerHTML = `<p class="title">${value}</p>

                          <div class="btn-container">
                              <button type="button" class="edit-btn">
                                 <i class="fas fa-edit"></i>
                              </button>

                              <button type="button" class="delete-btn">
                                   <i class="fas fa-trash"></i>
                              </button>
                           </div>`;

     // add event listeners to both buttons;
     const deleteBtn = element.querySelector(".delete-btn");
     deleteBtn.addEventListener("click", deleteItem);
     const editBtn = element.querySelector(".edit-btn");
     editBtn.addEventListener("click", editItem);

     //created element need to be appended
     list.appendChild(element);
}