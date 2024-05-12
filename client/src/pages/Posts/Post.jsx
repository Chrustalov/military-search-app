import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../../styles/table_posts.scss";
import LatestPost from "../../components/Posts/LatestPost";
import PostTableItem from "../../components/Posts/PostTableItem";
import PostDetailSkeleton from "../../components/Posts/PostDetailSkeleton";
import { FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";
import  Comments from "../../components/Posts/Comments"

const url = process.env.REACT_APP_API_URL + "/api/v1/posts/";

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [profile, setProfile] = useState({});
    const [comments, setComments] = useState([])
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
                setComments(data.comments);
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
                                <div className="article-header">
                                    <h2 className="article-title">{post.title}</h2>
                                    <div className="media">
                                        <div className="media-body">
                                            <span>{new Date(post.created_at).toDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="article-content">
                                    { post.content }
                                </div>
                            </article>
                            <div className="widget widget-missing-people">
                                <div className="widget missing-people">
                                    <h3>Зниклі особи</h3>
                                </div>
                                <table className="table table-green">
                                    <thead>
                                    <tr>
                                        <th scope="col">Фото</th>
                                        <th scope="col">Ім'я</th>
                                        <th scope="col">Вік</th>
                                        <th scope="col">Регіон</th>
                                        <th scope="col">Відомості</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        missing_people.map((item) => (
                                            <PostTableItem key={item.title} {...item}/>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                         
                        </div>

                        <div className="col-lg-4 m-15px-tb">
                            <div className="widget widget-author">
                                <div className="widget-title">
                                    <h3>Організація: {profile.organization_name}</h3>
                                </div>
                                <div className="widget-body">
                                    <div className="media align-items-center d-flex">
                                        <div className="avatar">
                                            <img src={process.env.REACT_APP_API_URL + profile.avatar.url} title={profile.organization_name} alt="" />
                                        </div>
                                    </div>
                                    <p className="about">Про нас: { profile.about_me }</p>
                                    <div className="link-columns">
                                        <a href={'tel:' + profile.first_phone}>
                                            Номер телефону: +{profile.first_phone}
                                        </a>
                                        <a href={'tel:' + profile.second_phone}>
                                            Номер телефону: +{profile.second_phone}
                                        </a>
                                        <a href={'mail:' + author.email}>
                                            Емейл: {author.email}
                                        </a>
                                    </div>
                                    <p className="about socials">Соціальні мережі</p>
                                    <div className="social-links">
                                        <a href={profile.instagram_link} target="_blank">
                                            <FaInstagram/>
                                        </a>
                                        <a href={profile.facebook_link} target="_blank">
                                            <FaFacebook/>
                                        </a>
                                        <a href={profile.telegram_link} target="_blank">
                                            <FaTelegram/>
                                        </a>
                                    </div>
                                    <p className="text-muted mt-4">Місто: { profile.city }</p>
                                </div>
                            </div>
                            <div className="widget widget-latest-post">
                                <div className="widget-title">
                                    <h3>Останні публікації</h3>
                                </div>
                                <div className="widget-body mt-4">
                                    {
                                        latest_posts.map((item) => (
                                            <LatestPost key={item.title} {...item}/>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12">
                            <Comments comments={comments}/>
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
