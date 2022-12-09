var create = (function () {
    const CLIENT_ID = '6dc1983dc35340d19a62a00846e9efee',
        CLIENT_SECRET = '299d0859973d465bb88ad12e00c367ae',
        // SCOPES = 'user-top-read',
        SCOPES = 'user-read-private%20user-read-email%20user-top-read',
        MYURI = window.location.origin + window.location.pathname;
    let linkBtn = null,
        linkTxt = null,
        authCode = '',
        authToken = '';

    window.addEventListener('load', async () => {
        const CURURL = new URL(window.location);

        linkBtn = document.getElementById('link-spotify');
        linkTxt = document.getElementById('link-spotify-text');
        authCode = CURURL.searchParams.get('code');

        linkBtn.onclick = linkSpotify;

        if (authCode) {
            linkTxt.innerText = 'Account Connected';
            getToken();
        }
    });

    const linkSpotify = () => {
        if (!authCode) {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&scope=${SCOPES}&redirect_uri=${MYURI}`;
        }
    }
    
    const getToken = async () => {
        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });
        const content = await res.json();
        authToken = content.access_token;
        console.log(content);

        let topRes = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        // let json = await topRes.json();
        // console.log(json)
    }

    return {};
})();