const menuContainer = document.getElementById("menuContainer");
const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");
const pinInput = document.getElementById("pinInput");
const adminControls = document.getElementById("adminControls");
const saveItemBtn = document.getElementById("saveItemBtn");
const itemName = document.getElementById("itemName");
const itemPrice = document.getElementById("itemPrice");
const itemCategory = document.getElementById("itemCategory");
const itemImage = document.getElementById("itemImage");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");

let menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
let pin = "71418947"; // default PIN

function renderMenu() {
  menuContainer.innerHTML = "";
  menuItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h4>${item.name}</h4>
      <p>$${item.price}</p>
      <p><em>${item.category}</em></p>
      <button onclick="deleteItem(${index})">Delete</button>
    `;
    menuContainer.appendChild(div);
  });
}
function deleteItem(index) {
  menuItems.splice(index, 1);
  localStorage.setItem("menuItems", JSON.stringify(menuItems));
  renderMenu();
}
saveItemBtn.addEventListener("click", () => {
  const reader = new FileReader();
  reader.onload = function(e) {
    menuItems.push({
      name: itemName.value,
      price: itemPrice.value,
      category: itemCategory.value,
      image: e.target.result
    });
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
    renderMenu();
  };
  if (itemImage.files[0]) {
    reader.readAsDataURL(itemImage.files[0]);
  }
});
adminBtn.addEventListener("click", () => {
  adminPanel.classList.toggle("hidden");
});
loginBtn.addEventListener("click", () => {
  if (pinInput.value === pin) {
    adminControls.classList.remove("hidden");
  } else {
    alert("Wrong PIN");
  }
});
exportBtn.addEventListener("click", () => {
  const data = JSON.stringify(menuItems, null, 2);
  const blob = new Blob([data], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "menu.json";
  a.click();
});
importFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(evt) {
    menuItems = JSON.parse(evt.target.result);
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
    renderMenu();
  };
  reader.readAsText(file);
});
renderMenu();