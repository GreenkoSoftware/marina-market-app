export const ConvertBytesToImage = ({ imageBytes }) => {
    const result = imageBytes ? imageBytes?.toString()?.includes('base64') ? imageBytes : ('data:image/png;base64,' + imageBytes?.toString()) : null
    return result
}
