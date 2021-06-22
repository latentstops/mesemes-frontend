export let baseUrl = 'https://mesemes.com';
export const createKeyPair = async () => request(  'createKeyPair' );
export const createMessage = async data => request(  'createMessage', data);
export const getPrivateMessage = async data => request( 'getPrivateMessage', data);
export const getMessages = async (data) => request( 'getMessages', data );


async function request( path, data ){
    const url = `${baseUrl}/${path}`;
    const res = await fetch(url, {
        headers: {
            'content-type': 'application/json'
        },
        method: data ? 'post' : 'get',
        body: JSON.stringify( data )
    });

    return res.clone().json().catch( () => res.text() );
}
