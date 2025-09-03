import {products} from "../data/products.js"
import {cart} from "../data/cart.js"
import { deliveryOptions} from "../data/deliveryOptions.js"
import { renderPayment} from "./renderPayment.js"

export function renderOrderSummary(){
      document.addEventListener('DOMContentLoaded', () => {
        let grid= document.querySelector('.order-summary')
        cart.cartItems.forEach((item)=>{
            let html='';
            let matching;
            const id=item.productId
            products.forEach((product)=>{
                if(id===product.id){
                    matching=product
                } 
            })
            if(matching){
            const devId= item.deliveryId
            let delivOption;
            deliveryOptions.forEach((option)=>{
              if(option.id===devId){
                  delivOption=option
              }
            })
            const today=dayjs()
            const deliveryDay = today.add(delivOption.days,'days').format('dddd, MMMM D')
            html=`<div class="cart-item-container js-${matching.id}">
                    <div class="delivery-date js-date-${matching.id}">
                      Delivery date: ${deliveryDay}
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
                          <span class="update-quantity-link link-primary js-update" data-product-id="${matching.id}">
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
                        ${delivery(matching,item)}
                      </div>
                    </div>
                  </div>`
                grid.innerHTML+=html
            }
            }
        )
      if(cart.cartItems){
        const del=document.querySelectorAll('.js-delete')
        del.forEach((item)=>{
          item.addEventListener('click',()=>{
            let matching;
            const itemId=item.dataset.productId
            products.forEach((product)=>{
              if(itemId===product.id){
                matching=product
              }
            })
            cart.removeItem(matching.id)
            const delItem=document.querySelector(`.js-${matching.id}`)
            delItem.remove()
            renderPayment();
            
          })
        })
          const u= document.querySelectorAll('.js-update')
          u.forEach((update)=>{
          update.addEventListener('click', ()=>{

            update.innerHTML=`<input type="text" style="width:30px;">`
            update.addEventListener('keydown',(event)=>{
              if(event.key==='Enter'){
                update.innerHTML=`Update`
              }
            })
          })
        })
      }
        
        
        
        
        function delivery(matching,cartItem){
          let deliveryHTML = ''
          deliveryOptions.forEach(opt => {
            const today = dayjs()
            const deliveryDay = today.add(opt.days,'days').format('dddd, MMMM D')
            const priceString = opt.priceCents === 0 ? 'FREE' : `$${(opt.priceCents/100).toFixed(2)} -`
            const isChecked = opt.id===cartItem.deliveryId;
            deliveryHTML += `<div class="delivery-option js-delivery-option" data-product-id=${matching.id} data-delivery-id=${opt.id}>
              <input class="inp" type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input" name="delivery-option-${matching.id}">
              <div>
                <div class="delivery-option-date">${deliveryDay}</div>
                <div class="delivery-option-price">${priceString} Shipping</div>
              </div>
            </div>`
          })
          return deliveryHTML
        }
        
        
      const date=document.querySelectorAll('.js-delivery-option')
      date.forEach((input)=>{
          input.addEventListener('click', ()=>{
            const {productId,deliveryId}=input.dataset;
            cart.updateDeliveryId(productId,deliveryId);
            renderPayment();
          })
      })
      }) 
}