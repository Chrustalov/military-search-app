import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import PostDetailSkeleton from "../../components/Posts/PostDetailSkeleton";

const url = process.env.REACT_APP_API_URL + "/api/v1/posts/";

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [profile, setProfile] = useState({});
    const [city, setCity] = useState({});
    const [author, setAuthor] = useState({});
    const [latest_posts, setLatestPosts] = useState([]);
    const [missing_people, setMissingPeople] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setIsFetching(false);
                const { data } = await axios.get(url + id);
                console.log(data);
                setPost(data.post);
                setLatestPosts(data.latest_posts);
                setMissingPeople(data.missing_people);
                setAuthor(data.creator);
                setCity(data.city);
                setProfile(data.creator_profile);
                console.log(author, latest_posts, missing_people, post, profile);

                setIsFetching(true);
            } catch (err) {
                alert("Щось пішло не так, спробуйте ще раз!");
                console.log(err);
            }
        };

        fetchRequests();
    }, [id]);

    return (
        <div className="blog-single gray-bg m-5">
            {isFetching ? (
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-lg-8 m-15px-tb">
                            <article className="article">
                                <div className="article-img">
                                    <img src={process.env.REACT_APP_API_URL + post.photo.url} title="" alt="" />
                                </div>
                                <div className="article-title">
                                    <h2>{post.title}</h2>
                                    <div className="media">
                                        <div className="media-body">
                                            <span>{new Date(post.created_at).toDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="article-content">
                                    { post.body }
                                </div>
                            </article>
                            <div className="widget widget-latest-post">
                                <div className="widget-title">
                                    <h3>Latest Post</h3>
                                </div>
                                {/*<div className="widget-body">*/}
                                {/*    {*/}
                                {/*        latest_posts.map((item) => (*/}
                                {/*            <LatestPost key={item.title} {...item}/>*/}
                                {/*        ))*/}
                                {/*    }*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="col-lg-4 m-15px-tb blog-aside">
                            <div className="widget widget-author">
                                <div className="widget-title">
                                    <h3>Author</h3>
                                </div>
                                <div className="widget-body">
                                    <div className="media align-items-center d-flex">
                                        <div className="avatar">
                                            <img src={'https://hackaton-9507e74b8c0c.herokuapp.com' + profile.avatar.url} title="" alt="" />
                                        </div>
                                        <div className="media-body">
                                            <h6>Hello, I'm<br /> {profile.first_name} {profile.last_name}</h6>
                                        </div>
                                    </div>
                                    <p>Про мене: { profile.about_me }</p>
                                    <a href={'tel:' + profile.phone_number} className="btn btn-outline-primary mt-3">
                                        Подзвонити: +{profile.phone_number}
                                    </a>
                                    <a href={'mail:' + author.email} className="btn btn-outline-secondary mt-3">
                                        Написати: +{author.email}
                                    </a>
                                    <p className="text-muted mt-4">Місто: { profile.city }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>wow</h1>
                // <PostDetailSkeleton key={id}/>
            )}
        </div>
    )
}

export default Post;