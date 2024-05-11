import React, { useState } from "react";

function NavTabs({ tabs }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="advantage__tabs">
            <ul className="advantage-tabs__list">
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={`nav-tabs__item ${
                            index === activeTab ? "active" : ""
                        }`}
                        onClick={() => handleClick(index)}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
            <div className="advantage-tabs__content">
                {tabs[activeTab].content}
            </div>
        </div>
    );
}

export default NavTabs;
