import React, { useRef, useState, useEffect } from "react";
import styled from 'styled-components';
import "../styles/Slideshow.scss"
import { useSpring, useSprings, animated, SpringValue, type AnimationResult, type Lookup, config } from '@react-spring/web'


const Slideshow: React.FC<{
    images: string[],
    offsetHeight: number
    }>  = ({images, offsetHeight}) => {

    const [centerImage, setCenterImage] = useState<string[]>(images)
    const [imageWidths, setImageWidths] = useState<number[]>([])
    //console.log(0)
    const [centerIndex, setCenterIndex] = useState(3)
    const centerPadding = 6.5
    const gapPadding = 10
    const imageWidthRefs = images.map(() => useRef(null))

    console.log("render")
    //console.log(centerIndex)


    const rest = (x: AnimationResult<SpringValue<Lookup<any>>>) => {
        setCenterIndex((centerIndex) => centerIndex+=x.value.direction)
        console.log('state change')
    }


    const [leftSideSpring, leftSideApi] = useSpring(() => ({
        x: `${0}`,
        direction: 0,
        padding: "0",
        config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },
        /* config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },  */
        reset: true,
        onChange: (x) => console.log(x.value.x)
        //onRest: (x) => rest(x),
    }))

    const [rightSideSpring, rightSideApi] = useSpring(() => ({
        x: `${0}`,
        direction: 0,
        padding: "0",
        config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },
        /* config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },  */
        reset: true,
        onChange: (x) => console.log(x.value.x)
        //onRest: (x) => rest(x),
    }))
    
    const [leftSpring, leftApi] = useSpring(() => ({
        x: `${0}`,
        direction: 0,
        padding: "0",
        config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },
        /* config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },  */
        reset: true,
        onStart: (x) => console.log("start"),
        //onRest: (x) => rest(x),
    }))
    const [rightSpring, rightApi] = useSpring(() => ({
        x: `${0}`,
        direction: 0,
        padding: "0",
        config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },
        /* config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },  */
        reset: true,
        //onChange: (x) => console.log(x.value.x)
        //onRest: (x) => rest(x),
    }))

    const [centerSpring, centerApi] = useSpring(() => ({
        x: `${0}`,
        direction: 0,
        padding: "0",
        config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },
        /* config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },  */
        reset: true,
        onRest: (x) => rest(x),
        //onChange: (x) => console.log(x.value.x)
        
        //interesting on re rending is considered a change but not a start
    }))

    const handleClick = (direction: number) => {
        // change index of images -1
        //one side of 50 (imageWidths[centerIndex+direction]
        console.log(imageWidths[centerIndex]/2-imageWidths[centerIndex-1]/2)
        console.log(imageWidths[centerIndex-1]-(imageWidths[centerIndex]/2-imageWidths[centerIndex-1]/2))
        rightSideApi.start({
            from : {
                x: `${0}`,
                direction: 0,
            },
            to: {
                x: `${direction==1 ? -1*(imageWidths[centerIndex+1]+(imageWidths[centerIndex]/2-imageWidths[centerIndex+1]/2)+window.innerWidth/gapPadding) : (imageWidths[centerIndex]/2+imageWidths[centerIndex-1]/2+window.innerWidth/gapPadding)}px`,
                direction: direction
            }
        })

        leftSideApi.start({
            from : {
                x: `${0}`,
                direction: 0,
            },
            to: {
                x: `${direction==1 ?  -1*(imageWidths[centerIndex]/2+imageWidths[centerIndex+1]+window.innerWidth/gapPadding) : imageWidths[centerIndex-1]+(imageWidths[centerIndex]/2-imageWidths[centerIndex-1]/2+window.innerWidth/gapPadding)}px`,
                direction: direction
            }
        })


        rightApi.start({
            from : {
                x: `${0}`,
                direction: 0,
            },
            to: {
                //50vw + ${imageWidths[centerIndex]/2}px + 10vw + imageWidths[centerIndex+1]/2
                    //right api on right click definetly right 
                x: `${direction==1 ? -1*(imageWidths[centerIndex]/2 + window.innerWidth/centerPadding + imageWidths[centerIndex+1]/2) : (imageWidths[centerIndex]/2+imageWidths[centerIndex-1]/2+ window.innerWidth/gapPadding)}px`,//`${direction==1 ? direction*imageWidths[centerIndex-direction] : -1*(window.innerWidth/centerPadding + imageWidths[centerIndex]/2 + imageWidths[centerIndex+1]/2)}px`,
                direction: direction
            }
        })

        //if is right button press then shift left to accomadate incoming center image now add the gap padd
        //otherwise shift right

        leftApi.start({
            from : {
                x: `${0}`,
                direction: 0,
            },
            to: {
                x: `${direction==1 ? -1*(imageWidths[centerIndex]/2+imageWidths[centerIndex+1]/2 + window.innerWidth/gapPadding) : imageWidths[centerIndex]/2+window.innerWidth/centerPadding+imageWidths[centerIndex-1]/2}px`,
                direction: direction
            }
        })
        //difference between ( centerImage[index+-1] width / 2 + padding and centerImage either left or right corner
        //imagewidths
        //x of the leftImage + 1/2 of its width to 50vw
        //so 50vw - (50vw + ${imageWidths.slice(index, centerIndex).reduce((a, c) => a+ c, 0)-imageWidths[centerIndex]/2}px + 10vw)
        centerApi.start({
            from : {
                x: "0",//`${0}`,
                direction: 0,
            },
            to: {
                x: `${-1*(imageWidths[centerIndex]/2 + window.innerWidth/centerPadding + imageWidths[centerIndex+direction]/2)*direction}px`,
                direction: direction
            }
        })

        

    }   

    /*
    CENTER IMAGE
    LEFT IMAGE
    RIGHT IMAGE
    */


    /*
    so we have a set jump between the left and the center
    and the rest of them 
    */
    


    //passed a type of medium for
    
    useEffect(() => {
        console.log(imageWidthRefs.map((widths) => Math.floor(widths.current.naturalWidth*widths.current.offsetHeight/widths.current.naturalHeight)))
        setImageWidths(() => imageWidthRefs.map((widths) => Math.floor(widths.current.naturalWidth*offsetHeight/widths.current.naturalHeight)))
    }, [])
    useEffect(() => {
    }, [window.innerWidth])
    return (
        <div style={{height: "100%"}}>
            <div className="slideShow"> 
                
                {centerImage.map((image: string, index: number) => (
                    //<animated.img className={index==2 ? "centerImage" : ""} style={spring} key={image} src={image}></animated.img>
                    <animated.img 
                        ref = {imageWidthRefs[index]}
                        style = {
                            index == centerIndex ? 
                                {
                                left: `calc(50vw - ${imageWidths[index]/2}px)`,
                                ...centerSpring
                                } :
                            (index == centerIndex - 1 ? 
                                {
                                left: `calc(50vw - ${imageWidths[centerIndex-1]+imageWidths[centerIndex]/2}px - ${window.innerWidth/centerPadding}px)`,
                        
                                ...leftSpring
                                } :
                            (index == centerIndex + 1 ? 
                                {
                                left: `calc(50vw + ${imageWidths[centerIndex]/2}px + ${window.innerWidth/centerPadding}px)`,
                        
                                ...rightSpring
                                } :
                            (index < centerIndex - 1 ?
                                {
                                left: `calc(50vw - ${imageWidths.slice(index, centerIndex).reduce((a, c) => a+ c, 0)+((centerIndex-index-1)*window.innerWidth/gapPadding)+imageWidths[centerIndex]/2}px - ${window.innerWidth/centerPadding}px)`,
                                
                                ...leftSideSpring
                                } :
                            (index > centerIndex + 1 ?
                                {
                                left: `calc(50vw + ${imageWidths.slice(centerIndex+1,index).reduce((a, c) => a+ c, 0)+((index-centerIndex-1)*window.innerWidth/gapPadding)+imageWidths[centerIndex]/2}px + ${window.innerWidth/centerPadding}px)`,
                                
                                ...rightSideSpring
                                } :
                               "")))) 
                        } className = {
                            index == centerIndex ? "centerImage" :
                            (index == centerIndex - 1 ? "leftImage" :
                            (index == centerIndex + 1 ? "rightImage" :
                            "image")) 
                        }
                        key={image} 
                        src={image}>
                    </animated.img>


                ))}
            <div className="leftMask"></div> 
                <div className="rightMask"></div>
            <img className="leftButton" src="xbox_x_button.jpeg" onClick={() => handleClick(-1)}></img>
            <img className="rightButton" src="xbox_b_button.jpeg" onClick={() => handleClick(1)}></img>
            </div>            
        </div>
    )
    
}
    

export default Slideshow