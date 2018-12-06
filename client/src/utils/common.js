import { setInStorage, getFromStorage } from './storage';
import axios from 'axios';

 export function log_user_in (email, password) {  axios.post('http://localhost:5000/api/users/account/signin',{
      email,
      password
    })
    .then(res => res.data)
    .then(res => {
      // console.log(this.state);
      if (res.success) {
          
        setInStorage('the_main_app', { token: res.token, name: res.name, userId: res.userId  });
        this.setState({
          redirect: true,
          signInError: res.message,
          isLoading: false,
          password,
          email,
          token: res.token,
        });
      } else {
          alert("Login failed, try again")
          return false;
        }
      });
    }

// To enable only admins and original creators of posts to be able to delete those posts

    export function user_owns_post_or_is_admin(post_id){

      const obj = getFromStorage('the_main_app');
      if (obj && obj.userId) {
        const { userId } = obj;

    }
  }


