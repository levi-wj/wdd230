var create = (function () {
    const CLIENT_ID = '6dc1983dc35340d19a62a00846e9efee',
        CLIENT_SECRET = '299d0859973d465bb88ad12e00c367ae',
        SCOPES = 'user-top-read',
        REDIRECT = 'https://levi-wj.github.io/wdd230/final/create.html',
        ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3';
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
        window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&scope=${SCOPES}&redirect_uri=${REDIRECT}`;
    }
    
    const getToken = async () => {
        fetch(`https://accounts.spotify.com/api/token?code=${authCode}&redirect_uri=${REDIRECT}&grant_type=authorization_code`, { mode: 'no-cors'})
            .then(res => {
                console.log(res)
            });
    }

    return {};
})();