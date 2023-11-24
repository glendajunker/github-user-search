import { useState } from "react";
import Form from "./components/Form";
import UserComp from "./components/User";
import "./App.css";
import { User, githubUserResponseSchema } from "./types";
import * as RD from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/lib/function";

function App() {
    const API_URL = "https://api.github.com/users/";

    const [user, setUser] = useState<RD.RemoteData<Error, User>>(RD.initial);

    async function fetchUser(text: string) {
        setUser(RD.pending);

        try {
            const response = await fetch(API_URL + text);

            if (!response.ok) throw new Error(`Error! Status: ${response.status}`);

            const responseData: unknown = await response.json();
            const user: User = githubUserResponseSchema.parse(responseData);
            setUser(RD.success(user));
        } catch (error: unknown) {
            if (error instanceof Error) setUser(RD.failure(error));
            setUser(RD.failure(Error(String(error))));
        }
    }

    return (
        <div>
            <h1>GitHub User Search</h1>
            <Form onSubmit={fetchUser} />
            {pipe(
                user,
                RD.fold(
                    () => <></>,
                    () => <p>Loading...</p>,
                    (error) => <p>{error.message}</p>,
                    (data) => <UserComp user={data} />
                )
            )}
        </div>
    );
}

export default App;
