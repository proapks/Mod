document.addEventListener("DOMContentLoaded", function () {
    const apkDetailsDiv = document.getElementById("apk-details");

    // URL से APK ID निकालो
    const urlParams = new URLSearchParams(window.location.search);
    const apkId = urlParams.get("app");

    if (!apkId) {
        apkDetailsDiv.innerHTML = "<p>APK not found!</p>";
        return;
    }

    // JSON फाइल लोड करो
    fetch(`content/${apkId}.json`)
        .then(response => response.json())
        .then(apk => {
            apkDetailsDiv.innerHTML = `
                <h1>${apk.title}</h1>
                <img src="${apk.image}" alt="${apk.title}">
                <p><strong>Size:</strong> ${apk.size}</p>
                <p><strong>Rating:</strong> ⭐ ${apk.rating}</p>
                <p><strong>Version:</strong> ${apk.version}</p>
                <p><strong>Description:</strong> ${apk.short_description}</p>
                <p>${apk.long_description}</p>
                <a href="${apk.download_link}" class="download-btn">Download</a>
            `;
        })
        .catch(error => {
            apkDetailsDiv.innerHTML = "<p>Error loading APK details.</p>";
            console.error("Error:", error);
        });
});
