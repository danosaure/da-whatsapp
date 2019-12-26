import groupByDate from './group-by-date';
import groupByUser from './group-by-user';

const PARTS_REGEXP = /^\[(\d+\/\d+\/\d+), (\d+:\d+:\d+ ..)\] (.*):\s+(.*)/;

export default (chat) => {
    const tokens = chat.split('\n').reduce(
        (tokens, line) => {
            const match = line.match(PARTS_REGEXP);
            if (match) {
                return tokens.concat({
                    date: match[1],
                    time: match[2],
                    user: match[3],
                    message: match[4].trim()
                });
            } else {
                const last = tokens[tokens.length - 1];
                last.message = [last.message, line].join('\n');
                return tokens;
            }
        },
        []
    );

    const dateGroups = groupByDate(tokens);

    return dateGroups.map((dateGroup) => ({
        date: dateGroup.date,
        logs: groupByUser(dateGroup.tokens)
    }));
};
