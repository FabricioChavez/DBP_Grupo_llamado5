
import React from "react";


function MangaList(props){

return(
<div className="MangaList">

<h1> API flask proof </h1>
{props.manga && props.manga.map(manga=>{

    return (
    <div key ={manga.id}>
        <img src={manga.link} id={manga.id}/>
    <h2>{manga.nombre}</h2>
    </div>

    )
})}



</div>
);
}

export default MangaList