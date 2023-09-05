class StartPage {

    constructor(memoryGame){
        this.memoryGame = memoryGame;
        this.load();
    }

    async load(){
        $("#content").load("/games/sequential_memory_game/startpage.html", ()=>{
            this.showName();
            this.memoryGame.menu.events();
        });
    }

    showName(){
        if(this.memoryGame.player.name == "") {
            $("#name").show();
            $("#player-name").hide();
            $("#player-name h3").text('');
        } else {
            $("#name").hide();
            $("#player-name").show();
            $("#player-name h3").text(this.memoryGame.player.name);
        }
    }

    alterName(){
        this.memoryGame.player.name = "";
        this.showName();
    }

}