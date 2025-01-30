// Function to fetch APK details from JSON files
async function fetchAPKDetails() {
  try {
    const response = await fetch('content/app1.json');  // You can dynamically fetch based on ID
    const appData = await response.json();

    // Display the fetched APK details in the grid
    const container = document.getElementById('wallpaperContainer');
    const wallpaperBox = `
      <div class="wallpaper-box" data-tags="${appData.tags}">
        <img src="${appData.image}" alt="${appData.title}" class="wallpaper-image">
        <div class="content">
          <h2 class="title">${appData.title}</h2>
          <p class="description">${appData.description}</p>
          <a href="${appData.downloadLink}" target="_blank" class="download-btn">Download</a>
        </div>
      </div>
    `;
    container.innerHTML += wallpaperBox;
  } catch (error) {
    console.error("Error fetching APK details:", error);
  }
}

// Search functionality
function searchPosts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const posts = document.querySelectorAll('.wallpaper-box');
  posts.forEach(post => {
    const title = post.querySelector('.title').textContent.toLowerCase();
    const tags = post.dataset.tags.toLowerCase();
    if (title.includes(query) || tags.includes(query)) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// Toggle search box visibility
function toggleSearchBox(event) {
  if (event.target === document.getElementById("searchInput")) return;
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.classList.toggle('active');
}

// Event listener for the search input to trigger search
document.getElementById('searchInput').addEventListener('input', searchPosts);

// Fetch APK details when the page loads
fetchAPKDetails();
