"use strict";

const newItem = document.querySelector("#newItem");
const list = document.querySelector("#list");
const form = document.querySelector("#form");

// parse savedList if there is one, create an empty array named savedList if not.
let savedList = JSON.parse(localStorage.getItem("todos")) || [];

//Take parsed savedList and put task in new list items
for (let item of savedList) {
  let newLi = document.createElement("li");
  newLi.innerText = item.task;
  //include the completed property and assign class if completed
  newLi.completed = item.completed ? true : false;
  if (newLi.completed) {
    newLi.classList.toggle("completed");
  }
  // put items on the list
  list.append(newLi);
}

//Add new item to list
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let newLi = document.createElement("li");
  newLi.innerText = newItem.value;
  list.append(newLi);
  //push to saved list and store (include property of 'completed' and set to false)
  savedList.push({ task: newLi.innerText, completed: false });
  localStorage.setItem("todos", JSON.stringify(savedList));
  //clear input
  newItem.value = "";
});

// set item as completed when clicked
list.addEventListener("click", function (e) {
  let clickedItem = e.target;
  clickedItem.classList.toggle("completed");
  // swap item's "completed" property; true becomes false and false becomes true
  if (!clickedItem.completed) {
    clickedItem.completed = true;
  } else {
    clickedItem.completed = false;
  }
  //update this item in savedList and re-store entire savedList
  for (let item of savedList) {
    if (item.task === clickedItem.innerText) {
      item.completed = clickedItem.completed;
    }
  }
  localStorage.setItem("todos", JSON.stringify(savedList));
});

// delete item when double clicked
list.addEventListener("dblclick", function (e) {
  let removedItem = e.target;
  removedItem.remove("LI");
  //redefine savedList with all items except the one dblclicked and re-store entire savedList
  savedList = savedList.filter(function (todo) {
    return todo.task !== removedItem.innerText;
  });
  localStorage.setItem("todos", JSON.stringify(savedList));
});
