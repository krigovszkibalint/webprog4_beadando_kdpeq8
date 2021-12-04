import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import { Link } from "react-router-dom";
import Image from "../../assets/img/singlepostimg.jpg"
import Sidebar from "../sidebar/Sidebar"
import "./singlepost.css"

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const publicFolder = "http://localhost:3001/images/";

    useEffect(()=>{
        const getPost = async ()=>{
            const res = await axios.get("/posts/"+path);
            setPost(res.data);
        };
        getPost();
    },[path])
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                <img src={publicFolder + post.photo}
                alt=""
                className="singlePostImage" />
                )}
                <h1 className="singlePostTitle">
                    {post.title}
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:<span>&nbsp;</span> 
                        <Link className="link" to={`/?user=${post.username}`}>
                        <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        {new Date(post.createdAt).toLocaleString()}
                    </span>
                </div>
                <p className="singlePostDescription">
                    {post.desc}
                </p>
            </div>
        </div>
    )
}
