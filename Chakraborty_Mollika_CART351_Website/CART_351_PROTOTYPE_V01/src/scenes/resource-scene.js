export default function resourceScene(startGame, answers){
    document.getElementById('survey').style.display = 'none';
    document.getElementById('resource').style.display = 'block';


    setTimeout(function(){startGame(answers)},5000)

}