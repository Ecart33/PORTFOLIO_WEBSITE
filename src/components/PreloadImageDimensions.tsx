

const PreloadImageDimensions = (images: string[]) => {
    
    const getImageDimension = (image: string) => {
        const img = new Image()
        img.src = image
        img.onload = () => {
            return {
                src: image,
                height: img.height,
                width: img.width
            }
        }
        return {
                src: image,
                height: img.height,
                width: img.width
            }
    }

    return images.map((i) => getImageDimension(i))

}

export default PreloadImageDimensions