document.addEventListener("DOMContentLoaded", function () {
    const apkListContainer = document.getElementById("apk-list");
    const searchInput = document.getElementById("search-input");

    // JSON फाइल्स का नाम
    const apkFiles = ["app1.json", "app2.json", "app3.json"]; 

    // सभी APKs लोड करने के लिए
    async function fetchAPKs() {
        let allApks = [];

        for (const file of apkFiles) {
            try {
                const response = await fetch(`content/${file}`);
                const apk = await response.json();
                allApks.push(apk);
            } catch (error) {
                console.error(`Error loading ${file}:`, error);
            }
        }

        displayAPKs(allApks);
    }

    // 🔹 APKs को डिस्प्ले करने के लिए
    function displayAPKs(apks) {
        apkListContainer.innerHTML = ""; // पुरानी लिस्ट क्लियर करो

        apks.forEach(apk => {
            const apkCard = document.createElement("div");
            apkCard.classList.add("apk-card");
            apkCard.innerHTML = `
                <img src="${apk.image}" alt="${apk.title}">
                <div class="apk-info">
                    <h2>${apk.title}</h2>
                    <p>Size: ${apk.size} | ⭐ ${apk.rating}</p>
                </div>
            `;

            // APK पर क्लिक करने से डिटेल्स खुलेगा
            apkCard.addEventListener("click", function () {
                window.open(`details.html?apk=${encodeURIComponent(apk.title)}`, "_blank");
            });

            apkListContainer.appendChild(apkCard);
        });
    }

    // 🔹 लाइव सर्च फंक्शन
    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase();
        const apkCards = document.querySelectorAll(".apk-card");

        apkCards.forEach(card => {
            const title = card.querySelector("h2").innerText.toLowerCase();
            if (title.includes(searchValue)) {
                card.style.display = "flex"; // मैच होने पर दिखाओ
            } else {
                card.style.display = "none"; // नहीं तो छुपाओ
            }
        });
    });

    fetchAPKs(); // 🔹 पेज लोड होते ही APK लोड करो
});
