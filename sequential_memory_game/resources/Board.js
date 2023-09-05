class Board{

    sequence = [];

    constructor(memoryGame){
        this.memoryGame = memoryGame;
        this.time = new Time(this.memoryGame);
        this.card = new Card(this.memoryGame);
    }

    load(){
        $("#content").load("/games/sequential_memory_game/boardpage.html", ()=>{
            this.loadCards();
            this.newStage();
        });
    }

    /*
     * --- START GAME
     */
    newStage(){

        this.playerPosition = 0;
        let level = this.sequence.length;

        this.time.startTime();
        this.setScore(level);

        Message.alert(
            `Start Level ${level+1}`
            , `Current Score: ${level} pts`
            , 'fa fa-gamepad'
            , this.loadAnimation
        );
        
    }

    loadAnimation() {

        memoryGame.board.card.disableEvents();
        
        // Set new color
        let total = levels[memoryGame.currentLevel].totalCards;
        let colorOrder = Math.floor(Math.random() * total);
        memoryGame.board.sequence.push(memoryGame.board.card.listAll[colorOrder]);

        // Start animation
        setTimeout(() => {

            let complementTime = levels[memoryGame.currentLevel].speed * 2;
            memoryGame.board.sequence.forEach((data)=>{
                setTimeout(() => {
                    memoryGame.board.card.blink(data, levels[memoryGame.currentLevel].speed);
                }, complementTime);
                complementTime = complementTime + (levels[memoryGame.currentLevel].speed * 2);              
            });

            const totalDuration = 1000 + ((levels[memoryGame.currentLevel].speed * 2) * memoryGame.board.sequence.length);
            
            setTimeout(() => {                
                memoryGame.board.time.pausedTime = false;
                memoryGame.board.card.events();
            }, totalDuration);

        }, 500);

    }

    checkClick(color){
        if(color != this.sequence[this.playerPosition]) {
            this.memoryGame.gameOver();
            return;
        } else 
            this.playerPosition++;
        
        if(this.playerPosition == this.sequence.length) {
            this.time.pausedTime = true;
            this.newStage();
        }
    }

    /*
     * --- START CARDS
     */
    loadCards(){
        const totalCards = levels[this.memoryGame.currentLevel].totalCards
        if(totalCards === 4) {
            let cardsList = this.card.listAll.filter((obj,key)=>key <= 3);
            this.positionCards(cardsList, [1], 4);
        } else {
            this.positionCards(this.card.listAll,[2,5], 3);
        }
    }

    positionCards(list,breakPositions,size) {
        let html = '';
        list.forEach((data,key)=>{
            html += `<div class="col-${size} p-1 h-50"><label id="${data}" class="shadow-sm card h-100"></label></div>`;
            if(breakPositions.includes(key))
                html += `<div class="w-100"></div>`;
        });
        $("#board-colors").html(html);
    }

    /*
     * --- START SCORE
     */
    setScore(value=0) {
        this.memoryGame.player.score = value;
        $("#board-score").text(`Score: ${value} pts`);
    }

}