// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import '../styles/PlaceHolder.scss'

const PlaceHolder: React.FC<{images:string[]}> = ({images}) => {

    images.length/2 

    //3 columns
    
    0 - Math.floor(images.length/3)
    Math.floor(images.length/3)+1 - 2 * Math.floor(images.length/3)
    2 * Math.floor(images.length/3)+1 - images.length/2

    return (
        <div className='gallery'>
            <div className='column' id='left'>
                {images.slice(0, Math.floor(images.length/3+1)).map( (image : string) => 
                    <img src={image}></img>
                )}
            </div>
            <div className='column'>
                {images.slice(Math.floor(images.length/3), (2 * Math.floor(images.length/3+1))).map( (image : string) => 
                    <img src={image}></img>
                )}
            </div>
            <div className='column' id='right'>
                {images.slice((2 * Math.floor(images.length/3+1), images.length/2+1)).map( (image : string) => 
                    <img src={image}></img>
                )}
            </div>
        </div>
    )
}

export default PlaceHolder
