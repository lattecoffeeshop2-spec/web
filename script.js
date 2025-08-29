const defaultMenu = {
  Hot: [
    { name: "Espresso", price: 3, img: "https://via.placeholder.com/150" },
    { name: "Cappuccino", price: 4, img: "https://via.placeholder.com/150" },
    { name: "Latte", price: 4, img: "https://via.placeholder.com/150" },
    { name: "Americano", price: 3, img: "https://via.placeholder.com/150" }
  ],
  Cold: [
    { name: "Iced Coffee", price: 3.5, img: "https://via.placeholder.com/150" },
    { name: "Iced Latte", price: 4, img: "https://via.placeholder.com/150" },
    { name: "Cold Brew", price: 4.5, img: "https://via.placeholder.com/150" }
  ],
  Milkshake: [
    { name: "Oreo Milkshake", price: 5, img: "https://via.placeholder.com/150" },
    { name: "Vanilla Milkshake", price: 5, img: "https://via.placeholder.com/150" },
    { name: "Chocolate Milkshake", price: 5, img: "https://via.placeholder.com/150" }
  ],
  Boba: [
    { name: "Strawberry Milk Boba", price: 6, img: "https://via.placeholder.com/150" },
    { name: "Passion Mango Boba", price: 6, img: "https://via.placeholder.com/150" }
  ],
  Refresher: [
    { name: "Strawberry Refresher", price: 4, img: "https://via.placeholder.com/150" },
    { name: "Mango Refresher", price: 4, img: "https://via.placeholder.com/150" }
  ],
  Frappe: [
    { name: "Mocha Frappe", price: 5, img: "https://via.placeholder.com/150" },
    { name: "Caramel Frappe", price: 5, img: "https://via.placeholder.com/150" }
  ],
  "Sugar Free": [
    { name: "Sugar-Free Latte", price: 4, img: "https://via.placeholder.com/150" },
    { name: "Sugar-Free Cappuccino", price: 4, img: "https://via.placeholder.com/150" }
  ],
  Shisha: [
    { name: "Double Apple", price: 10, img: "https://via.placeholder.com/150" },
    { name: "Grape Mint", price: 10, img: "https://via.placeholder.com/150" }
  ]
};

let menu = JSON.parse(localStorage.getItem("menu")) || defaultMenu;

function renderMenu() {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";
  for (const category in menu) {
    const section = document.createElement("div");
    section.innerHTML = `<h3>${category}</h3>`;
    menu[category].forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      `;
      section.appendChild(div);
    });
    container.appendChild(section);
  }
}

function openAdmin() {
  const adminPanel = document.getElementById("admin-panel");
  adminPanel.classList.toggle("hidden");

  const adminItems = document.getElementById("admin-items");
  adminItems.innerHTML = "";

  for (const category in menu) {
    const section = document.createElement("div");
    section.innerHTML = `<h3>${category}</h3>`;
    menu[category].forEach((item, index) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = `
        <input type="text" value="${item.name}" data-cat="${category}" data-idx="${index}" data-field="name" />
        <input type="number" value="${item.price}" data-cat="${category}" data-idx="${index}" data-field="price" />
        <input type="file" accept="image/*" data-cat="${category}" data-idx="${index}" data-field="img" />
        <button data-cat="${category}" data-idx="${index}" class="remove-btn">Remove</button>
      `;
      section.appendChild(wrapper);
    });
    adminItems.appendChild(section);
  }
}

document.getElementById("add-item").addEventListener("click", () => {
  const cat = prompt("Enter category:");
  const name = prompt("Enter item name:");
  const price = parseFloat(prompt("Enter price:"));
  if (!menu[cat]) menu[cat] = [];
  menu[cat].push({ name, price, img: "https://via.placeholder.com/150" });
  openAdmin();
});

document.getElementById("save-changes").addEventListener("click", () => {
  const inputs = document.querySelectorAll("#admin-items input");
  inputs.forEach(input => {
    const cat = input.dataset.cat;
    const idx = input.dataset.idx;
    const field = input.dataset.field;
    if (field === "img" && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        menu[cat][idx].img = e.target.result;
        localStorage.setItem("menu", JSON.stringify(menu));
        renderMenu();
      };
      reader.readAsDataURL(input.files[0]);
    } else if (field !== "img") {
      menu[cat][idx][field] = input.value;
    }
  });

  // Remove buttons
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const cat = e.target.dataset.cat;
      const idx = e.target.dataset.idx;
      menu[cat].splice(idx, 1);
      openAdmin();
    });
  });

  localStorage.setItem("menu", JSON.stringify(menu));
  renderMenu();
  alert("Changes saved!");
});

// WhatsApp button
document.getElementById("whatsapp-btn").addEventListener("click", () => {
  window.open("https://wa.me/96171418947", "_blank");
});

// Render on load
renderMenu();

// Toggle admin panel with double-click on header title
document.querySelector("header h1").addEventListener("dblclick", openAdmin);
