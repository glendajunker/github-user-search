function User({ user }) {
    const { avatar_url, company, html_url, location, login, name } = user;

    return (
        <div>
            <img src={avatar_url} alt="" width="100" height="100" />
            <h2>{login}</h2>
            <p>Name: {name}</p>
            <p>Company: {company}</p>
            <p>Location: {location}</p>
            <a href={html_url} target="_blank">
                GitHub Profile
            </a>
        </div>
    );
}

export default User;
