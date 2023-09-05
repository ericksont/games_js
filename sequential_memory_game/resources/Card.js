class Card {

    listAll = ["blue","red", "green", "yellow", "purple", "orange","pink","gray","cyan"];

    constructor(memoryGame) {
        this.memoryGame = memoryGame;
    }

    async blink(id, speed=200) {
        $(`#${id}`).fadeOut(speed).fadeIn(speed);
    }

    events(){
        $("#board-colors label").on('click',event=>{
            this.blink(event.currentTarget.id);
            this.memoryGame.board.checkClick(event.currentTarget.id);
        })
    }

    disableEvents(){
        $("#board-colors label").off('click');
    }
}