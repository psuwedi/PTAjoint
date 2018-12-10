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

  export function SaveDataToLocalStorage(data, key)
  {

    if(!key){
      console.error('Error: key is missing, failed to update local storage');
    }
    try{
      let localStorageData = [];
      // Parse the serialized data back into an aray of objects
      localStorageData = JSON.parse(localStorage.getItem(key));



      // Push the new data (whether it be an object or anything else) onto the array
      localStorageData["groupId"] = data;
      
      console.log(localStorageData); 
      // Re-serialize the array back into a string and store it in localStorage
      localStorage.setItem(key, localStorageData);
    } catch (err) {
      console.log('Error: ' + err)
    }
  }