let lastVisited = localStorage.getItem('lastVisited'),
    diff = Math.floor((new Date() - new Date(lastVisited)) / 1000 / 60 / 60 / 24),
    lastVisitedEle = document.getElementById('last-visited');

lastVisitedEle.innerText = `Last visited this page: ${diff} days ago`;
localStorage.setItem('lastVisited', new Date());