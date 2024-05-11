import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import '../../styles/posts.scss';
import PostCard from "../../components/Posts/PostCard";
import PostSkeleton from "../../components/Posts/PostSkeleton";

const url = process.env.REACT_APP_API_URL + "/api/v1/posts";

function Posts() {
    const [isFetching, setIsFetching] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsFetching(false);
                console.log(process.env.REACT_APP_API_URL);
                const { data } = await axios.get(url);
                setPosts(data.posts);
                setIsFetching(true);
            } catch (err) {
                alert("Щось пішло не так попробуйте щераз!");
                console.log(err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container mb-5">
            <h3 className="my-5 fw-bold">Posts</h3>
            {isFetching ? (
                <div className="cards-list">
                    {posts.map((item) => (
                        <PostCard key={item.title} {...item} />
                    ))}
                </div>
            ) : (
                [...Array(6)].map((_, id) => <PostSkeleton key={id} />)
            )}
        </div>
    );
}

export default Posts;
