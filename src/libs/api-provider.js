import axios from "axios";
import toast from "react-hot-toast";

class ApiProviderClass{
    apiManager;

    constructor(baseUrl){
        this.baseUrl = baseUrl;
        this.headers = {}

        this.setupApi();
        // this.setupRequestInterceptor();
        // this.setupResponseInterceptor();
    }    

    setupApi(){
        this.apiManager = axios.create({
            baseURL: this.baseUrl,
            timeout: 2000,
        });

        if(!this.apiManager)
            console.log('Cannot create api')
    };

    setupRequestInterceptor(){
        this.apiManager.interceptors.request.use((config) => {

        }, (error) => {

        })
    }

    setupResponseInterceptor(){
        this.apiManager.interceptors.response.use((config) => {

        }, (error) => {
            
        })
    }

    async post(url, data){
        return await this.apiManager.post(url, data);
    }

    async get(url){
        return await this.apiManager.get(url);
    }

    async patch(url, data){
        return await this.apiManager.patch(url, data)
    }

    async delete(url){
        return await this.apiManager.delete(url)
    }

    async signUser(userData, fromZod = true){
        let data = userData;

        if(!fromZod){
            data = {
                username: userData.username,
                password: userData.password
            }
        }

        try {
            const response = await this.post('/auth', data);
            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async getItems(){
        try {
            return await this.get('/items')
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getCategories(){
        try {
            return await this.get('/categories')
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async createItem(itemData, fromZod = true){
        let data = itemData;

        if(!fromZod){
           console.log('Method not implemented');
        }

        try {
            const response = await this.post('/items', data);
            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async getItem(item_id){
        if(!item_id)
            return toast.error('Please Input Item ID!')    
        
        try {
            return await this.get(`/items/${item_id}`)
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async updateItem(item_id, itemData, fromZod = true){
        let data = itemData;

        if(!fromZod){
           console.log('Method not implemented');
        }

        try {
            const response = await this.patch(`/items/${item_id}`, data);
            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async deleteItem(item_id){
        try {
            const response = await this.delete(`/items/${item_id}`);
            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}
const ApiProvider = new ApiProviderClass(process.env.NEXT_PUBLIC_API_URL);

export default ApiProvider;