const URL = '/api';

function fetchWithError(url, options) {
    return fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => {
                    throw json.error;
                });
            }
        });
}

export function getItems(options) {
    const showAll = options && options.showAll;
    const url = `${URL}/items${showAll ? '?show=all' : ''}`;
    return fetchWithError(url);
}

export function addItem(item) {
    const url = `${URL}/items`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    });
}

export function updateItem(item) {
    const url = `${URL}/items/${item.id}`;
    return fetchWithError(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    });
}

export function removeItem(id) {
    const url = `${URL}/items/${id}`;
    return fetchWithError(url, {
        method: 'DELETE'
    });
}