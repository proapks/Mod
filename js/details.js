document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const appName = urlParams.get("app");

    fetch(`content/${appName}.json`)
        .then(response => response.json())
        .then(data => {
            // Set APK details
            document.getElementById("apkTitle").innerText = data.title;
            document.getElementById("apkShortDescription").innerText = data.short_description;
            document.getElementById("apkImage").src = data.image;

            // Set specifications
            const specsList = document.getElementById("apkSpecifications");
            for (const [key, value] of Object.entries(data.specifications)) {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${key}: </strong>${value}`;
                specsList.appendChild(li);
            }

            // Set long description
            document.getElementById("longDescriptionTitle").innerText = data.long_description.h1;
            document.getElementById("apkLongDescription").innerText = data.long_description.content;

            // Set download link
            document.getElementById("apkDownloadButton").href = data.download;
        })
        .catch(error => {
            console.error('Error loading APK details:', error);
        });
});
