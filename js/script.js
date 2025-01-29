// List of APK JSON files
const apkFiles = ['content/app1.json', 'content/app2.json'];

apkFiles.forEach(file => {
    fetch(file)
        .then(response => response.json())
        .then(data => {
            const apkContainer = document.querySelector('.apk-container');

            const apkItem = document.createElement('div');
            apkItem.classList.add('apk-item');

            apkItem.innerHTML = `
                <div class="apk-card">
                    <img src="${data.image}" alt="${data.title}" class="apk-image">
                    <div class="apk-info">
                        <h2>${data.title}</h2>
                        <p>Size: ${data.specifications.Size}</p>
                        <p>Rating: ⭐⭐⭐⭐</p>
                        <a href="details.html?id=${data.title}" target="_blank">See Details</a>
                    </div>
                </div>
            `;

            apkContainer.appendChild(apkItem);
        })
        .catch(err => console.error('Error fetching APK data:', err));
});
