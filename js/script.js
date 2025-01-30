document.addEventListener("DOMContentLoaded", function () {
    const apkList = document.getElementById("apk-list");
    const searchInput = document.getElementById("search-input");

    let allAPKs = []; // Store all APKs for filtering

    // Fetch all APK files inside "content" folder
    async function loadAPKData() {
        const apkFiles = ["app1.json", "app2.json", "app3.json"]; // List all JSON files here
        allAPKs = [];

        for (let file of apkFiles) {
            try {
                const response = await fetch(`content/${file}`);
                const apkData = await response.json();
                allAPKs.push(apkData);
            } catch (error) {
                console.error(`Error loading ${file}:`, error);
            }
        }
        displayAPKs(allAPKs);
    }

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
                window.open(`details.html?app=${apk.title}`, "_blank");
            });
            apkList.appendChild(apkDiv);
        });
    }

    // Function to Filter APKs Live
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
