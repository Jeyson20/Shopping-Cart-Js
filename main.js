// Task de hoy:
// Hands on.
// Crear una pequeña aplicacion que tenga una lista de productos y un carrito.
// - Debe permitir agregar productos de la lista al carrito.
// - En el carrito debemos poder especificar la cantidad del producto.
// - Debemos poder eliminar productos del carrito.
// - Calcular el total de los productos en el carrito.

class Product {
    id = 0;
    description = '';
    price = 0;
    quantity = 0;

    constructor(id, description, price) {
        this.id = id;
        this.description = description;
        this.price = price;
    }
}
const localStorage = window.localStorage;

let productList = JSON.parse(localStorage.getItem('productList'));
if (!productList) {
    const _products = [
        new Product(1, 'Pollo', 100),
        new Product(2, 'Cerdo', 70),
        new Product(3, 'Res', 150),
        new Product(4, 'Arroz', 25),
        new Product(5, 'Habichuela', 35),
        new Product(6, 'Aceite', 75)
    ];
    localStorage.setItem("productList", JSON.stringify(_products));
    productList = JSON.parse(localStorage.getItem('productList'));
}

function getArticlesFromLocalStorage() {
    let articles = JSON.parse(localStorage.getItem('articles'));
    if (!articles) {
        return [];
    }

    return articles;
}

const products = [...productList];

class ShoppingCart {
    articles = [];
    articlesQuantity = 0;
    totalPrice = 0;

    constructor() {
        this.articles = getArticlesFromLocalStorage();
        this.renderShoppingCart();
    }

    addProduct(product) {
        const exinstingArticle = this.articles.find((article) => article.id === product.id);
        if (exinstingArticle) {
            exinstingArticle.quantity += 1;
            const index = this.articles.findIndex((article) => article.id === product.id);

            this.articles[index] = exinstingArticle;
        } else {
            product.quantity = 1;
            this.articles.push(product);
        }
        this.renderShoppingCart();
    }

    deleteProduct(id) {
        this.articles = this.articles.filter((article) => article.id !== id);
    }

    calculatePriceTotal() {
        this.totalPrice = this.articles.reduce((total, currentArticles) => {
            total = total + (currentArticles.price * currentArticles.quantity);
            return total;
        }, 0);
    }

    calculateArticlesQuantity() {
        this.articlesQuantity = this.articles.length;
    }

    renderShoppingCart() {
        const list = document.getElementById("shoppingCar");

        const renderItems = this.articles.map((product) => {
            return `<a href="#" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-2"><b>${product.quantity}</b></div>
                <div class="col-6"><span>${product.description}</span></div>
                <div class="col-4 text-end"><b>$${(product.price * product.quantity)}</b></div>
            </div>
            </a>`
        });

        list.innerHTML = renderItems.join('');

        this.calculatePriceTotal();

        const total = document.getElementById("total");
        total.innerHTML = `$${this.totalPrice}`;

        this.calculateArticlesQuantity();
        const quantity = document.getElementById("articlesQuantity");
        quantity.innerHTML = `${this.articlesQuantity}`;
        localStorage.setItem('articles',JSON.stringify(this.articles));
    }
}

const shoppingCart = new ShoppingCart();


function renderList() {
    const list = document.getElementById("listProducts");

    const renderItems = products.map((product) => {
        return `<a onClick="javascript:addProductToCart(${product.id})" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-8"><span>${product.description}</span></div>
            <div class="col-4 text-end"><b>$${product.price}</b></div>
        </div>
        </a>`
    });

    list.innerHTML = renderItems.join('');
}

function addProductToCart(productId) {
    shoppingCart.addProduct(products.find((product) => product.id === productId));
}


renderList(products);


























// Interfaz es un metodo 