const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
})

async function uploadImage(file, filename) {
    const result = await imagekit.upload({
        file: file,
        fileName: filename,
        folder: "TwitterClone/posts/"
    })
    return result;
}

async function deleteImage(fileId) {
    const result = await imagekit.deleteFile(fileId)
    return result;
}

module.exports = {uploadImage , deleteImage};
