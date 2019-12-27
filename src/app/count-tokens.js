export default (tokens) => tokens.reduce(
    (count, dateGroup) => dateGroup.logs.reduce(
        (count, userGroup) => count + userGroup.tokens.length,
        count
    ),
    0
);
