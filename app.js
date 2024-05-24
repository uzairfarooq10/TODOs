var parent = document.querySelector(".container");
var pagination_parent = document.querySelector(".pagination");
var loading = document.querySelector(".loader");

let resultsPerPage = 20;
let skipPerPage = 0;
let totalPages = 0;

function removeChildNodes() {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  while (pagination_parent.firstChild) {
    pagination_parent.removeChild(pagination_parent.firstChild);
  }
}

function loaderRemove() {
  const loader = document.querySelector(".three-body");
  if (loader) {
    loader.remove();
  }
}

async function dataFetch() {
  try {
    removeChildNodes();

    var loaderNew = `
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>`;

    loading.innerHTML = loaderNew;

    // console.log(loaderNew);

    const response = await fetch(
      `https://dummyjson.com/todos?limit=${resultsPerPage}&skip=${skipPerPage}`
    );
    const data = await response.json();
    console.log(data);

    loaderRemove();

    data.todos.forEach((element) => {
      //   console.log(element);
      var newElement = document.createElement("p");
      newElement.innerHTML = `${element.id}. ${element.todo}`;
      //   newElement.setAttribute("class", "new-class");
      parent.appendChild(newElement);
    });

    totalPages = Math.ceil(data.total / resultsPerPage);
    // ------------------------------------------    Each BTN Logic     ---------------------------------

    // let pg_head = document.querySelector(".pagination");
    // console.log(pg_head);
    // pg_head.addEventListener("click", (evt) => {
    //   let pg_btn = document.getElementById(`${evt.target.id}`);
    //   //   console.log(pg_btn);

    //   pg_btn.addEventListener("click", (ele) => {
    //     console.log(ele);
    //     //   skipPerPage = (evt.target.id - 1) * resultsPerPage;
    //     //   console.log(skipPerPage);
    //   });
    // });
  } catch (error) {
    console.log(error);
  }

  sec();
}

// ----------------------  Pagination Tabs    ---------------------------------------------------

dataFetch();
// console.log(totalPages);

function sec() {
  for (let i = 1; i <= totalPages; i++) {
    var newBtn = document.createElement("button");
    //   console.log(val);
    newBtn.innerHTML = i;
    newBtn.classList.add("pagination-btn");
    //newBtn.setAttribute("id", i);
    newBtn.id = `page-${i}`;

    newBtn.addEventListener("click", () => {
      skipPerPage = (i - 1) * resultsPerPage;
      dataFetch(); // Fetch data for the clicked page
    });

    pagination_parent.appendChild(newBtn);
  }
}
