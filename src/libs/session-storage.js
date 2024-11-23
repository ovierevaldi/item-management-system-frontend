const sesStorageProvider = () => {
    const dataStorageName = 'userData';

    function saveUserData(data){
        sessionStorage.setItem(dataStorageName, JSON.stringify(data));
    };

    function getUserData(parse = true){
        const data = sessionStorage.getItem(dataStorageName);
        
        if(!data)
            return null;

        if(parse)
            return JSON.parse(data)
        else
            return data;
    }

    function removeUserData(){
        sessionStorage.removeItem(dataStorageName)
    }

    return {
        saveUserData,
        getUserData,
        removeUserData
    }
}

export default sesStorageProvider;