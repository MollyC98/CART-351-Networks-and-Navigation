export default function resourceScene(startGame, answers) {
    // Hide the survey
    document.getElementById('survey').style.display = 'none';

    // Display the resource section
    const resourceDiv = document.getElementById('resource');
    resourceDiv.style.display = 'flex';
    resourceDiv.style.justifyContent = 'center';
    resourceDiv.style.alignItems = 'center';
    resourceDiv.style.height = '100vh'; // viewport height for centering
    resourceDiv.style.flexDirection = 'column';

    // Google Font Integration
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Pangolin&display=swap';
    document.head.appendChild(link);

    // Motivational message in a styled box
    resourceDiv.innerHTML = `
        <div class="message-box">
            <p class="motivational-message">
                Hello user, you are amazingly brave to deal with your stressors and doing a great job! 
                Let's take 2 minutes of your time for self-reflection and to acknowledge what an amazing person you are.
            </p>
        </div>
        <button id="skip-message-button" class="skip-button">Skip</button>
    `;

      // Automatically transition to the video after 3 seconds
    let ref =  setTimeout(() => {
        transitionToVideo();
    }, 10000);
    // Event listener to skip the message
    document.getElementById('skip-message-button').addEventListener('click', () => {
        transitionToVideo();
        clearTimeout(ref)
    });

  

    function transitionToVideo() {
        const resourceDiv = document.getElementById('resource');
        resourceDiv.innerHTML = `
            <iframe id="explanatory-video" 
                    width="1280" 
                    height="720" 
                    src="https://www.youtube.com/embed/tEmt1Znux58?autoplay=1&controls=0&start=0&end=120" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
            <button id="skip-video-button" class="skip-button">Skip</button>
        `;
    
        // Add event listener for the dynamically created "Skip" button
        document.getElementById('skip-video-button').addEventListener('click', () => {
            stopVideoAndStartGame();
        });
    }
    
    function stopVideoAndStartGame() {
        const iframe = document.getElementById('explanatory-video');
        if (iframe) {
            iframe.src = ''; // Stop the video by clearing the source
        }
    
        const resourceDiv = document.getElementById('resource');
        resourceDiv.style.display = 'none';
        resourceDiv.innerHTML = ''; // Clear resource content
    
        document.getElementById('game-container').style.display = 'block'; // Show the game canvas
    
        startGame(answers); // Call the game start function
    }
    
}

