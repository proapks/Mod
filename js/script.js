document.addEventListener("DOMContentLoaded", function () {
    const apkList = document.getElementById("apk-list");
    const searchInput = document.getElementById("search-input");

    let allAPKs = []; // Store all APKs for filtering

    // Fetch APK Data
    fetch("content/apps.json")
        .then(response => response.json())
        .then(data => {
            allAPKs = data; // Store data globally
            displayAPKs(allAPKs); // Show all APKs initially
        })
        .catch(error => console.error("Error loading APKs:", error));

    // Function to Display APKs
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

    // Function to Filter APKs Live
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        const filteredAPKs = allAPKs.filter(apk => apk.title.toLowerCase().includes(query));
        displayAPKs(filteredAPKs);
    });
});
