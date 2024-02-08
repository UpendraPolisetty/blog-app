import React, { createContext, useEffect, useState } from "react";
import "../Styles/Home.css";
import Posts from "./Posts";
import { SideBar } from "./SideBar";
import { Pagination } from "./Pagination";
import { FeedNav } from "./FeedNav";
import { ArticlesUrl } from "./utils/Constant";

const initialState = {
  articles: null,
  error: "",
  artclesCount: 0,
  articlesPerPage: 10,
  activePage : 1,
  activeTab: "",
};

export const articleCountStore = createContext();

export const Home = () => {
  const [state, setState] = useState(initialState);

  let removeTab = () => {
    setState({ ...state, activeTab: '' });
  };

  let addTab = (val) => {
    setState({ ...state, activeTab: val });
  };

  const updatePageIndex = (index) => {
    setState({ ...state, activePage: index });
  };

  useEffect(() => {
    fetchData();
  }, [state.activePage, state.activeTab]); 

  let fetchData = () => {
    const limit = state.articlesPerPage;
    const offset = (state.activePage - 1) * limit;
    const tag = activeTab;

    fetch(ArticlesUrl + `/?offset=${offset}&limit=${limit}`+ (tag && `&tag = ${tag}`))
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json(); // Parse response JSON
      })
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          articles: data.articles,
          error: "",
          artclesCount: data.articlesCount,
        }));
      })
      .catch((err) => {
        setState((prevState) => ({
          ...prevState,
          articles: null,
          error: "Not able to fetch articles",
        }));
      });
  };

  let { articles, error, activeTab, artclesCount, articlesPerPage, activePage } = state;
console.log(state);
  

  return (
    <div>
      <section className="hero_section">
        <div className="hero_container">
          <section className="hero">
            <article className="hero_left">
              <h1 className="hero_heading">
                <div className="xbox_heading">
                  XBOX a shortened version of weblog
                </div>
                It is an online journal or informational website displaying
                information in reverse chronological order, with the latest
                posts appearing first, at the top. It is a platform where a
                writer or a group of writers share their views on an individual
                subject. There are many reasons to start a blog for personal use
                and only a handful of strong ones for business blogging.
                Blogging for business, projects, or anything else that might
                bring you money has a very straightforward.
              </h1>
            </article>
            <article className="hero_right">
              <img className="undraw " src="./images/lotte.gif" alt="" />
            </article>
          </section>
        </div>
      </section>
      <div className="hero_container">
        <div className="line"></div>
      </div>
      <section className="global_contaier">
        <div>
          <FeedNav activeTab={activeTab} removeTab = {removeTab} />
          <Posts articles={articles} error={error} />
          <articleCountStore.Provider value={[artclesCount,articlesPerPage, activePage ,updatePageIndex, fetchData]}>
          <Pagination />
          </articleCountStore.Provider>
        </div>
        <div className="popular_tags">
          <SideBar addTab = {addTab} />
        </div>
      </section>
    </div>
  );
};
