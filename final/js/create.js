var create = (function () {
    const CLIENT_ID = '6dc1983dc35340d19a62a00846e9efee',
        CLIENT_SECRET = '299d0859973d465bb88ad12e00c367ae',
        SCOPES = 'user-top-read',
        MYURI = window.location.origin + window.location.pathname;
    let linkBtn = null,
        linkTxt = null;

    window.addEventListener('load', async () => {
        const CURURL = new URL(window.location),
            authCode = CURURL.searchParams.get('code');

        linkBtn = document.getElementById('link-spotify');
        linkTxt = document.getElementById('link-spotify-text');

        if (authCode) {
            // Clear the authCode from the URL 
            window.history.replaceState({}, document.title, window.location.pathname);

            const token = await getToken(authCode);
            if (token) {
                linkTxt.innerText = 'Account Connected';
                let top = await getTopArtists(token);
                console.log(top);
            }
        } else {
            linkBtn.onclick = authorizeSpotify;
        }
    });

    const authorizeSpotify = () => {
        window.location = `https://accounts.spotify.com/authorize?` +
                            `client_id=${CLIENT_ID}&` +
                            `response_type=code&` +
                            `scope=${SCOPES}&` + 
                            `redirect_uri=${MYURI}`;
    }
    
    const getToken = async (authCode) => {
        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&` +
                    `code=${authCode}&` +
                    `redirect_uri=${MYURI}`
        });
        const tokenJSON = await res.json();
        return tokenJSON.access_token;
    }

    const getTopArtists = async (token) => {
        let artistRes = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return await artistRes.json();
    }

    return {};
})();