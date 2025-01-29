const urlParams = new URLSearchParams(window.location.search);
const apkId = urlParams.get('id');

const apkFiles = ['content/app1.json', 'content/app2.json'];

apkFiles.forEach(file => {
    fetch(file)
        .then(response => response.json())
        .then(data => {
            if (data.title === apkId) {
                const apkDetailsContainer = document.querySelector('.apk-details');
                apkDetailsContainer.innerHTML = `
                    <div class="apk-details-card">
                        <img src="${data.image}" alt="${data.title}" class="apk-image">
                        <h2>${data.title}</h2>
                        <p>${data.short_description}</p>
                        <div class="specifications">
                            <h3>Specifications</h3>
                            <ul>
                                <li>Version: ${data.specifications.Version}</li>
                                <li>Size: ${data.specifications.Size}</li>
                                <li>Developer: ${data.specifications.Developer}</li>
                                <li>Last Updated: ${data.specifications['Last Updated']}</li>
                            </ul>
                        </div>
                        <div class="long-description">
                            <h1>${data.long_description.h1}</h1>
                            <h2>${data.long_description.h2}</h2>
                            <p>${data.long_description.content}</p>
                        </div>
                        <a href="${data.download}" class="download-button">Download APK</a>
                    </div>
                `;
            }
        })
        .catch(err => console.error('Error fetching APK details:', err));
});
