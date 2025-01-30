// URL of your JSON data
const contentUrl = "content/";

// Function to fetch and display APK data from the JSON files
async function fetchPosts() {
  try {
    // Example: Fetching app1.json (You can add more files if needed)
    const response = await fetch(contentUrl + "app1.json");  // Assuming app1.json is the first JSON file
    if (!response.ok) {
      console.error("Error fetching the JSON data");
      return;
    }
    
    const data = await response.json();
    console.log("Fetched APK Data:", data);  // Debugging step: check if data is fetched properly

    const container = document.getElementById('wallpaperContainer');
    // Ensure container exists before inserting posts
    if (!container) {
      console.error("Container not found");
      return;
    }

    // Create a wallpaper box for each post (example uses data from JSON)
    const title = data.title;
    const description = data.description;
    const image = data.image;
    const downloadLink = data.downloadLink;

    const wallpaperBox = `
      <div class="wallpaper-box">
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

  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Call the function to fetch posts when the page loads
fetchPosts();
