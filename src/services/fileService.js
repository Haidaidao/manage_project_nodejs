const path = require('path'); 
const uploadSingleFile = async (fileObject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uploadPath = path.resolve("src", "public", "images", fileObject.name);

    // Use the mv() method to place the file somewhere on your server
    try {
        await fileObject.mv(uploadPath)

        return {
            status: 'success',
            path: fileObject.name,
            error: null
        }
    } catch (err) {
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        };
    }
}

const uploadMultiFile = async (fileObject) => {
    console.log('dfsdfsdfs')
    if (!Array.isArray(fileObject)) {
        
        fileObject = [fileObject];
    }

    // Use the mv() method to place the file somewhere on your server
    for(let file = 0 ; file < fileObject.length; file++) {
        console.log(fileObject[file].name)
        let uploadPath = path.resolve("src", "public", "images", fileObject[file].name);
        console.log(uploadPath)
        try {
            await fileObject[file].mv(uploadPath)
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = {
    uploadSingleFile,
    uploadMultiFile
}