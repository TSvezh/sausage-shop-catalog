// 1. База данных товаров (имитация ответа от сервера)
const products = [
  {
    id: 1,
    name: "Коллагеновая оболочка для гриля 23мм (25 метров)",
    category: "casings",
    categoryLabel: "Оболочки",
    price: 45,
    image: "./img/collagen_casing_for_grilling.jpg"
  },
  {
    id: 2,
    name: "Коллагеновая оболочка 50 мм (10 метров)",
    category: "casings",
    categoryLabel: "Оболочки",
    price: 18,
    image: "./img/collagen_casing.jpg"
  },
  {
    id: 3,
    name: "Домашняя (50 г)",
    category: "spices",
    categoryLabel: "Специи и смеси",
    price: 4,
    image: "./img/spice_domashnyaya.jpg"
  },
  {
    id: 4,
    name: "Нитритная соль 0.6% (200 г)",
    category: "spices",
    categoryLabel: "Специи и смеси",
    price: 3,
    image: "./img/nitrite_salt.jpg"
  },
  {
    id: 5,
    name: "Шприц колбасный горизонтальный 1.5 кг",
    category: "equipment",
    categoryLabel: "Оборудование",
    price: 260,
    image: "./img/sausage_stuffer.jpg"
  },
  {
    id: 6,
    name: "Термометр со щупом для мяса",
    category: "equipment",
    categoryLabel: "Оборудование",
    price: 25,
    image: "./img/termometr.jpg"
  },
  {
    id: 7,
    name: "Для курицы (50 г)",
    category: "spices",
    categoryLabel: "Специи и смеси",
    price: 4,
    image: "./img/spice_ for_chicken.jpg"
  },
  {
    id: 8,
    name: "Айцел(премиум) 45мм (6 метров)",
    category: "casings",
    categoryLabel: "Оболочки",
    price: 22,
    image: "./img/aitsel.jpg"
  }
];

// 2. Получаем ссылки на DOM-элементы
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const productsCount = document.getElementById("productsCount");

// 3. Состояние текущих фильтров
let currentCategory = "all";
let currentSearch = "";

// 4. Функция отрисовки карточек
function renderProducts(items) {
  productsGrid.innerHTML = "";
  productsCount.textContent = items.length;

  if (items.length === 0) {
    productsGrid.innerHTML = `<div class="empty-message">По вашему запросу ничего не найдено 😔</div>`;
    return;
  }

  items.forEach(product => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="card-img">
      <div class="card-body">
        <span class="card-category">${product.categoryLabel}</span>
        <h3 class="card-title">${product.name}</h3>
        <div class="card-footer">
          <span class="card-price">${product.price} BYN</span>
          <button class="btn-buy" onclick="this.textContent = 'Добавлено!'; this.style.backgroundColor = 'green'; setTimeout(() => { this.textContent = 'В корзину'; this.style.backgroundColor = ''; }, 1000);">В корзину</button>
        </div>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

// 5. Единая функция фильтрации (Категория + Поиск)
function filterProducts() {
  const filtered = products.filter(product => {
    const matchesCategory = currentCategory === "all" || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  renderProducts(filtered);
}

// 6. Слушатели событий
// Поиск при вводе текста
searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value.trim();
  filterProducts();
});

// Клик по кнопкам категорий
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Убираем активный класс у всех кнопок и добавляем нажатой
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.dataset.category;
    filterProducts();
  });
});

// 7. Первичная отрисовка при загрузке страницы
renderProducts(products);
