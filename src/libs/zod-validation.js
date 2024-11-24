import { allowedImageExtentions } from '@/configs/config';
import z from 'zod';

const zodValidation = () => {
    const schemas = {
        userSchema:  z.object({
            username: z.string().min(1, {message: 'Username Required'}).min(4, {message: 'Min characters is 4'}).max(16, {message: 'Max characters is 16'}).trim(),

            password: z.string().min(1, {message: 'Password Required'}).min(4, {message: 'Min characters is 4'}).max(16, {message: 'Max characters is 16'}).trim(),
        }),

        itemSchemas: z.object({
            nama: z.string().min(1, "Nama is required").min(4, "Nama must be greater than 4 characters").max(25, "Nama must be less than 25 characters"),
            harga: z.number().int().nonnegative("Harga must be a non-negative integer"),
            stok: z.number().int().min(1, "Stok must be at least 1").nonnegative("Stok must be a non-negative integer"),
            kategori: z.string().min(1, "Kategori is required").max(255, "Kategori must be less than 255 characters"),
            gambar: z.object({
                nama: z.string().min(1, "URL Gambar is required"),
                type: z.string().min(1, "URL Gambar is required").refine((value) => {
                    return allowedImageExtentions.includes(value)
                }), 
            }),
        })

    }
    
    function parseUser(data){
        return schemas.userSchema.safeParse(data);
    }

    function parseItem(data){
        return schemas.itemSchemas.safeParse(data);
    }

    return {
        parseUser, parseItem
    }
};

export default zodValidation;