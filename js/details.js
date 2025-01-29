document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const apkFile = urlParams.get('app');
    const detailsContainer = document.getElementById('apk-details');

    if (!apkFile) {
        detailsContainer.innerHTML = "<p>APK not found.</p>";
        return;
    }

    fetch(`content/${apkFile}`)
        .then(response => response.json())
        .then(data => {
            detailsContainer.innerHTML = `
                <img src="${data.image}" alt="${data.title}">
                <h2>${data.title}</h2>
                <p>${data.short_description}</p>
                <div class="specifications">
                    <p><strong>Version:</strong> ${data.specifications.Version}</p>
                    <p><strong>Size:</strong> ${data.specifications.Size}</p>
                    <p><strong>Developer:</strong> ${data.specifications.Developer}</p>
                    <p><strong>Last Updated:</strong> ${data.specifications['Last Updated']}</p>
                </div>
                <a href="${data.download}" class="download-button">Download</a>
            `;
        })
        .catch(error => console.error('Error fetching APK details:', error));
});
