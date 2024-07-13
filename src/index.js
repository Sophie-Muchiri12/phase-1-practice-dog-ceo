document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogImageContainer = document.getElementById('dog-image-container');
    const dogBreedsList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');
  
    // Fetch and display dog images
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(imageUrl => {
          const img = document.createElement('img');
          img.src = imageUrl;
          dogImageContainer.appendChild(img);
        });
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  
    // Fetch and display dog breeds
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        const breeds = data.message;
        for (let breed in breeds) {
          const li = document.createElement('li');
          li.textContent = breed;
          dogBreedsList.appendChild(li);
        }
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
      });
  
    // Add click event to change font color of clicked breed
    dogBreedsList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        event.target.style.color = 'blue'; // Change to desired color
      }
    });
  
    // Filter breeds by first letter
    breedDropdown.addEventListener('change', (event) => {
      const selectedLetter = event.target.value;
      const breedItems = dogBreedsList.getElementsByTagName('li');
  
      for (let i = 0; i < breedItems.length; i++) {
        const breedItem = breedItems[i];
        if (selectedLetter === 'all' || breedItem.textContent.startsWith(selectedLetter)) {
          breedItem.style.display = 'list-item';
        } else {
          breedItem.style.display = 'none';
        }
      }
    });
  });