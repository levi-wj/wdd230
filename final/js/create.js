(function () {
    const CLIENT_ID = '6dc1983dc35340d19a62a00846e9efee',
        CLIENT_SECRET = '299d0859973d465bb88ad12e00c367ae',
        SCOPES = 'user-top-read',
        MYURI = window.location.origin + window.location.pathname;
    let topArtistsData = null,
        topTracksData = null,
        canvasContainerRect = null;
        curType = 'artists',
        curStickerBG = 0;

    window.addEventListener('load', async () => {
        const CURURL = new URL(window.location),
            authCode = CURURL.searchParams.get('code'),
            linkBtn = document.getElementById('link-spotify'),
            linkTxt = document.getElementById('link-spotify-text'),
            buyBtn = document.getElementById('buy-button'),
            artistsRadio = document.getElementById('type-radio-artists'),
            tracksRadio = document.getElementById('type-radio-tracks'),
            stickerThemes = document.querySelectorAll('.create_theme-radio'),
            stickerCanvas = document.getElementById('create-canvas'),
            canvasCtx = stickerCanvas.getContext('2d'),
            canvasContainer = document.getElementById('create-canvas-container');

        // stickerCanvas.imageSmoothingEnabled = false;
        resizeCanvas(stickerCanvas, canvasContainer);

        if (authCode) {
            // Clear the authCode from the URL 
            window.history.replaceState({}, document.title, window.location.pathname);

            const token = await getToken(authCode);
            if (token) {
                linkTxt.innerText = 'Account Connected';
                topArtistsData = await getUserTop(token, 'artists');
                topTracksData = await getUserTop(token, 'tracks');

                // Set up onclicks
                artistsRadio.onclick = () => { changeStickerType(canvasCtx, 'artists') };
                tracksRadio.onclick = () => { changeStickerType(canvasCtx, 'tracks') };
                for (i in stickerThemes) {
                    let curIndex = i;
                    stickerThemes[i].onclick = () => { changeStickerTheme(canvasCtx, curIndex) };
                }
                buyBtn.onclick = () => { window.location = 'checkout.html'; };

                renderSticker(canvasCtx);

                window.addEventListener('resize', e => {
                    resizeCanvas(stickerCanvas, canvasContainer);
                    renderSticker(canvasCtx);
                });
            }
        } else {
            linkBtn.onclick = authorizeSpotify;
            buyBtn.onclick = () => alert('No sticker has been created!');
        }
    });

    const resizeCanvas = (canvas, container) => {
        canvasContainerRect = container.getBoundingClientRect();

        // Set the width and height of the canvas to fill its container without distortion
        canvas.setAttribute('width', canvasContainerRect.width);
        canvas.setAttribute('height', canvasContainerRect.height);
    }

    const authorizeSpotify = () => {
        window.location = `https://accounts.spotify.com/authorize?` +
                            `client_id=${CLIENT_ID}&` +
                            `response_type=code&` +
                            `scope=${SCOPES}&` + 
                            `redirect_uri=${MYURI}` +
                            `&show_dialog=true`;
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

    const getUserTop = async (token, type) => {
        let topRes = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=medium_term&limit=3`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return await topRes.json();
    }

    const renderSticker = (ctx) => {
        const topData = (curType === 'artists') ? topArtistsData : topTracksData,
            topImgs = getImagesFromAPIData(topData),
            imgSize = 160,
            imgGap = 10,
            bgImgWidth = 534,
            bgImgHeight = 250,
            imgyoffset = 15;
        let imgxoffset = -170,
            bgyoffset = 50;
            bgImg = new Image();

        bgImg.src = `img/stickerbg${curStickerBG}.webp`;
        bgImg.onload = () => {
            ctx.drawImage(bgImg, centerImg(bgImgWidth), bgyoffset, bgImgWidth, bgImgHeight);

            // Draw images of top tracks or artists
            for (i in topImgs) {
                let imgEle = new Image();
                imgEle.src = topImgs[i];
                imgEle.onload = () => {
                    ctx.drawImage(imgEle, centerImg(imgSize) + imgxoffset, imgyoffset + bgyoffset, imgSize, imgSize);
                    imgxoffset += (imgSize + imgGap);
                }
            }
        }
    }

    const centerImg = (imgSize) => {
        return (canvasContainerRect.width / 2) - (imgSize / 2);
    }

    const getImagesFromAPIData = (apiData) => {
        if (apiData.items.length && apiData.items[0].album) {
            // Tracks
            return apiData.items.map(e => e.album.images[1].url);
        } else {
            // Artists
            return apiData.items.map(e => e.images[1].url);
        }
    }

    const changeStickerType = (ctx, type) => {
        curType = type;
        renderSticker(ctx);
    }

    const changeStickerTheme = (ctx, index) => {
        curStickerBG = index;
        renderSticker(ctx);
    }
})();