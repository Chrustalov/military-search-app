import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import '../../styles/posts.scss';
import PostCard from "../../components/Posts/PostCard";
import PostSkeleton from "../../components/Posts/PostSkeleton";
import PostFilter from "../../components/Filters/PostFilter";
import { useToastNotification } from "../../hooks/useToastNotification";

const url = process.env.REACT_APP_API_URL + "/api/v1/posts";

function Posts(props) {
    const [isFetching, setIsFetching] = useState(false);
    const [posts, setPosts] = useState([]);
    const [cities, setCities] = useState([]);
    const [all_cities, setAllCities] = useState([]);
    const {toastError} = useToastNotification();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsFetching(false);
                console.log(process.env.REACT_APP_API_URL);
                const { data } = await get_cities(url, props.filter ? props.filter : {});
                console.log(data);
                setPosts(data.posts);
                setAllCities(data.all_cities);
                setCities(data.cities);
                setIsFetching(true);
            } catch (err) {
                alert("Щось пішло не так попробуйте щераз!");
                toastError("Щось пішло не так попробуйте щераз!");
                console.log(err);
            }
        };
        console.log("start fetch");
        fetchPosts();
    }, [props.filter, toastError]);

    return (
        <div className="container mb-5">
            <h3 className="my-5 fw-bold">Оголошення</h3>
            {isFetching ? (
                    <div>
                        <PostFilter
                            initialCities={cities}
                            onCityClick={filter}
                            All_Cities={all_cities}
                        />
                        <div className="cards-list">
                            {posts.map((item) => (
                                <PostCard key={item.title} {...item} />
                            ))}
                        </div>
                    </div>
            ) : (
                [...Array(6)].map((_, id) => <PostSkeleton key={id} />)
            )}
        </div>
    );

    async function filter(cities, query) {
        console.log(cities, query);
        const { data } = await get_cities(
            url,
            props.filter?.id ? { cities, query, id: props.filter?.id } : { cities, query }
        );

        setPosts(data.posts);
        setAllCities(data.all_cities);
        setCities(data.cities);
        setIsFetching(true);
    }

    async function get_cities(url, filter = {}) {
        const response = await axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                params: {
                    cities: filter.cities ? filter.cities : [],
                    title: filter.query,
                    id: filter.id,
                },
            })
            .catch((err) => err.response);

        console.log("response", response);
        return response;
    }
}

export default Posts;
