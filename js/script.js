// Fetch all APK details and load them on the home page
document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.apk-container');
    
    fetch('content/app1.json')
        .then(response => response.json())
        .then(data => {
            const apkItem = document.createElement('div');
            apkItem.classList.add('apk-item');
            apkItem.innerHTML = `
                <a href="details.html?app=${data.title}" target="_blank">
                    <img src="${data.image}" alt="${data.title}" />
                    <div class="apk-info">
                        <h2>${data.title}</h2>
                        <p class="size">${data.specifications.Size}</p>
                        <p class="rating">Rating: ${data.specifications.Rating}</p>
                    </div>
                </a>
            `;
            container.appendChild(apkItem);
        })
        .catch(error => console.log('Error fetching APK data:', error));
});
