document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('apk-list');

    const apks = ['app1.json', 'app2.json']; // Add more JSON files here

    apks.forEach(apkFile => {
        fetch(`content/${apkFile}`)
            .then(response => response.json())
            .then(data => {
                const apkItem = document.createElement('div');
                apkItem.classList.add('apk-item');
                apkItem.onclick = () => window.location.href = `details.html?app=${apkFile}`;

                apkItem.innerHTML = `
                    <img src="${data.image}" alt="${data.title}">
                    <div class="apk-info">
                        <h2>${data.title}</h2>
                        <p>${data.specifications.Size} • ${data.specifications.Rating} ★</p>
                    </div>
                `;
                container.appendChild(apkItem);
            })
            .catch(error => console.error('Error loading APK:', error));
    });
});
