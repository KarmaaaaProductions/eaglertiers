// script.js
document.addEventListener('DOMContentLoaded', function() {
    const tierFile = document.body.getAttribute('data-tier-file');
    fetch(tierFile)
        .then(response => response.text())
        .then(data => {
            const tiers = data.split('\n\n');
            const tierListElement = document.getElementById('tier-list');

            const tierGroups = {
                '1': [],
                '2': [],
                '3': [],
                '4': [],
                '5': []
            };

            tiers.forEach(tier => {
                const [tierName, ...items] = tier.split('\n');
                const level = tierName.match(/\d/)[0];
                tierGroups[level].push({ tierName, items });
            });

            Object.keys(tierGroups).forEach(level => {
                const tierElement = document.createElement('div');
                tierElement.classList.add('tier');

                const tierTitle = document.createElement('h2');
                tierTitle.textContent = `Tier ${level}`;
                tierElement.appendChild(tierTitle);

                const itemList = document.createElement('ul');
                tierGroups[level].forEach(group => {
                    const color = group.tierName.startsWith('HT') ? '#1e90ff' : '#87cefa';
                    group.items.forEach(item => {
                        const itemElement = document.createElement('li');
                        itemElement.textContent = item;
                        itemElement.style.backgroundColor = color;
                        itemList.appendChild(itemElement);
                    });
                });

                tierElement.appendChild(itemList);
                tierListElement.appendChild(tierElement);
            });
        })
        .catch(error => console.error('Error loading tier data:', error));
});