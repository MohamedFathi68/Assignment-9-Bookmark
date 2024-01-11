let siteName = document.querySelector("#siteName");
let siteURL = document.querySelector("#siteURL");

let urlList = [];

//get data from local storage

if (localStorage.getItem("urlList") == null) {
  urlList = [];
} else {
  urlList = JSON.parse(localStorage.getItem("urlList"));
  displayURL(urlList);
}

// add url links

function addURL() {
  let alertMessage = document.querySelector(".alert-msg");
  if (urlValidate() == true) {
    let urlLink = {
      siteName: siteName.value,
      siteURL: siteURL.value,
    };
    urlList.push(urlLink);
    displayURL(); //display function
    resetURL(); //clear inputs function
    localStorage.setItem("urlList", JSON.stringify(urlList)); //add link to local storage
    alertMessage.setAttribute("class", "text-danger m-5 d-none alert-msg");
  } else {
    alertMessage.setAttribute("class", "text-danger m-5 d-inline alert-msg");
  }
}

//display links in the table

function displayURL() {
  let cartona = ``; //HTML container
  for (let i = 0; i < urlList.length; i++) {
    cartona += `<tr>
        <td>${i + 1}</td>
        <td>${urlList[i].siteName}</td>
          <td><a href="${
            urlList[i].siteURL
          }" class="btn btn-outline-warning" target="_blank">Visit</a></td>
        <td><button onclick="deleteURL(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
  }
  document.querySelector("#table").innerHTML = cartona;
}

// clear form inputs

function resetURL() {
  siteName.value = "";
  siteURL.value = "";
}

// delete link from the table

function deleteURL(index) {
  urlList.splice(index, 1);
  localStorage.setItem("urlList", JSON.stringify(urlList));
  displayURL(urlList);
}

function urlValidate() {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(siteURL.value);
}
