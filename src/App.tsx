import { useState } from "react";
import Form from "./components/Form";
import UserComp from "./components/User";
import "./App.css";
import { User } from "./types";

function App() {
    const API_URL = "https://api.github.com/users/";
    const [user, setUser] = useState<User | null>(null);

    async function fetchUser(text: string) {
        try {
            const response = await fetch(API_URL + text);
            const responseData = await response.json();

            if (responseData.message === "Not Found") {
                setUser(null);
            } else {
                const user: User = {
                    avatarUrl: responseData.avatar_url,
                    company: responseData.company,
                    htmlUrl: responseData.html_url,
                    login: responseData.login,
                    location: responseData.location,
                    name: responseData.name,
                };
                setUser(user);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>GitHub User Search</h1>
            <Form onSubmit={fetchUser} />
            {user && <UserComp user={user} />}
        </div>
    );
}

export default App;
