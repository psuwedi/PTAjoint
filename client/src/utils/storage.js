export function getFromStorage(key) {
    if (!key) {
      return null;
    }
    try {
      const valueStr = localStorage.getItem(key);
      if (valueStr) {
        return JSON.parse(valueStr);
      }
      return null;
    } catch (err) {
      return null;
    }
  }
  export function setInStorage(key, obj) {
    if (!key) {
      console.error('Error: Key is missing');
    }
    try {
      localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
      console.error(err);
    }
  }

  export function deleteInStorage(key){
    if(!key){
      console.error('Error: key is missing');
    }
    try{
      localStorage.removeItem(key);
    } catch(err) {
      console.error('Error '+err);
    }
  }

  export function clearStorage(){
    localStorage.clear();
  }

  export function SaveDataToLocalStorage(key, data)
  {

    if(!key){
      console.error('Error: key is missing, failed to update local storage');
    }
    try{
     
     
      // Parse the serialized data back into an aray of objects
      let localStorageData = JSON.parse(localStorage.getItem(key)) || [];

      // let groupId = {"groupId": data}

      // Push the new data onto the array

      localStorageData.groupId=data;  
     
      // Re-serialize the array back into a string and store it in localStorage
      
      localStorage.setItem(key, JSON.stringify(localStorageData));

      console.log("Local storage data: "+localStorage.getItem(key)); 


    } catch (err) {
      console.log('Error: ' + err)
    }
  }

  export function saveGroupPosts(value){

    localStorage.setItem('posts', value);
  }