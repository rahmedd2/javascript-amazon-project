import {products} from "../data/products.js"
import {cart,removeItem} from "../data/cart.js"

 let grid= document.querySelector('.order-summary')
cart.forEach((item)=>{
    let html='';
    let matching;
    const id=item.productId
    products.forEach((product)=>{
        if(id===product.id){
            matching=product
        } 
    })
    if(matching){
    html=`<div class="cart-item-container js-${matching.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matching.image}>

              <div class="cart-item-details">
                <div class="product-name">
                 ${matching.name}
                </div>
                <div class="product-price">
                 ${(matching.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete" data-product-id="${matching.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matching.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matching.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matching.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
        grid.innerHTML+=html
    }
    }
)

const del=document.querySelectorAll('.js-delete')
del.forEach((item)=>{
  item.addEventListener('click',()=>{
    let matching;
    let matchQuantity;
     const itemId=item.dataset.productId
     products.forEach((product)=>{
      if(itemId===product.id){
        matching=product
      }
     })
    removeItem(matching.id)
    const delItem=document.querySelector(`.js-${matching.id}`)
    delItem.remove()
    
  })
})

