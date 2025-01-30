document.addEventListener("DOMContentLoaded", function () {
    const apkList = document.getElementById("apk-list");
    const searchInput = document.getElementById("search-input");

    let allAPKs = []; // Store all APKs for filtering

    // Automatically fetch all JSON files from 'content' folder
    async function loadAPKData() {
        try {
            const response = await fetch("content/apk-list.json"); // JSON file that stores all APK file names
            const apkFiles = await response.json();
            allAPKs = [];

            for (let file of apkFiles) {
                try {
                    const res = await fetch(`content/${file}`);
                    const apkData = await res.json();
                    allAPKs.push(apkData);
                } catch (error) {
                    console.error(`Error loading ${file}:`, error);
                }
            }
            displayAPKs(allAPKs);
        } catch (error) {
            console.error("Error fetching APK list:", error);
        }
    }

    // Function to display APKs
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
                window.open(`details.html?app=${apk.title}`, "_blank");
            });
            apkList.appendChild(apkDiv);
        });
    }

    // Live Search Function
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        const filteredAPKs = allAPKs.filter(apk => 
            apk.title.toLowerCase().includes(query)
        );
        displayAPKs(filteredAPKs);
    });

    // Load APK Data when page loads
    loadAPKData();
});
