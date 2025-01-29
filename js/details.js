document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const apkFile = params.get("apk");

    if (!apkFile) {
        document.getElementById("apk-details").innerHTML = "<p>APK not found!</p>";
        return;
    }

    fetch(apkFile)
        .then(response => response.json())
        .then(data => {
            document.getElementById("apk-details").innerHTML = `
                <img src="${data.image}" alt="${data.title}">
                <h1>${data.title}</h1>
                <p class="short-description">${data.short_description}</p>

                <div class="specs">
                    <p><strong>Size:</strong> ${data.size}</p>
                    <p><strong>Rating:</strong> ⭐ ${data.rating}</p>
                    <p><strong>Version:</strong> ${data.version}</p>
                </div>

                <p class="long-description">${data.long_description}</p>

                <a href="${data.download_link}" class="download-btn">Download</a>
            `;
        })
        .catch(error => console.error("Error loading APK details:", error));
});
