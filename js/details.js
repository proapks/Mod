// Fetch APK details from the corresponding JSON file
async function fetchAPKDetails() {
  // Get the app ID from the URL query string (e.g., ?id=app1)
  const urlParams = new URLSearchParams(window.location.search);
  const appId = urlParams.get('id');  // Get the app ID passed in the URL

  try {
    // Fetch the corresponding JSON file based on the app ID
    const response = await fetch(`content/${appId}.json`);
    const appData = await response.json();

    // Populate the details page with the APK information
    document.getElementById('apkTitle').textContent = appData.title;
    document.getElementById('apkImage').src = appData.image;
    document.getElementById('apkImage').alt = appData.title;
    document.getElementById('apkDescription').textContent = appData.description;
    document.getElementById('apkSpecs').innerHTML = `
      <strong>Size:</strong> ${appData.specifications.size} <br>
      <strong>Version:</strong> ${appData.specifications.version} <br>
      <strong>Category:</strong> ${appData.specifications.category} <br>
    `;
    document.getElementById('apkLongDescription').innerHTML = appData.longDescription;
    document.getElementById('downloadBtn').href = appData.downloadLink;

  } catch (error) {
    console.error("Error fetching APK details:", error);
  }
}

// Call the function to fetch and display APK details when the page loads
fetchAPKDetails();
