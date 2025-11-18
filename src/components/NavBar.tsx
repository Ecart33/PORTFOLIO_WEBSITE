// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef, useState, lazy, useEffect } from "react";
const Slideshow = lazy(() => (import("./Slideshow")));
import "../styles/NavBar.scss"
import { useSpring, useSprings, animated, SpringValue, type AnimationResult, type Lookup, config } from '@react-spring/web'
import PreloadImageDimensions from "./PreloadImageDimensions";



//const closeSlideshow

const NavBar: React.FC<{imagePaths: string[]}>  = ({imagePaths}) => {

    const [medium, setMedium] = useState("")
    const [slideBelow, setSlideBelow] = useState(true)
    const [openMedium, setOpenMedium] = useState<number>(-1)
    const mediums = ["paint", "paper", "tattoo", "cv", "bio"]
    const offsetHeight = 300
    const mediumHeights = mediums.map((medium, index) => {
        return (useRef(0))
    })
    const navbarSize = useRef(5)
    const enabled = useRef(true)
    const imageDimensions = PreloadImageDimensions(imagePaths)

    console.log("render")

    // const closeMedium = (x: AnimationResult<SpringValue<Lookup<any>>>) => {


    //     //when the current medium finishes opening, set its height to 100 and re render with itself as the current open medium 
    //     //when the previous medium closes, set its height to zero
        
    //     x.value.height === `${offsetHeight}px` ?  (() => {
    //         //console.log("medium opened")
    //         setOpenMedium(x.value.index)
    //         mediumHeights[x.value.index].current = 100
    //     })() : 
    //     (() => {
    //         console.log("medium closed")
    //         mediumHeights[x.value.index].current = 0
    //     })()
    // }



    const closeMedium = (index) => {


        //when the current medium finishes opening, set its height to 100 and re render with itself as the current open medium 
        //when the previous medium closes, set its height to zero
        
        x.value.height === `${offsetHeight}px` ?  (() => {
            //console.log("medium opened")
            setOpenMedium(x.value.index)
            mediumHeights[x.value.index].current = 100
        })() : 
        (() => {
            console.log("medium closed")
            mediumHeights[x.value.index].current = 0
        })()
    }


    const [navbarSpring, navbarApi] = useSpring(() => ({
        from: {
            fontSize: `${navbarSize.current}vw`,
        },
        config: {
            mass: 1.2,
            friction: 20,
            tension: 95,
        },
    }))

    const mediumSprings = mediums.map((medium, index) => {
            //if height is 100 then its an open medium close on next open
            return (useSpring(() => ({
                    index: index,
                    from: {
                    height: `${mediumHeights[index].current}px`,
                    left: "0%",
                    opacity: "100%"
                    },
                    config: {
                        mass: 1.2,
                        friction: 20,
                        tension: 115,
                    }
                    })
                )
            )
        })

    const SwitchMedium = (index: number) => {
        console.log(openMedium)
        if (!enabled.current) {
            return
        }
        if (index == openMedium) {
            mediumSprings[openMedium][1].start(
            {
                from: {
                    height: `${offsetHeight}px`,
                    opacity: "100%",
                    //left: "0%"
                },
                to: {
                    height: "0px",
                    opacity: "0%"
                    //left: "50%"
                },
                onRest: () => { 
                    setOpenMedium(-1)
                    enabled.current = true 
                }
            }
            ) 
            return
        }

        enabled.current = false
        //close the open medium


        openMedium > -1 ? mediumSprings[openMedium][1].start(
            {
                from: {
                    height: `${offsetHeight}px`,
                    opacity: "100%",
                    //left: "0%"
                },
                to: {
                    height: "0px",
                    opacity: "0%"
                    //left: "50%"
                },
                onRest: () => { 
                    enabled.current = true 
                }
            }
        ) : "" 


        //open the current medium
        mediumSprings[index][1].start(
            {
                from: {
                    height: "0px",
                    opacity: "100%"
                },
                to: {
                    height: `${offsetHeight}px`,
                    opacity: "100%"
                },
                onRest: (x) => { 
                    enabled.current = true
                    mediumHeights[index].current = 100
                    setOpenMedium(index)
            
                }
            }
        )
        //setOpenMedium(index)
        //index != openMedium ? setOpenMedium(index) : mediumHeights[index].current = 0
        navbarApi.start(
            {
                from: {
                    fontSize: `${navbarSize.current}vw`
                },
                to: {
                    fontSize: "2vw"
                },
                onRest: () => { 
                    enabled.current = true 
                }
            }
        )
        navbarSize.current = 2
    }


     return (
        <div className="navBar">
            {mediums.map((m: string, index: number) => (
                <>
                    <animated.h1 className={m} style={{...navbarSpring}} onClick={() => SwitchMedium(index)}>{m}</animated.h1>
                    <animated.div style = {mediumSprings[index][0]} className="slideShowWrapper">
                        <Slideshow images={imagePaths} offsetHeight={offsetHeight}/>
                    </animated.div>
                </>
            ))} 
        </div>
     )
}

export default NavBar











