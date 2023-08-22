let url = document.getElementById("url");
let btn = document.getElementById("btn");
let profileContainer = document.querySelector(".profile_container");
let profile = document.querySelector(".profile");
let moreBtn = document.querySelector("#more_btn");
let anotherProfile = document.querySelector(".another_profile");
anotherProfile = anotherProfile.children;

let name = document.getElementById("name");
let img = document.getElementById("img");
let company = document.getElementById("company");
let follower = document.getElementById("follower");
let location2 = document.getElementById("location");
let following = document.getElementById("following");
let link = document.getElementById("link");

function findUserName() {
  let n = url.value.length;
  let userName = "";
  for (let i = n - 1; i >= 0; i--) {
    if (url.value[i] == "/") {
      userName = url.value.slice(i + 1, n);
      break;
    }
  }
  return userName;
}

let urlValue = "";
btn.addEventListener("click", () => {
 
  if ( urlValue != url.value && url.value != "") {
    fetching();
    profileContainer.style.display = "block";
    urlValue = url.value;
  }
});

moreBtn.addEventListener("click", () => {
  const more = document.getElementById("more");
  more.classList.toggle("show");
});

async function fetching() {
  let apiUrl = `https://api.github.com/users/`;
  apiUrl += findUserName();
  let promiseData = await fetch(apiUrl);
  if (promiseData.ok) {
    let data = await promiseData.json();
    makingProfile(data);
  } else {
    profileContainer.removeChild(profileContainer.firstChild);
    let hone = document.createElement("h1");
    hone.setAttribute("id", "invalid_box");
    hone.textContent = "Invalid Url";
    profileContainer.replaceChildren(hone);
    return;
  }
}

function makingProfile(data) {
  function img_making() {
    let img = document.createElement("div");
    img.setAttribute("id", "pro_img");
    img.style.backgroundImage = `url(${data.avatar_url})`;
    profile.appendChild(img);
  }
  function anotherDetails() {
    let n = anotherProfile.length;
    for (i = 0; i < n; i++) {
      let ele = document.createElement("p");
      ele.textContent =data[anotherProfile[i].id] != null ? `${data[anotherProfile[i].id]}` : "None";
      if(anotherProfile[i].id=='login') ele.setAttribute('id', 'name2')
      anotherProfile[i].append(ele);

    }
  }
  function profile() {
    name.textContent = (data["name"]);
    if (data["company"] != null) company.textContent = data["company"];
    follower.textContent = data["followers"];
    following.textContent = data["following"];
    location2.textContent = data["location"];

    let uri = data["avatar_url"];
    img.style.backgroundImage = "url('" + uri + "')";
    link.setAttribute("href", `${data["html_url"]}`);
  }

  profile();
  anotherDetails();
  img_making();
}
