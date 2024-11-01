/*CART 351 Exercise 2 
  By Mollika Chakraborty 
  Audio Sources : https://freesound.org/
  Image Sources: https://www.dreamstime.com/van-houtte-logo-front-their-local-cafe-downtown-montreal-quebec-van-houtte-canadian-chain-cafes-montreal-canada-image134733906
                 https://workfrom.co/cafe-myriade-le-plateau-218385
                 https://fr.tripadvisor.ca/LocationPhotoDirectLink-g181729-d15067172-i343328854-Starbucks-Saint_Jerome_Quebec.html
                 http://www.forgottenbuffalo.com/forgottenontario/timhortons1.html
  Image processed: Photoshop 
  Tutorials: https://www.youtube.com/watch?v=zUcc4vW-jsI
             https://www.youtube.com/watch?v=tc8DU14qX6I
             
*/

let currentAudio = null; // Store the currently playing audio

document.getElementById('submit').addEventListener('click', function() {
    const day = document.getElementById('day').value;

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => item.day.toLowerCase() === day.toLowerCase());

            // background based on the first matching location
            if (filteredData.length > 0) {
                const location = filteredData[0].location;
                const backgroundImages = {
                    "Tim Hortons": "Images/Tims-min.png",
                    "Starbucks": "Images/starbucks-min.png",
                    "Myriad": "Images/Myriad-min.jpg",
                    "Van Houtte": "Images/vanhoutte-min.jpg"
                };
                document.body.style.backgroundImage = `url(${backgroundImages[location]})`;

                // music based on the first matching mood
                const mood = filteredData[0].mood;
                const moodMusic = {
                    "Relaxed": "Sound Files/relax.mp3",
                    "Tired": "Sound Files/yawn.wav",
                    "Stressed": "Sound Files/stress.mp3",
                    "Hyperactive": "Sound Files/hyperactive.wav"
                };

                // Stop any currently playing audio
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0; // Reset to the beginning
                }

                // Create new audio and set it to loop
                currentAudio = new Audio(moodMusic[mood]);
                currentAudio.loop = true;
                currentAudio.play();

                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = ''; // Clear previous results

                filteredData.forEach(item => {
                    const entryDiv = document.createElement('div');
                    entryDiv.className = 'entry';

                    // Mood-based styling
                    const moodClass = item.mood.toLowerCase().replace(' ', '-');
                    entryDiv.classList.add(moodClass);

                    // div for coffee type and info
                    const typeDiv = document.createElement('div');
                    typeDiv.className = 'type';
                    typeDiv.innerHTML = `<span>${item.type}</span>`;

                    entryDiv.innerHTML = `
                        <div class="entry-header">
                            <h3>${item.day} (${item.date})</h3>
                            <p class="mood">${item.mood}</p>
                        </div>
                        <div class="coffee-info">
                            <div class="cups">`;
                    //replacing text with cups icon
                    for(let i = 0; i < item.cups; i++) {
                        entryDiv.innerHTML += `<img src="cup.png" alt="Cup" style="width:80px;">`;
                    }

                    entryDiv.innerHTML += `</div>
                            <div class="location">
                                <span>${item.location}</span>
                            </div>
                        </div>`;

                    entryDiv.appendChild(typeDiv);

                    entryDiv.innerHTML += `
                        <div class="times">
                            <span>Times: ${item.times.join(', ')}</span>
                        </div>
                        <div class="company">
                            <p>Company: ${item.company.join(', ')}</p>
                        </div>
                    `;

                    resultDiv.appendChild(entryDiv);
                });
            } else {
                document.getElementById('result').innerHTML = 'No data matches your criteria.';
            }

            
        });
});
