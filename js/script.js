async function loadAPKs() {
    const apkGrid = document.getElementById("apkGrid");

    // List of APK JSON files in the 'content' folder
    const apkFiles = ["content/app1.json", "content/app2.json"];  // You can add more files here.

    for (let file of apkFiles) {
        const response = await fetch(file);
        const apkData = await response.json();

        const apkDiv = document.createElement("div");
        apkDiv.classList.add("apk-item");
        apkDiv.innerHTML = `
            <img src="${apkData.image}" alt="${apkData.title}">
            <h2>${apkData.title}</h2>
        `;

        // Open details page when clicking on an APK
        apkDiv.addEventListener("click", () => {
            window.location.href = `details.html?apk=${file}`;
        });

        apkGrid.appendChild(apkDiv);
    }
}

document.addEventListener("DOMContentLoaded", loadAPKs);
