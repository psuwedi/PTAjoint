import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import Spinner from './Spinner';
import { getFromStorage } from '../utils/storage';

class GroupPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          groupId: "",
          errorLoadingData: false,
          posts: []
        };

        this.loadData = this.loadData.bind(this);
      }

      loadData(){
        this.setState({
          isLoading: true
        });
        axios.get(`http://localhost:5000/api/groups/${getFromStorage("the_main_app").groupId}/posts`)
        .then(res => {

          if(res.success){
            this.setState({ posts: res.posts, isLoading: false });
          } else if(res.state !==200) {

            this.setState({ errorLoadingData: true, isLoading: false});
          }
         
          console.log(res.data);
        });
      }
    
      componentDidMount() {

          this.loadData()
          this.setState({groupId: this.props.groupId});
          
      }
      
    

    render() {

      const { isLoading } = this.state;
   
        if(isLoading){
          return <Spinner />
        } else {
        return (
          <React.Fragment>	
            {
              (this.state.posts.length<1)?(
                <div className="jumbotron">
                  <h1 className="text-center">&#9785;</h1>
                  <p className="text-center mt-4 mb-4 mr-4 ml-4">No posts in this group.</p>
                </div>
              ):(
                this.state.posts.map((post, i) =>
                  <Post post = {post} key={i} timestamp={new Date(post.createdAt)}></Post>
                )
              )

              (this.state.errorLoadingData)?(
              <div className="jumbotron">
                <h1 className="text-center">&#9785;</h1>
                <p className="text-center mt-4 mb-4 mr-4 ml-4">There was an error loading the page.</p>
              </div>):("")

            }
          </React.Fragment>
        );
      }
    }
  }
  
  export default GroupPosts;



