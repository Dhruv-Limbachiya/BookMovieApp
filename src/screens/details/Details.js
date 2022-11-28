import React from 'react'
import Header from "../../common/header/Header";

function Details(props) {
  return (
    <div>
      <Header showBookNow={true} movieId={props.match.params.id} history={props.history}/>
    </div>

  )
}

export default Details;
