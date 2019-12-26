export default (tokens) => tokens.reduce(
    (dateGroups, token) => {
        if (!dateGroups.length) {
            return [{
                date: token.date,
                tokens: [token]
            }];
        } else {
            const lastDateGroup = dateGroups[dateGroups.length - 1];
            if (lastDateGroup.date === token.date) {
                lastDateGroup.tokens.push(token);
                return dateGroups;
            } else {
                return dateGroups.concat({
                    date: token.date,
                    tokens: [token]
                });
            }
        }
    },
    []
);
