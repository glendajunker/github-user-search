import { useState } from "react";

type FormProps = {
    onSubmit: (text: string) => void;
};

function Form(props: FormProps) {
    const [searchText, setSearchText] = useState("");

    function changeSearchText(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(e.currentTarget.value);
    }

    function handleSubmit(e: React.FormEvent) {
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
