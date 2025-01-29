document.addEventListener("DOMContentLoaded", function () {
    const apkList = document.getElementById("apk-list");
    const searchBox = document.getElementById("search-box");

    // Fetch APK Data
    fetch("content/apps.json")
        .then(response => response.json())
        .then(data => {
            displayAPKs(data);
        })
        .catch(error => console.error("Error loading APKs:", error));

    // Display APKs Function
    function displayAPKs(apks) {
        apkList.innerHTML = "";
        apks.forEach(apk => {
            const apkDiv = document.createElement("div");
            apkDiv.classList.add("apk-container");
            apkDiv.innerHTML = `
                <img src="${apk.image}" alt="${apk.title}">
                <div class="apk-info">
                    <h2>${apk.title}</h2>
                    <p>${apk.size} | ⭐ ${apk.rating}</p>
                </div>
            `;
            apkDiv.addEventListener("click", () => {
                window.open(`details.html?app=${apk.id}`, "_blank");
            });
            apkList.appendChild(apkDiv);
        });
    }

    // Search Functionality
    searchBox.addEventListener("input", function () {
        const query = searchBox.value.toLowerCase();
        fetch("content/apps.json")
            .then(response => response.json())
            .then(data => {
                const filteredAPKs = data.filter(apk => apk.title.toLowerCase().includes(query));
                displayAPKs(filteredAPKs);
            });
    });
});
