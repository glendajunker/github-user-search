import { useState } from "react";
import Form from "./components/form";
import User from "./components/User";
import "./App.css";

function App() {
    const API_URL = "https://api.github.com/users/";
    const [user, setUser] = useState(null);

    async function fetchUser(text) {
        try {
            const response = await fetch(API_URL + text);
            const responseData = await response.json();

            if (responseData.message === "Not Found") return;
            setUser(responseData);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>GitHub User Search</h1>
            <Form onSubmit={fetchUser} />
            {user && <User user={user} />}
        </div>
    );
}

export default App;
