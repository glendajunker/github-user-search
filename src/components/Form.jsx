import { useState } from "react";

function Form(props) {
    const [searchText, setSearchText] = useState("");

    function changeSearchText(e) {
        setSearchText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(searchText);
        setSearchText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={searchText} onChange={changeSearchText} />
            <button type="submit">Search</button>
        </form>
    );
}

export default Form;
