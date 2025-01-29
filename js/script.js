fetch('content/app1.json')
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
                    <a href="details.html?id=1" target="_blank">See Details</a>
                </div>
            </div>
        `;
        
        apkContainer.appendChild(apkItem);
    });
