import {products} from "./products.js";
import { deliveryOptions } from "./deliveryOptions.js";

class Cart {
   
    cartItems;
    #localStorageKey;     //Adding a # makes the variable a private property of the class, it cannot be used outside of the class

     constructor(localStorageKey) {
        this.#localStorageKey=localStorageKey
        this.#loadFromStorage();
     }
    //Loading from LocalStorage 
     #loadFromStorage(){   // Adding a # to the beginning of function title makes it a private method in a class
        this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey))
        if((this.cartItems).length==0){
             this.cartItems= [{
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2,
            deliveryId:'1'

            },
            {
            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryId:'3'
             }
            ]
        }
        };
    
    //Saving to LocalStorage
    saveCart(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems))
    }
    
    //Adding to Cart and saving changes to localStorage
    addtoCart(id,val){
         let match;
        this.cartItems.forEach((item)=> {
       if (id===item.productId){
             match=item
             }
    })            
                
    if(match){
        match.quantity+=val
    }
    else{
        this.cartItems.push({productId:id, quantity:val, deliveryId: '1'})
    }
    this.saveCart();
    }

    //Removing Item from cart and then saving changes to localStorage
    removeItem(id){
        let index;
        this.cartItems.forEach((item)=>{
            if(item.productId==id){
                index=this.cartItems.findIndex(item =>item.productId ===id) //Finding index of certain item (object) in cart with a condition
            }
        })
        this.cartItems.splice(index,1);
        this.saveCart();
    }
    
    //Finding the totalAmount in the cart 
    amount(){
      let cartQuantity = {
        quantity: 0 
      }
       const cartAmount= document.querySelector('.cart-quantity')
                  if(this.cartItems){
                  this.cartItems.forEach((item) => {
                    cartQuantity.quantity+=item.quantity
                  })
                }
        cartAmount.innerHTML=cartQuantity.quantity
    }
     //Finding subtotal amount in cart
     subTotal(){
        let sub=0
        if(this.cartItems){
            this.cartItems.forEach((item)=>{
            const id= item.productId
            let match;
            let itemPrice=0;
             products.forEach((product)=>{
             if(id===product.id){
                match=product
            }
            })
            itemPrice=item.quantity*((match.priceCents/100).toFixed(2))
            sub+=itemPrice
            })
         }
         return sub;
         }
    
    //Updating the delivery Id when user clicks a different delivery option for a certain product
    updateDeliveryId(productId,deliveryOptionId){
        let match;
        this.cartItems.forEach((item)=> {
        if (productId===item.productId){
                match=item
                } 
        });

        match.deliveryId=deliveryOptionId
        const delivDate = document.querySelector(`.js-date-${match.productId}`)
        let matchedOption;
        deliveryOptions.forEach((option)=>{
            if(match.deliveryId===option.id){
            matchedOption=option
            }
        })
        const today=dayjs()
        const deliveryDay = today.add(matchedOption.days,'days').format('dddd, MMMM D')
        delivDate.innerHTML=`Delivery date: ${deliveryDay}`
        console.log("delivery ID changed")
        this.saveCart();
    }


}

export const cart = new Cart('cart');
console.log(cart)
