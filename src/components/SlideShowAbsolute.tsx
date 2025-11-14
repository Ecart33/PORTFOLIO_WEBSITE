import React, { useState } from "react";
import styled from 'styled-components';
import "../styles/Slideshow.scss"
import { useSpring, animated, SpringValue, AnimationResult, Lookup, config } from '@react-spring/web'


//there will be an import of a back
//willbe a state type

const Slideshow: React.FC<{images: string[]}>  = ({images}) => {
    const [centerImage, setCenterImage] = useState<string[]>(images)
    console.log("render")


    const rest = (x: AnimationResult<SpringValue<Lookup<any>>>) => {
        console.log("rest")
        //console.log(x.value.l)
        setCenterImage(
            x.value.l ? 
            (centerImage) => centerImage.slice(-1,).concat(centerImage.slice(0,-1)) :
            (centerImage) => centerImage.slice(1,).concat(centerImage.slice(0,1))
        )
        //setXIndex((x) => x+25)
    }

    
    const [spring, api] = useSpring ( () => ({
        x: "0",
        l: 0,
        padding: "0",
        config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        }, 
        reset: true,
        onRest: (x) => rest(x),
    }))

   const rightClick = () => {
        // change index of images -1
        // trigger animation
        api.start({
            from : {
                x: "0",
                l: 0
            },
            to: {
                x: "-20vw",
                l: 0
            }
        })
    }
    const leftClick = () => {
        // change index of images -1
        api.start({
            from : {
                x: "0",
                l: 0,
            },
            to: {
                x: "20vw",
                l: 1
            }
        })

    }   





    //passed a type of medium for

    return (
        <div>
            <div className="slideShow">
                {centerImage.map((image: string, index: number) => (
                    //<animated.img className={index==2 ? "centerImage" : ""} style={spring} key={image} src={image}></animated.img>
                    index == 2 ?
                    <div key={image} className="centerImage">
                    <animated.img style={spring} key={image} src={image}></animated.img>
                    </div>
                    :
                    <animated.img style={spring} key={image} src={image}></animated.img>

                ))}
            </div>
{/*             <animated.img style={spring} src={images[0]}></animated.img>
 */}                        
            <img className="leftButton" src="xbox_x_button.jpeg" onClick={leftClick}></img>
            <img className="rightButton" src="xbox_b_button.jpeg" onClick={rightClick}></img>
        </div>
    )
    
}

export default Slideshow