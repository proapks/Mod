async function loadAPKDetails() {
    const apkContainer = document.getElementById("apkContainer");

    // JSON Files (add your APK files here)
    const apkFiles = ["app1.json", "app2.json"]; // Add your JSON file names here

    for (let apkFile of apkFiles) {
        const response = await fetch(`content/${apkFile}`);
        const apkData = await response.json();

        const apkItem = document.createElement("div");
        apkItem.classList.add("apk-item");
        apkItem.dataset.index = apkFiles.indexOf(apkFile); // Store index for link

        // Create link to the details page
        const detailsLink = document.createElement("a");
        detailsLink.href = `details.html?apk=${apkFiles.indexOf(apkFile)}`; // Pass index as URL parameter
        detailsLink.innerHTML = `
            <img src="${apkData.image}" alt="${apkData.title}" class="apk-image">
            <div class="apk-details">
                <h3 class="apk-title">${apkData.title}</h3>
                <p class="apk-size">${apkData.specifications.Size}</p>
                <p class="apk-rating">${apkData.specifications.Rating}</p>
            </div>
        `;

        apkItem.appendChild(detailsLink);
        apkContainer.appendChild(apkItem);
    }
}

document.addEventListener("DOMContentLoaded", loadAPKDetails);
