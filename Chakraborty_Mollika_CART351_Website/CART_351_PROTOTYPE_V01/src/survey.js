import resourceScene from "./scenes/resource-scene.js";
function showSurvey(startGame) {
    console.log("Survey button clicked");

    // Hide the main menu
    document.getElementById('main-menu').style.display = 'none';
    
    // Show the survey section
    document.getElementById('survey').style.display = 'block';
    
    // Fetch the survey questions JSON file
    fetch ('src/survey-questions.json')
        .then(response => response.json())
        .then(data => {
            console.log("Survey data loaded:", data);  // Log data to ensure it's correct
            const surveyForm = document.getElementById('surveyForm');
            
            // Clear any previous content
            surveyForm.innerHTML = '';
            
            // Create an object to store answers
            const answers = {};

            // Dynamically create the survey form
           data.forEach(question => {
                const questionLabel = document.createElement('label');
                questionLabel.textContent = question.question;
                surveyForm.appendChild(questionLabel);
                
                const select = document.createElement('select');
                select.name = question.id;  // Set the name to the question ID
                answers[question.id] = question.options[0]
                
                question.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    select.appendChild(optionElement);
                });

                // Add the select dropdown to the form
                surveyForm.appendChild(select);
                surveyForm.appendChild(document.createElement('br')); // Line break for spacing

                // Store the selected answer when it changes
                select.addEventListener('change', (e) => {
                     answers[question.id] = e.target.value
                  
                });
            });

            // Handle form submission
            const submitButton = document.createElement('button');
            submitButton.textContent = 'Start Game';
            submitButton.onclick = function(e) {
                e.preventDefault()
                console.log("Answers submitted:", answers);
                // You can now use the answers object to save responses
                // You might want to save it in localStorage or send it to a server
               // startGame();  // Proceed to the game after submitting
               // go to resource screen , and pass anwsers
               resourceScene(startGame, answers)
            };
            surveyForm.appendChild(submitButton);
        })
        .catch(error => {
            console.error("Error fetching survey data:", error);
        });
}
export default showSurvey;
