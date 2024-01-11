import React, { useEffect, useState } from "react";
import { TagsUrl } from "./utils/Constant";
import Loader from "./Loader";

export const SideBar = ({addTab}) => {
  let [state, setstate] = useState({
    tags: null,
    error: "",
  });

  useEffect(() => {
    fetch(TagsUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setstate({ tags: data.tags, error: "" });
      })
      .catch((err) => {
        setstate({ tags: null, error: "Not able fetch tags" });
      });
  }, []);
  if (state.error) {
    return <p>{state.error}</p>;
  }
  if (!state.tags) {
    return <Loader />;
  }
  return (
   <aside className=" p-3 bg-slate-200 rounded-md">
    <h3 className=" mb-2 font-medium text-xl">Popular Tags</h3>
    {state.tags.map((tag) => (
  <span key={tag} onClick={() => addTab(tag)}>
    <p
      className="tag cursor-pointer"
      style={{
        padding : '0.3rem 0.4rem',
        fontSize : '1rem',
        backgroundColor: "rgb(168, 178, 183)",
        borderRadius: "10px",
        whiteSpace : 'nowrap',
        marginRight : '3px',
        marginBottom : '0.3rem',
        display: "inline-block"
      }}
    >
      {tag}
    </p>
  </span>
))}
   </aside>
  );
};
