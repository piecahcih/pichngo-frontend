import axios from "axios";

export default async(file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'PichnGo-ProfilePic')
        const res = await axios.post('https://api.cloudinary.com/v1_1/piecahcih/image/upload', formData)
        // console.log('uploadCloud : res', res)
        return res.data.secure_url
}