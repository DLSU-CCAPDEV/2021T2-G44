import userDB from "../placeholderData/users.json";
import eventDB from "../placeholderData/events.json";

// Email RegExp taken from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SearchUser = async (searchQuery) => {
    const query = searchQuery.toLowerCase();

    // Check if the query is an email address
    if (emailRegEx.test(query)) {
        // Search by email
        const results = userDB.filter((user) => {
            const index = user.email.toLowerCase(query);
            return index === -1 ? false : true;
        });

        return results;
    } else {
        // Search by name
        const results = userDB.filter((user) => {
            const name = `${user.firstName} ${user.lastName}`.toLowerCase();
            const index = name.search(query);
            return index === -1 ? false : true;
        });

        return results;
    }
};

export const SearchEvent = async (searchQuery) => {
    const query = searchQuery.toLowerCase();

    // Find by event name
    const results = eventDB.filter((event) => {
        return event.title.toLowerCase().search(query) !== -1;
    });

    console.log("Results from controller:");
    console.log(results);

    return results;
};
