const textbox = document.getElementById("textbox");
const addbtn = document.getElementById("button-addon2");
const listingContainer = document.querySelector(".listing-container");
const completedbtn = document.getElementById("completedbtn");

let alltask = [];

const todobox = (input, index) => `
<div class="card" id=${index}>
<div class="card-body">
    <div class="row justify-content-between">
        <div class="col-6">
            <input class="form-check-input" type="checkbox" value="${input}" id="flexCheckDefault" onclick="checkboxclick(${index})">
            <label class="form-check-label" for="flexCheckDefault" id="label">
            ${input}
            </label>
        </div>
        <div class="col-6 text-end">
            <div class="btn-group dropend">
                <button type="button" class="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    
                </button>
                <ul class="dropdown-menu" id=${index}>
                    <li><a class="dropdown-item" href="#" >Edit</a></li>
                    <li><a class="dropdown-item" href="#" onclick="deleteHandler(${index})">Delete</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</div>
`;

function addtodo() {
  //alltask.push({ task: textbox.value, update: 'pending' });
  let html = "";
  alltask.forEach((element, index) => {
    console.log(element.task, index);
    html += todobox(element.task, index);
    textbox.value = "";
  });
  console.log(alltask);
  listingContainer.innerHTML = html;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    alltask.push({ task: textbox.value, update: "pending" });
    addtodo();
  }
});

function clearoperation() {
  const clearbtn = document.getElementById("clearbtn");
  alltask = [];
  listingContainer.innerHTML = "";
}

function progressbar() {
  let count = 0;
  alltask.forEach((element) => {
    if (element.update == "completed") {
      count++;
    }
  });
  console.log(count);
  const percentage = (count * 100) / alltask.length;
  const todopercentage = document
    .getElementById("progressbar")
    .setAttribute("style", "width:" + percentage + "%");
}

function checkboxclick(index) {
  if (alltask[index].update === "pending") {
    alltask[index].update = "completed";
    progressbar();
    //const checkbox = document.getElementById("flexCheckDefault");
  } else if (alltask[index].update === "completed") {
    alltask[index].update = "pending";
    progressbar();
  }
  console.log(alltask);
}

function checktask(status) {
  let html = "";
  alltask.forEach((element, index) => {
    if (element.update === status) {
      html += todobox(element.task, index);
      listingContainer.innerHTML = html;
      textbox.value = "";
    }
  });
}

function completedtaskbtn() {
  checktask("completed");
}

function pendingtaskbtn() {
  checktask("pending");
}

function deleteHandler(index) {
  const deleted = alltask.splice(index, 1);
  const element = document.getElementById(index).remove();
}
