import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TimeAgo from './TimeAgo';
import '../Post.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router';
import { getFromStorage } from '../utils/storage';




export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: {},
          post: {},
          tags: [],
          userIsTeacher: false
        };

        // Slice post if it's too long
        this.slicePost = this.slicePost.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getTags = this.getTags.bind(this);
        this.likePost = this.likePost.bind(this);
        this.userHasAlreadyLikedPost = this.userHasAlreadyLikedPost.bind(this);
        this.countComments = this.countComments.bind(this);
        this.reloadPost = this.reloadPost.bind(this);
      }

      


  slicePost(){
      let slicedPost = {};
      if (this.props.post.title.length >30 ){
        slicedPost.title = this.props.post.title.slice(0, 30) + "...";
      } else {
        slicedPost.title = this.props.post.title;
      }

      if (this.props.post.content.length >150 ){
        slicedPost.content = this.props.post.content.slice(0, 150) + "...";
      } else{
        slicedPost.content = this.props.post.content;
      }

      slicedPost.postId = this.props.post._id;
   
       return this.setState({post: slicedPost});
      }

      getUser(){

         const { userId } = this.props.post;

          axios.get('http://localhost:5000/api/users/'+userId)
          .then(res => {
            this.setState({ user: res.data });
            if(this.state.user.role === 1){
                this.setState({userIsTeacher: true})
            }
            console.log('User: '+this.state.user);
          })
          .catch(err =>{
              console.log('Error getting user: '+err)
          });
        }

        getTags(){

            const { tags } = this.props.post;

            if(tags && tags.length>0){
              tags.map((tag, i) => {

                    axios.get('http://localhost:5000/api/groups/'+tag)
                    .then(res => {
                      this.setState({ tags: [ ...this.state.tags, res.data.name] });
                      console.log('Tags: '+this.state.tags);
                    })
                    .catch(err =>{
                        console.log('Error getting tag: '+err)
                    });
                })
                
            }
        }

        userHasAlreadyLikedPost(){
            
            console.log("Checking if user has already liked post...");
            return this.props.post.likers.includes(this.state.user._id);

        }

        likePost(){

            const {
                likers
            } = this.props.post;

            const obj = getFromStorage('the_main_app');
            
            
              if(!obj){
                  alert("Login to like");
                  return false;
              }
            

            
            if( likers.includes(obj.userId)){
                alert("Already liked this post");
                return false;
            }
            
            let updatedLikers = [...this.props.post.likers, obj.userId]

            // Save post to DB
            axios
            .put(`http://localhost:5000/api/posts/${this.props.post._id}/like`, {  
                    likers: updatedLikers,
                })
              .then(res => {
                  this.reloadPost();
                console.log(res.data);
              });
            }
        

        countComments(){
            if(this.props.post.commennts){
                let count = this.props.post.comments.length;
                this.setState({commentCount: count}) 
            }
        }

        reloadPost (){
            window.location.reload();
        }
         

      

 
    
      componentDidMount() {

            this.countComments();

            //Get post passed from props and slice post if it's too long
            this.slicePost();
            
            this.getUser();

            this.getTags();

            
            
  
      }
      render() {
        return (
                <div className="wrapper">
                    <svg display="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <symbol id="icon-bubble" viewBox="0 0 1024 1024">
                                <title>bubble</title>
                                <path className="path1" d="M512 224c8.832 0 16 7.168 16 16s-7.2 16-16 16c-170.464 0-320 89.728-320 192 0 8.832-7.168 16-16 16s-16-7.168-16-16c0-121.408 161.184-224 352-224zM512 64c-282.784 0-512 171.936-512 384 0 132.064 88.928 248.512 224.256 317.632 0 0.864-0.256 1.44-0.256 2.368 0 57.376-42.848 119.136-61.696 151.552 0.032 0 0.064 0 0.064 0-1.504 3.52-2.368 7.392-2.368 11.456 0 16 12.96 28.992 28.992 28.992 3.008 0 8.288-0.8 8.16-0.448 100-16.384 194.208-108.256 216.096-134.88 31.968 4.704 64.928 7.328 98.752 7.328 282.72 0 512-171.936 512-384s-229.248-384-512-384zM512 768c-29.344 0-59.456-2.24-89.472-6.624-3.104-0.512-6.208-0.672-9.28-0.672-19.008 0-37.216 8.448-49.472 23.36-13.696 16.672-52.672 53.888-98.72 81.248 12.48-28.64 22.24-60.736 22.912-93.824 0.192-2.048 0.288-4.128 0.288-5.888 0-24.064-13.472-46.048-34.88-56.992-118.592-60.544-189.376-157.984-189.376-260.608 0-176.448 200.96-320 448-320 246.976 0 448 143.552 448 320s-200.992 320-448 320z"></path>
                            </symbol>
                            <symbol id="icon-star" viewBox="0 0 1024 1024" >
                                <title>star</title>
                                <path className="path1" d="M1020.192 401.824c-8.864-25.568-31.616-44.288-59.008-48.352l-266.432-39.616-115.808-240.448c-12.192-25.248-38.272-41.408-66.944-41.408s-54.752 16.16-66.944 41.408l-115.808 240.448-266.464 39.616c-27.36 4.064-50.112 22.784-58.944 48.352-8.8 25.632-2.144 53.856 17.184 73.12l195.264 194.944-45.28 270.432c-4.608 27.232 7.2 54.56 30.336 70.496 12.704 8.736 27.648 13.184 42.592 13.184 12.288 0 24.608-3.008 35.776-8.992l232.288-125.056 232.32 125.056c11.168 5.984 23.488 8.992 35.744 8.992 14.944 0 29.888-4.448 42.624-13.184 23.136-15.936 34.88-43.264 30.304-70.496l-45.312-270.432 195.328-194.944c19.296-19.296 25.92-47.52 17.184-73.12zM754.816 619.616c-16.384 16.32-23.808 39.328-20.064 61.888l45.312 270.432-232.32-124.992c-11.136-6.016-23.424-8.992-35.776-8.992-12.288 0-24.608 3.008-35.744 8.992l-232.32 124.992 45.312-270.432c3.776-22.56-3.648-45.568-20.032-61.888l-195.264-194.944 266.432-39.68c24.352-3.616 45.312-18.848 55.776-40.576l115.872-240.384 115.84 240.416c10.496 21.728 31.424 36.928 55.744 40.576l266.496 39.68-195.264 194.912z"></path>
                            </symbol>
                        </defs>
                    </svg>

                    <div className="blog-container">

                        <div className="blog-header">
                            <div className= { (this.state.userIsTeacher ? "blog-author--with-hat" : "blog-author--no-cover")} >
                                {/* <h3>{this.state.user.firstName+' '+this.state.user.lastName}</h3> */}
                                <h3>{ (this.state.user !== null ? this.state.user.firstName+" "+this.state.user.lastName : "John Doe")} </h3>
                            </div>
                        </div>

                        <div className="blog-body">
                            <div className="blog-title">
                                <h1>
                                    <NavLink to={'/posts/'+this.state.post.postId} activeClassName="active">
                                      { this.state.post.title }
                                    </NavLink> 
                                </h1>
                            </div>
                            <div className="blog-summary">
                                <p>{this.state.post.content }</p>
                            </div>
                            <div className="blog-tags">
                                <ul>
                                {
                                 (this.state.tags.length>0)?(   
                                     this.state.tags.map((tag, i) =>
                                        <li><a href="#">{tag}</a></li>
                                        )
                                ):(
                                        <li><a href="#">No tags</a></li>
                                    )
                                }

                                  
                                </ul>
                            </div>
                        </div>

                        <div className="post-footer">
                            <ul>
                                <li className="published-date">
                                 <TimeAgo timestamp={ this.props.timestamp }/>
                                </li>
                                <li className="comments">
                                    <a href={'/posts/'+this.props.post._id}  onClick={ <Redirect to={'/posts/'+this.props.post._id} />}>
                                        <svg className="icon-bubble">
                                            <use xlinkHref="#icon-bubble"></use>
                                        </svg><span className="numero">{this.props.post.comments.length}</span></a>
                                </li>
                                <li className="shares">
                                    <div>
                                        <svg className={ (this.userHasAlreadyLikedPost) ? ("icon-star-filled"): ("icon-star")} onClick={this.likePost}>
                                            <use xlinkHref="#icon-star"></use>
                                        </svg><span className="numero">{this.props.post.likers.length}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
        );
    }
}


Post.propTypes = {
    slicePost: PropTypes.bool
};
