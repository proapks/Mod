const githubContentUrl = "https://raw.githubusercontent.com/<username>/<repository>/main/content/";

async function fetchAPKDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const apkTitle = urlParams.get('apk');  // Get the title from the query string
    
    try {
        const response = await fetch(githubContentUrl + apkTitle + ".json");
        const data = await response.json();
        
        // Display the APK details on the page
        document.getElementById('apkTitle').textContent = data.title;
        document.getElementById('apkImage').src = data.image;
        document.getElementById('apkDescription').textContent = data.description;
        document.getElementById('apkSize').textContent = "Size: " + data.specifications.size;
        document.getElementById('apkVersion').textContent = "Version: " + data.specifications.version;
        document.getElementById('apkDeveloper').textContent = "Developer: " + data.specifications.developer;
        document.getElementById('apkLongDescription').innerHTML = data.long_description;
        document.getElementById('downloadBtn').href = data.download_link;
    } catch (error) {
        console.error("Error fetching APK details:", error);
    }
}

fetchAPKDetails();
