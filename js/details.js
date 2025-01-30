// URL of your JSON data
const contentUrl = "content/";

// Function to fetch and display the APK details from the JSON files
async function fetchPostDetails(postId) {
  try {
    const response = await fetch(contentUrl + postId + ".json");  // Fetching the specific JSON file (e.g., app1.json)
    if (!response.ok) {
      console.error("Error fetching the APK details");
      return;
    }

    const data = await response.json();
    console.log("Fetched APK Details:", data);

    // Populate the details page with the fetched data
    const title = data.title;
    const description = data.description;
    const image = data.image;
    const downloadLink = data.downloadLink;
    const specifications = data.specifications || "No specifications available";
    const longDescription = data.longDescription || "No additional details available";

    // Inserting data into HTML elements
    document.querySelector('#apkImage').src = image;
    document.querySelector('#apkTitle').textContent = title;
    document.querySelector('#apkDescription').textContent = description;
    document.querySelector('#apkDownloadLink').href = downloadLink;
    document.querySelector('#specifications').innerHTML = specifications;
    document.querySelector('#longDescription').innerHTML = longDescription;

  } catch (error) {
    console.error("Error fetching APK details:", error);
  }
}

// Function to filter the long description or specifications based on the search input
function searchInDetails() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const description = document.querySelector('#apkDescription').textContent.toLowerCase();
  const specifications = document.querySelector('#specifications').textContent.toLowerCase();
  const longDescription = document.querySelector('#longDescription').textContent.toLowerCase();

  // Highlight the matching content in long description or specifications
  if (description.includes(query)) {
    document.querySelector('#apkDescription').style.backgroundColor = 'yellow';
  } else {
    document.querySelector('#apkDescription').style.backgroundColor = '';
  }

  if (specifications.includes(query)) {
    document.querySelector('#specifications').style.backgroundColor = 'yellow';
  } else {
    document.querySelector('#specifications').style.backgroundColor = '';
  }

  if (longDescription.includes(query)) {
    document.querySelector('#longDescription').style.backgroundColor = 'yellow';
  } else {
    document.querySelector('#longDescription').style.backgroundColor = '';
  }
}

// Call the function to fetch APK details when the page loads
const postId = new URLSearchParams(window.location.search).get('id');  // Assuming you're passing the ID via URL
fetchPostDetails(postId);

// Search function call on input change
document.getElementById('searchInput').addEventListener('input', searchInDetails);
