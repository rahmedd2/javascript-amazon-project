export const cart=[
      {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2
    },
    {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
    }
] // Make it exportable

 export const addtoCart = (id,val) =>{
    let match;
    cart.forEach((item)=> {
       if (id===item.productId){
             match=item
             }
    })           
                
    if(match){
        match.quantity+=val
    }
    else{
        cart.push({productId:id, quantity:val})
    }
}

export const removeItem = id =>{
    let index;
    cart.forEach((item)=>{
        if(item.productId==id){
            index=cart.findIndex(item =>item.productId ===id)
        }
    })
    cart.splice(index,1)
    console.log(cart)
}