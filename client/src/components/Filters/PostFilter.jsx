import React, { useState, useEffect, useRef } from 'react';
import TomSelect from 'tom-select';
import "../../styles/filters.scss";

function PostFilter({ initialCities = [], onCityClick, All_Cities = [] }) {
    const [Cities, setCities] = useState(initialCities);
    const [query, setQuery] = useState('');

    const handleSearch = async (event) => {
        try {
            const newQuery = event.target.value; // Get the latest query value
            setQuery(newQuery); // Update the query state
            await onCityClick(Cities, newQuery); // Pass the latest values to onCityClick
        } catch (error) {
            console.error(error);
        }
    };
    const selectRef = useRef(null);

    useEffect(() => {
        const selectEl = selectRef.current;
        const select = new TomSelect(selectEl, {
            plugins: ['remove_button'],
            valueField: 'value',
            labelField: 'label',
            options: All_Cities.map(city => ({ value: city, label: city })),
            onChange: (values) => {
                setCities(values);
            },
            closeAfterSelect: true
        });

        select.on('dropdown:show', () => {
            setTimeout(() => selectRef.current.focus(), 0);
        });

        return () => {
            select.destroy();
        };
    }, []);

    async function handleClick() {
        await setCities(Cities);
        console.log(Cities);
        await onCityClick(Cities, query);
    }

    return (
        <div className="filters">
            <h3>Пошук</h3>
            <div className="search-input d-flex align-items-center">
                <input
                    type="search"
                    className="form-control rounded w-50 flex-grow-0"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    id="main-search"
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value); // Update the query state
                        handleSearch(event); // Trigger the handleSearch function
                    }}
                />
                <span
                        onClick={handleSearch}
                        className="input-group-text border-0 bg-transparent "
                        id="search-addon"
                    >
                  <label htmlFor="main-search">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        height={"1.5rem"}
                    >
                      <path
                          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                    </svg>
                  </label>
                </span>
            </div>
            <label htmlFor="Cities">Оберіть міста:</label>
            <select id="cities" className="form-select form-select-sm" multiple ref={selectRef}/>
            <button className="btn btn-outline-success mt-4" onClick={handleClick}>Застосувати фільтр по містам</button>
        </div>
    );
}

export default PostFilter;
