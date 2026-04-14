import React from "react"
import SeccionResults from "../../components/SeccionResults/SeccionResults"

function Results(props) {
    const query = props.match.params.query
    const tipo = props.match.params.tipo

    return (
        <SeccionResults query={query} tipo={tipo} />
    )
}

export default Results
