export const ConvertBytesToImage = ({ imageBytes }) => {
    return imageBytes ? ('data:image/png;base64,' + imageBytes?.toString()) : null
}
