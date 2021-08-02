import React from 'react';

const CartItem = ( { item } ) => {

    return (
      <div className='cart-item-card'>
        <div className='cart-item-desc'>
          <span className='cart-item-title'>{ item.title }</span>
          <span className='cart-item-description'>{ item.description }</span>
        </div>
        <span className='cart-item-price'>${ item.price }</span>
      </div>
    )

}


export default CartItem;