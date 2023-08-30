export const ConvertBytesToImage = ({ imageBytes }) => {
    return imageBytes ? imageBytes?.include('data:image/png;base64') ? imageBytes : ('data:image/png;base64,' + imageBytes?.toString()) : null
}
