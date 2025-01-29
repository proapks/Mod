async function loadAPKs() {
    const apkGrid = document.getElementById("apkGrid");

    // Example: List of APKs (JSON files in 'content' folder)
    const apkFiles = ["../content/app1.json", "../content/app2.json"];

    for (let file of apkFiles) {
        const response = await fetch(file);
        const apkData = await response.json();

        const apkDiv = document.createElement("div");
        apkDiv.classList.add("apk-item");
        apkDiv.innerHTML = `
            <img src="${apkData.image}" alt="${apkData.title}">
            <h2>${apkData.title}</h2>
            <p>${apkData.short_description}</p>
        `;

        // Open details page with query parameter
        apkDiv.addEventListener("click", () => {
            window.location.href = `details.html?apk=${file}`;
        });

        apkGrid.appendChild(apkDiv);
    }
}

document.addEventListener("DOMContentLoaded", loadAPKs);
