// URL of your JSON data
const contentUrl = "content/";

// Function to fetch and display APK data from the JSON files
async function fetchPosts() {
  try {
    const response = await fetch(contentUrl + "app1.json");  // Assuming app1.json is the first JSON file
    if (!response.ok) {
      console.error("Error fetching the JSON data");
      return;
    }

    const data = await response.json();
    console.log("Fetched APK Data:", data);

    const container = document.getElementById('wallpaperContainer');
    container.innerHTML = '';  // Clear the container before adding new posts

    data.forEach(post => {
      const title = post.title;
      const description = post.description;
      const image = post.image;
      const downloadLink = post.downloadLink;
      const tags = post.tags ? post.tags.toLowerCase() : '';

      // Create HTML for each post
      const wallpaperBox = `
        <div class="wallpaper-box" data-title="${title.toLowerCase()}" data-tags="${tags}">
          <img src="${image}" alt="${title}" class="wallpaper-image">
          <div class="content">
            <h2 class="title">${title}</h2>
            <p class="description">${description}</p>
            <a href="${downloadLink}" target="_blank" class="download-btn">Download</a>
          </div>
        </div>
      `;

      // Append to container
      container.innerHTML += wallpaperBox;
    });

  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Function to filter posts based on search input
function searchPosts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const posts = document.querySelectorAll('.wallpaper-box');

  posts.forEach(post => {
    const title = post.dataset.title;
    const tags = post.dataset.tags;

    if (title.includes(query) || tags.includes(query)) {
      post.style.display = 'flex';  // Show post if it matches search query
    } else {
      post.style.display = 'none';  // Hide post if it doesn't match search query
    }
  });
}

// Call the function when the page loads
fetchPosts();
