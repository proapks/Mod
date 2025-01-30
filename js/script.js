const bloggerFeedUrl = "https://gptmovie.blogspot.com/feeds/posts/default?alt=json";

async function fetchWebsiteDetails() {
    try {
        const response = await fetch(bloggerFeedUrl);
        const data = await response.json();
        const blogName = data.feed.title.$t;
        document.querySelector('h1').textContent = blogName;
        document.querySelector('footer a').textContent = blogName;
        document.querySelector('footer a').href = data.feed.link.find(link => link.rel === 'alternate').href;
    } catch (error) {
        console.error("Error fetching website details:", error);
    }
}

async function fetchWallpapers() {
    try {
        const response = await fetch(bloggerFeedUrl);
        const data = await response.json();
        const posts = data.feed.entry;
        const container = document.getElementById('wallpaperContainer');
        
        posts.forEach(post => {
            const title = post.title.$t;
            const content = post.content.$t;
            const tags = post.category ? post.category.map(cat => cat.term.toLowerCase()).join(", ") : "No Tags";
            const description = content.replace(/<[^>]+>/g, '').substring(0, 100) + "...";
            const imgRegex = /<img.*?src="(.*?)"/g;
            const imgMatches = [...content.matchAll(imgRegex)];
            const downloadLinkRegex = /<a.*?href="(.*?)".*?>/g;
            const downloadLinkMatches = [...content.matchAll(downloadLinkRegex)];

            imgMatches.forEach((imgMatch, index) => {
                let imageUrl = imgMatch[1];
                if (imageUrl.includes('s72-c')) {
                    imageUrl = imageUrl.replace('s72-c', 's2048');
                } else if (imageUrl.includes('s320')) {
                    imageUrl = imageUrl.replace('s320', 's2048');
                }
                const downloadLink = downloadLinkMatches[index] ? downloadLinkMatches[index][1] : "#";
                const wallpaperBox = `<div class="wallpaper-box" data-tags="${tags}">
                    <img src="${imageUrl}" alt="${title}" class="wallpaper-image">
                    <div class="content">
                        <h2 class="title">${title}</h2>
                        <p class="description">${description}</p>
                        <a href="${downloadLink}" target="_blank" class="download-btn">Download</a>
                    </div>
                </div>`;
                container.innerHTML += wallpaperBox;
            });
        });
    } catch (error) {
        console.error("Error fetching wallpapers:", error);
    }
}

function searchPosts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const posts = document.querySelectorAll('.wallpaper-box');
    posts.forEach(post => {
        const title = post.querySelector('.title').textContent.toLowerCase();
        const tags = post.dataset.tags;
        if (title.includes(query) || tags.includes(query)) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

function toggleSearchBox(event) {
    if (event.target === document.getElementById("searchInput")) return;
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.classList.toggle('active');
}

fetchWebsiteDetails();
fetchWallpapers();
