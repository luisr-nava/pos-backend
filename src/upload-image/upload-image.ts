import {v2 as cloudinary} from 'cloudinary'

export const UploadImageProvider={


    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary.config({
          cloud_name: process.env.CLOUDINART_NAME,
          api_key: process.env.CLOUDINART_API_KEY,
          api_secret: process.env.CLOUDINART_API_SECRET,
        });
    }
}