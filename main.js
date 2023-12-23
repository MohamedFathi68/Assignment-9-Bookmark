var siteName = document.querySelector("#siteName");
var link = document.querySelector("#siteURL");

var urlList = [];

if (localStorage.getItem("urlList") == null) {
  urlList = [];
} else {
  urlList = JSON.parse(localStorage.getItem("urlList"));
  displayURL(urlList);
}

function addURL() {
  if (validateURL == true) {
    var site = {
      name: siteName.value,
      url: link.value,
    };
  
    urlList.push(site);
    displayURL();
    clearForm();
    localStorage.setItem("urlList", JSON.stringify(urlList));
  } else {
    alert("enter a valid link")
  }
}

function displayURL() {
  var cartona = ``;
  for (var i = 0; i < urlList.length; i++) {
    cartona += `<tr>
    <td>${i + 1}</td>
    <td>${urlList[i].name}</td>
    <td><a href="http://${
      urlList[i].url
    }" class="btn btn-outline-warning" target="_blank">Visit</a></td>
    <td><button onclick="deleteURL(${i})" class="btn btn-outline-danger">Delete</button></td>
  </tr>`;
    document.querySelector("#table").innerHTML = cartona;
  }

}

function clearForm() {
  siteName.value = "";
  link.value = "";
}

function deleteURL(index) {
  urlList.splice(index, 1);
  localStorage.setItem("urlList", JSON.stringify(urlList));
  displayURL(urlList);
}

function validateURL() {
  var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if (regex.test(link.value == true)) {
    return true;
  } else {
    return false;
  }
}
