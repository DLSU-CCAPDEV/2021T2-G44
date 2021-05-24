import request from '../utils/AxiosConfig';

export const SearchUser = async (searchQuery) => {
    try {
        const query = searchQuery.toLowerCase();

        // Search by name
        const results = await request.get('api/searchUser/' + query);

        return results.data;
    } catch (ex) {
        console.error(ex);
        return { success: false, errors: [{ msg: ex }]};
    }
    
};

export const SearchEvent = async (searchQuery) => {
    const query = searchQuery.toLowerCase();

    // Find by event name
    const results = await request.get('api/event', {
        params: {
            title: query,
        },
    });

    return results.data;
};
