const githubContentUrl = "https://raw.githubusercontent.com/<username>/<repository>/main/content/";

async function fetchAPKs() {
    try {
        const response = await fetch(githubContentUrl + "app1.json");
        const data = await response.json();
        const container = document.getElementById('apkContainer');
        const apkBox = `
            <div class="apk-box">
                <img src="${data.image}" alt="${data.title}" class="apk-image">
                <div class="content">
                    <h2 class="title">${data.title}</h2>
                    <p class="description">${data.description}</p>
                    <p class="size">Size: ${data.specifications.size}</p>
                    <a href="${data.download_link}" target="_blank" class="download-btn">Download</a>
                </div>
            </div>
        `;
        container.innerHTML += apkBox;
    } catch (error) {
        console.error("Error fetching APK details:", error);
    }
}

function searchPosts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const posts = document.querySelectorAll('.apk-box');
    posts.forEach(post => {
        const title = post.querySelector('.title').textContent.toLowerCase();
        if (title.includes(query)) {
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

fetchAPKs();
