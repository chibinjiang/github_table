function get(url, params, callback){
    let _url = new URL(url);
    Object.keys(params).forEach(key => _url.searchParams.append(key, params[key]));
    fetch(_url)
        .then(response => (response.json()))
        .then((responseData) => {
            callback(responseData);
        });
}


function convertDatetime(iso_time){
    return iso_time ? iso_time.split(" ")[0] : '';
}


function post(url, data, callback) {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            callback(responseData);
        });
}


const Util = {
    get,
    post,
    convertDatetime
};

export default Util;
