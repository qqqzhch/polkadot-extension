const localStorageV3 = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async key => (await chrome.storage.local.get(key))[key],
    setItem: (key, val) => chrome.storage.local.set({[key]: val}),
    removeItems: keys => chrome.storage.local.remove(keys),
  };

export default function(){
    if(process.env.MANIFESTV3==false){
        return localStorage;
    }else{
        return localStorageV3;
    }
}