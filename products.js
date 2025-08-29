 let cart=JSON.parse(localStorage.getItem('cart'))||[];

        function addToCart(product){
            console.log('Add to Cart button clicked');
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
            //console.log('Updating cart coun to:',cart.length);
            //const cartCountElement=document.querySelector('#cart-count');
            document.getElementById('cart-count').innerText=cart.length;
           /*artCountElement){
                cartCountElement.textContent=cart.length;
                console.log('Cart count updated to:',cart.length);
           }else{
                console.error('Cart count element not found');
            }*/
        }
        function showSuccessMessage(message){
            const successMessageElement=document.createElement('div');
            successMessageElement.textContent=message;

            successMessageElement.classList.add('success-message');

            document.body.appendChild(successMessageElement);
            setTimeout(()=>{
                successMessageElement.remove();
            },2000);
        }
                const hamburgerMenu=document.querySelector('.hamburger-menu');
        const navLinks=document.querySelector('.nav-links');

        hamburgerMenu.addEventListener('click',()=>{
            navLinks.classList.toggle('active');
        });
        
        fetch('products.json')
        .then(response=>response.json())
        .then(data=>{
            const productGrid=document.getElementById('product-grid');
            data.forEach(product=>{
                const productCard=document.createElement('div');

                productCard.classList.add('product-card')
                productCard.innerHTML=`<img src="${product.image}" alt="${product.name}"> <h2>${product.name}</h2> <p>${product.description}</p> <p>$${product.price}</p>
             <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}"
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
                        image:button.getAttribute('data-image')
                    };
                    addToCart(product);
                });
            });
            document.getElementById('cart-count').innerText=cart.length;
        })
        .catch(error=>console.error('Error:',error));
        