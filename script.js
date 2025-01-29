async function loadAPKs() {
    const apkListDiv = document.getElementById("apkList");

    // Yahan multiple APK JSON files ka array daal do
    const apkFiles = ["content/app1.json"]; 

    for (let file of apkFiles) {
        const response = await fetch(file);
        const apkData = await response.json();

        const apkDiv = document.createElement("div");
        apkDiv.classList.add("apk-item");

        apkDiv.innerHTML = `
            <img src="${apkData.image}" alt="${apkData.title}">
            <h2>${apkData.title}</h2>
            <p>${apkData.description}</p>
            <a class="download-btn" href="${apkData.download}" download>Download</a>
        `;

        apkListDiv.appendChild(apkDiv);
    }
}

// Page load hone par APKs load karna
document.addEventListener("DOMContentLoaded", loadAPKs);
