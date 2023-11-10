import { useState } from "react";
import Form from "./components/Form";
import UserComp from "./components/User";
import "./App.css";
import { User } from "./types";

function App() {
    const API_URL = "https://api.github.com/users/";
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    async function fetchUser(text: string) {
        setUser(null);
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(API_URL + text);

            // if (!response.ok) throw new Error(`Error! Status: ${response.status}`);

            const responseData = await response.json();

            if (responseData.message === "Not Found") {
                throw new Error("Error! No user found");
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
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h1>GitHub User Search</h1>
            <Form onSubmit={fetchUser} />
            {isLoading && <p>Loading...</p>}
            {user && <UserComp user={user} />}
            {error && <p>{error}</p>}
        </div>
    );
}

export default App;
