<script>
const jsonFiles = ['content/app1.json', 'content/app2.json']; // List of JSON files for the APKs
const container = document.getElementById('wallpaperContainer');

// Function to fetch the content from each JSON file and display it
async function fetchAPKs() {
  for (let i = 0; i < jsonFiles.length; i++) {
    try {
      const response = await fetch(jsonFiles[i]);
      const data = await response.json();

      // Extract details from the JSON
      const { title, description, image, specifications, long_description, download_link } = data;

      // Create HTML structure for each APK
      const apkBox = `
        <div class="wallpaper-box">
          <img src="${image}" alt="${title}" class="wallpaper-image">
          <div class="content">
            <h2 class="title">${title}</h2>
            <p class="description">${description}</p>
            <div class="specifications">
              <p>Size: ${specifications.size}</p>
              <p>Version: ${specifications.version}</p>
              <p>Rating: ${specifications.rating}</p>
            </div>
            <p class="long-description">${long_description}</p>
            <a href="${download_link}" target="_blank" class="download-btn">Download</a>
          </div>
        </div>
      `;

      // Append the APK box to the container
      container.innerHTML += apkBox;
    } catch (error) {
      console.error('Error fetching APK data:', error);
    }
  }
}

// Call the function to load APK data
fetchAPKs();
</script>
