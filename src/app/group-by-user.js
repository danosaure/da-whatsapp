export default (tokens) => tokens.reduce(
    (userGroups, token) => {
        if (!userGroups.length) {
            return [{
                user: token.user,
                tokens: [ token ]
            }];
        } else {
            const lastUserGroup = userGroups[userGroups.length - 1];
            if (lastUserGroup.user === token.user) {
                lastUserGroup.tokens.push(token);
                return userGroups;
            } else {
                return userGroups.concat({
                    user: token.user,
                    tokens: [ token ]
                });
            }
        }
    },
    []
);
