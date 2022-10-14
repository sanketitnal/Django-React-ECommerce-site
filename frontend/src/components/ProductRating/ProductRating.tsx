import React from 'react';


type Props = {
    rating: number,
    color: string
}

const ProductRating = ({rating, color}: Props) => {
  return (
    <div style={{padding: '0px', margin: '0px'}}>
        {[0,1,2,3,4].map((r:number) => {
            let var_className = "";
            if(rating <= r) {// < 0
                var_className = "fa-regular fa-star";
            } else if(rating > r && rating < r+1) {// 0 to 1
                var_className = "fa-solid fa-star-half-stroke";
            } else {// >= 1 
                var_className = "fa-solid fa-star";
            }
            return <i style={{color}} key={r} className={var_className}></i>
        })}
    </div>
  )
}

export default ProductRating;