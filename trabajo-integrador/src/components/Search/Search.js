import React from "react"
import "./Search.css"
function Search(){
    return(
    <React.Fragment>
    <form className="search-form" action="results.html" method="get">
        <input type="text" className="" name="searchData" placeholder="Buscar..." value=""/>
        <button type="submit" className="btn btn-success btn-sm">Buscar</button>
    </form>
    </React.Fragment>
    )
}

export default Search;