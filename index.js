  let cart=[];
        function addToCart(product){
            const existingProduct=cart.find((item)=>item.id===product.id);
            if(existingProduct){
                alert(`Product"${product.name}" is already in your cart.`);
                window.location.href='cart.html';
                return;
            }
            cart.push(product);
            updateCartCount();
            localStorage.setItem('cart',JSON.stringify(cart));
            window.location.href='cart.html';
        }
         
        function updateCartCount(){
            const cartCountElement=document.querySelector('#cart-count');
           const cart=JSON.parse(localStorage.getItem('cart'))||[];
            cartCountElement.textContent=cart.length;
            if(cartCountElement){
                cartCountElement.textContent=cart.length;
            }else{
                console.error('Cart count element not found');
            }
        }
        document.addEventListener('DOMContentLoaded',function(){
            cart=JSON.parse(localStorage.getItem('cart'))||[];
            updateCartCount();
        });
        const hamburgerMenu=document.querySelector('.hamburger-menu');
        const navLinks=document.querySelector('.nav-links');

        hamburgerMenu.addEventListener('click',()=>{
            navLinks.classList.toggle('active');
        });

                fetch('products.json')
        .then(response=>response.json())
        .then(data=>{
            const productGrid=document.getElementById('product-grid');
            data.slice(0,3).forEach(product=>{
                const productCard=document.createElement('div');

                productCard.classList.add('product-card')
                productCard.innerHTML=`<img src="${product.image}" alt="${product.name}"> <h2>${product.name}</h2> <p>${product.description}</p> <p>$${product.price}</p>
             <button class="add-to-cart" data-id="${product.id}" data-name= "${product.name}"data-price="${product.price}"
             data-image="${product.image}">Add to Cart</button>`;
                productGrid.appendChild(productCard);
            });
            const addToCartButtons=document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button=>{
                button.addEventListener('click',()=>{
                    const product={
                        id:button.getAttribute('data-id'),
                        name:button.getAttribute('data-name'),
                        price:button.getAttribute('data-price'),
                        image:button.getAttribute('data-image'),
                        };
                        addToCart(product);
                });
            });
        })
        .catch(error=>console.error('Error:',error));
        