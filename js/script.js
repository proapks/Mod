async function loadAPKDetails() {
    const apkContainer = document.getElementById("apkContainer");

    // JSON Files
    const apkFiles = ["app1.json", "app2.json"]; // Add your JSON file names here

    for (let apkFile of apkFiles) {
        const response = await fetch(`content/${apkFile}`);
        const apkData = await response.json();

        const apkItem = document.createElement("div");
        apkItem.classList.add("apk-item");
        apkItem.dataset.index = apkFiles.indexOf(apkFile); // Store index for modal fetch

        apkItem.innerHTML = `
            <img src="${apkData.image}" alt="${apkData.title}" class="apk-image">
            <div class="apk-details">
                <h3 class="apk-title">${apkData.title}</h3>
                <p class="apk-size">${apkData.specifications.Size}</p>
                <p class="apk-rating">${apkData.specifications.Rating}</p>
            </div>
        `;
        
        // Add event listener to open modal on click
        apkItem.addEventListener("click", function() {
            openModal(apkData);
        });

        apkContainer.appendChild(apkItem);
    }
}

// Function to open the modal
function openModal(apkData) {
    const modal = document.getElementById("apkModal");
    const modalDetails = document.getElementById("modalDetails");

    modalDetails.innerHTML = `
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

    modal.style.display = "block";
}

// Close modal
document.getElementById("closeBtn").addEventListener("click", function() {
    document.getElementById("apkModal").style.display = "none";
});

// Close modal if clicked outside
window.onclick = function(event) {
    const modal = document.getElementById("apkModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", loadAPKDetails);
