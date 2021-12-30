import React from "react";
import "../style/loading.css";
import LoadingImg from "../assets/Images/l.gif";

function Loading() {
  return (
    <div className="loadingContainer">
      <div className="loadingWrapper">
        <img src={LoadingImg} alt="loading" />
      </div>
    </div>
  );
}

export default Loading;
