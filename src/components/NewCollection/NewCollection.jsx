import React from 'react'
import './NewCollection.css'
import new_collections from '../Assets/newCollection.js'
import Item from '../Item/Item.jsx'

const NewCollection = () => {
  return (
    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr />
        <div className="collections">
        {new_collections.map((item, i)=>{
                return <Item key ={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} source="all_products"/>
            })}
        </div>
    </div>
  )
}

export default NewCollection