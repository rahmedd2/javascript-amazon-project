import { cart } from "../data/cart.js"
import { deliveryOptions } from "../data/deliveryOptions.js"
export function renderPayment(){
    const orderHTML=document.querySelector('.payment-summary')
    //INVOICE: ORDER SUMMARY

    /*# of Items*/
    let itemCount=0;
    cart.cartItems.forEach(()=>{
        itemCount+=1
    })
    /*Item subtotal*/
    const itemSub=cart.subTotal()

    /*Shipping*/
    let shipping=0;
    cart.cartItems.forEach((item)=>{
        deliveryOptions.forEach((option)=>{
            if(item.deliveryId==option.id){
                shipping+=option.priceCents
            }
        })
    })
    
     let totalBeforeTax=(itemSub + shipping/(100)).toFixed(2)
     let tax=(totalBeforeTax*0.1).toFixed(2)
     //COMBINE THEM 
    let html=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${itemCount}):</div>
            <div class="payment-summary-money">$${itemSub.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${(shipping/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(parseFloat(tax)+parseFloat(totalBeforeTax)).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`
    
          orderHTML.innerHTML=html

    const checkout=document.querySelector('.return-to-home-link')
    checkout.innerHTML=`${itemCount} items`
  }

