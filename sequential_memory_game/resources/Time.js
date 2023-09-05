class Time {

    seconds;
    milliseconds;
    pausedTime = true;
    cron;

    constructor(memoryGame){
        this.memoryGame = memoryGame;
    }

    startTime() {

        this.stopTime();

        this.milliseconds = 1000;

        if(this.memoryGame.board.sequence.length > levels[this.memoryGame.currentLevel].minTime)
            this.seconds =  this.memoryGame.board.sequence.length
        else
            this.seconds = levels[this.memoryGame.currentLevel].minTime;

        $("#time").text(`Time  ${this.seconds}:00`);

        this.cron = setInterval(() => {
            if(this.memoryGame.board.time.pausedTime === false) {
                this.milliseconds = this.processTime(this.milliseconds);
            }
        }, 10);
        
    }

    processTime(milliseconds){
        if(milliseconds <= 0){
            milliseconds = 1000 + (milliseconds);
            this.processSeconds(milliseconds);
        } else {
            $("#time").text(`Time  ${this.seconds-1}:${milliseconds.toString().substring(0, 2)}`);
            milliseconds -= 10
        }
        return milliseconds;
    }

    processSeconds(milliseconds){
        if((this.seconds-1) <= 0){
            $("#time").text(`Time  00:00`);
            this.memoryGame.gameOver();
        } else {
            this.seconds--;
            $("#time").text(`Time  ${this.seconds-1}:${milliseconds.toString().substring(0, 2)}`);
        }
    }

    stopTime(){
        this.pausedTime = true;
        clearInterval(this.cron);
    }

}