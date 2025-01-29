document.addEventListener("DOMContentLoaded", function () {
    const apkListContainer = document.getElementById("apk-list");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");

    // JSON files to load
    const apkFiles = ["content/app1.json", "content/app2.json", "content/app3.json"];

    // Fetch all APK JSON files and display them
    apkFiles.forEach(file => {
        fetch(file)
            .then(response => response.json())
            .then(data => {
                const apkItem = document.createElement("div");
                apkItem.classList.add("apk-container");
                apkItem.innerHTML = `
                    <img src="${data.image}" alt="${data.title}">
                    <div class="apk-info">
                        <h2>${data.title}</h2>
                        <p class="size">${data.size}</p>
                        <p class="rating">⭐ ${data.rating}</p>
                    </div>
                `;
                apkItem.onclick = () => window.open(`details.html?apk=${file}`, "_blank");
                apkListContainer.appendChild(apkItem);
            })
            .catch(error => console.error("Error loading APK:", error));
    });

    // Search button functionality
    searchButton.onclick = function () {
        const query = searchInput.value.toLowerCase().trim();
        if (query) {
            // Open a new window with the search results
            window.open(`search_results.html?query=${query}`, "_blank");
        }
    };

    // Optional: Trigger search when Enter key is pressed
    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            searchButton.click();
        }
    });
});
