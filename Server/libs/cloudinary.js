import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: "lgch-services",
    api_key: "136466976159548",
    api_secret: "m1UF2U5XGM1H4g1Cy6Uz1qgOZRI"

})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'test'
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}