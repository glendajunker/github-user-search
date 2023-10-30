import { User } from "../types";

type UserProps = {
    user: User;
};

function UserComp({ user }: UserProps) {
    return (
        <div>
            <img src={user.avatarUrl} alt="" width="100" height="100" />
            <h2>{user.login}</h2>
            <p>Name: {user.name}</p>
            <p>Company: {user.company}</p>
            <p>Location: {user.location}</p>
            <a href={user.htmlUrl} target="_blank">
                GitHub Profile
            </a>
        </div>
    );
}

export default UserComp;
