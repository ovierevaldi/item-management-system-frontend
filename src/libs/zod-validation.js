import z from 'zod';

const zodValidation = () => {
    const schemas = {
        userSchema:  z.object({
            username: z.string().min(1, {message: 'Username Required'}).min(4, {message: 'Min characters is 4'}).max(16, {message: 'Max characters is 16'}).trim(),

            password: z.string().min(1, {message: 'Password Required'}).min(4, {message: 'Min characters is 4'}).max(16, {message: 'Max characters is 16'}).trim(),
        })
    }
    
    function parseUser(data){
        return schemas.userSchema.safeParse(data);
    }

    return {
        parseUser
    }
};

export default zodValidation;