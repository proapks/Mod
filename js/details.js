async function loadAPKDetails() {
    // Get the file name from the query string
    const params = new URLSearchParams(window.location.search);
    const apkFile = params.get("apk");

    if (!apkFile) return;

    const response = await fetch(apkFile);
    const apkData = await response.json();

    const detailsDiv = document.getElementById("apkDetails");
    detailsDiv.innerHTML = `
        <h1>${apkData.title}</h1>
        <img src="${apkData.image}" alt="${apkData.title}">
        <p>${apkData.short_description}</p>

        <h2>Specifications</h2>
        <ul>
            ${Object.entries(apkData.specifications).map(([key, value]) => `<li><b>${key}:</b> ${value}</li>`).join("")}
        </ul>

        <h1>${apkData.long_description.h1}</h1>
        <h2>${apkData.long_description.h2}</h2>
        <p>${apkData.long_description.content}</p>

        <a class="download-btn" href="${apkData.download}" download>Download</a>
    `;
}

document.addEventListener("DOMContentLoaded", loadAPKDetails);
