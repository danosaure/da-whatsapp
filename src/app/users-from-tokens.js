export default (tokens) => tokens.reduce(
    (users, byDate) => byDate.logs.reduce(
        (users, byUser) => {
            if (users.indexOf(byUser.user) === -1) {
                return users.concat(byUser.user).sort();
            } else {
                return users;
            }
        },
        users
    ),
    []
);
