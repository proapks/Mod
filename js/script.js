async function loadAPKDetails() {
    const apkContainer = document.getElementById("apkContainer");

    // File names of JSON files
    const apkFiles = ["app1.json", "app2.json"];  // Add your JSON files here

    for (let apkFile of apkFiles) {
        const response = await fetch(`content/${apkFile}`);
        const apkData = await response.json();

        const apkItem = document.createElement("div");
        apkItem.classList.add("apk-item");

        apkItem.innerHTML = `
            <img src="${apkData.image}" alt="${apkData.title}" class="apk-image">
            <div class="apk-details">
                <h3 class="apk-title">${apkData.title}</h3>
                <p class="apk-size">${apkData.specifications.Size}</p>
                <p class="apk-rating">${apkData.specifications.Rating}</p>
            </div>
        `;
        
        apkContainer.appendChild(apkItem);
    }
}

document.addEventListener("DOMContentLoaded", loadAPKDetails);
