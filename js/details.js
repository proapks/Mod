// Function to get URL parameters
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('apk'); // Get 'apk' parameter
}

// Function to load APK details from JSON
async function loadAPKDetail() {
    const apkIndex = getQueryParams(); // Get the APK index from URL
    const apkFiles = ["app1.json", "app2.json"]; // Your JSON files here
    const apkFile = apkFiles[apkIndex];

    const response = await fetch(`content/${apkFile}`);
    const apkData = await response.json();

    const detailsContainer = document.querySelector(".apk-details-container");

    detailsContainer.innerHTML = `
        <img src="${apkData.image}" alt="${apkData.title}" class="apk-image">
        <h2 class="apk-title">${apkData.title}</h2>
        <p><strong>Size:</strong> ${apkData.specifications.Size}</p>
        <p><strong>Rating:</strong> ${apkData.specifications.Rating}</p>
        <p><strong>Version:</strong> ${apkData.specifications.Version}</p>
        <p><strong>Developer:</strong> ${apkData.specifications.Developer}</p>
        <p><strong>Last Updated:</strong> ${apkData.specifications["Last Updated"]}</p>
        <h3>${apkData.long_description.h1}</h3>
        <h4>${apkData.long_description.h2}</h4>
        <p>${apkData.long_description.content}</p>
        <a href="${apkData.download}" class="download-btn">Download</a>
    `;
}

document.addEventListener("DOMContentLoaded", loadAPKDetail);
