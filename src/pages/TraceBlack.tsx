// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect } from "react";
import Slideshow from '../components/Slideshow'
import NavBar from "../components/NavBar";
import PlaceHolder from "../components/PlaceHolder";
import "../styles/NavBar.scss"
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

// import { useSpring, useSprings, animated, SpringValue, AnimationResult, Lookup, config } from '@react-spring/web'



const TraceBlack: React.FC = () => {
    const imagePaths = [
        "portfolio_images/DSCF3588.JPEG",
        "portfolio_images/esme.jpeg",
        "portfolio_images/IMG_0666.jpeg",
        "portfolio_images/IMG_1082.jpg",
        "portfolio_images/IMG_1611.jpg",
        "portfolio_images/IMG_1767.jpg",
        "portfolio_images/IMG_4978.jpeg",
        "portfolio_images/IMG_0466.jpeg",
        "portfolio_images/IMG_7650.jpeg",
        "portfolio_images/IMG_9359.jpeg",
        "portfolio_images/IMG_9788.jpeg"
    ]

    /* let preload: HTMLImageElement[] = []

    imagePaths.map(
        (image) => (
            (image: string) => {
                const i = new Image()
                console.log("a")
                i.src = image
                preload = preload.concat(i)
            }
        )(image)
    )
     */


/*     (async () => {
        imagePaths.map(
            (url) => (
                async (url: string) => {
                    console.log('called')
                    try {
                        const response = await fetch(url);
                        if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                        }
                        const blob = await response.blob();
                        const objectURL = URL.createObjectURL(blob);
                        image.src = objectURL;
                    } catch (e) {
                        console.error(e);
                    }
                }
            )(url)
        )  
    })() */


    
    useEffect(() => {
        console.log("hey")
        imagePaths.map((image) => new Image().src = image)
    }, [])
    return (
        <div style={{width: "100%"}}>
            {/* <h1 className="TraceBlackHeader">Trace Black (yeah this is a placeholder i gotta finish) </h1>
            <img src="portfolio_images/TRACEBanner.jpg"></img>  */}
            {/* <BrowserView>
                <PlaceHolder images={imagePaths}/>
            </BrowserView>
            <MobileView>
                <PlaceHolder images={imagePaths}/>
            </MobileView> */}
            
            {/* <animated.div className="slideShowWrapper" style={{height: "250px"}}>
            <Slideshow images={imagePaths} offsetHeight={200}/>
            </animated.div>  */}
            <NavBar imagePaths={imagePaths} ></NavBar>
             {/* {imagePaths.map((image) => (
                <animated.img src={image}></animated.img>
            ))} */}
        </div>
    )
}

export default TraceBlack