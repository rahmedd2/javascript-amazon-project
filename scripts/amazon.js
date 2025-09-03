import {cart} from '../data/cart.js' /* Import cart from cart.js */
import {products} from '../data/products.js'

products.forEach((products) => {
    const grid=document.querySelector('.js-grid')
    let html=''
    html=`
    <div class ="product-container" >
          <div class="product-image-container">
            <img class="product-image"
              src=${products.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
             ${products.rating.count * 10}
            </div>
          </div>

          <div class="product-price">
            $${((products.priceCents)/100).toFixed(2)}
          </div>

          <div class="product-quantity-container" data-product-id= ${products.id}}>
            <select class="select js-quantity-container-${products.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = ${products.id}>
            Add to Cart                                                        
          </button>
        </div>`
        grid.innerHTML+=html
    }
)


   let val = 1
   let clicked= false
   const select= document.querySelectorAll('.product-quantity-container')
   select.forEach((select)=>{
                    select.addEventListener('change', (event)=>{
                      val=event.target.value
                      clicked=true
                      console.log(val)
                    })
                  }) 
   const add= document.querySelectorAll('.js-add-to-cart')
    add.forEach((button) => {
            button.addEventListener ('click', ()=>{
               const id= button.dataset.productId
               val=parseInt(val)
               if(clicked===true){
                  cart.addtoCart(id,val)
               }
               else{
                 cart.addtoCart(id, 1)
               }
               console.log(cart.cartItems)
               cart.amount();

            })
    }
    )


  cart.amount()