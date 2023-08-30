export const ConvertBytesToImage = ({ imageBytes }) => {
    return imageBytes ? imageBytes?.toString()?.includes('data:image/png;base64') ? imageBytes : ('data:image/png;base64,' + imageBytes?.toString()) : null
}
