export const handler = async (event) => {
    console.log("Test action added");
    console.log("New Value added")
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
