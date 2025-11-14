import React, { useEffect } from "react";
import PlaceHolder from "../components/PlaceHolder";
import "../styles/NavBar.scss"
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';




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
            <h1 className="TraceBlackHeader">Trace Black (yeah this is a placeholder i gotta finish this) </h1>
            <BrowserView>
                <PlaceHolder images={imagePaths}/>
            </BrowserView>
            <MobileView>
                <PlaceHolder images={imagePaths}/>
            </MobileView>
            
            {/* <h1 className="test">test</h1>
            <animated.div className="slideShowWrapper" style={{height: "250px"}}>
            <Slideshow images={imagePaths} offsetHeight={200}/>
            </animated.div> */}
{/*             {imagePaths.map((image) => (
                <animated.img src={image}></animated.img>
            ))}
            <h1 className="sandwhich">sandwhich</h1> */}
        </div>
    )
}

export default TraceBlack