class Menu {

    constructor(memoryGame){
        this.memoryGame = memoryGame;
        this.load();
    }

    load(){
        const levels = [
                        {level:"Easy",icon:"fa-egg"}
                        , {level:"Medium",icon:"fa-hand"}
                        , {level:"Hard",icon:"fa-face-hand-peeking"}
                    ];
        this.mountContent(levels);
    }

    mountContent(levels){
        let html = "";
        let first = true;
        levels.forEach(data=>{
            html += `<li class="nav-item">
                        <span id="menu-${data.level.toLowerCase()}" class="nav-link ${first === true ? 'active' : 'link-dark'} " >
                            <i class="fa-thin ${data.icon}"></i>
                            ${data.level}
                        </span>
                    </li>
                    `;
            first = false;
        });
        $("#menu-levels").html(html);
    }

    events(){
        $("#menu-easy").off("click");
        $("#menu-easy").on("click",() => {
            if(this.memoryGame.level !== "EASY") {
                this.memoryGame.currentLevel = "EASY"
                this.handleChange() 
            }
        });
        $("#menu-medium").off("click");
        $("#menu-medium").on("click",()=> { 
            if(this.memoryGame.level !== "MEDIUM") {
                this.memoryGame.currentLevel = "MEDIUM"
                this.handleChange()
            }
        });
        $("#menu-hard").off("click");
        $("#menu-hard").on("click",()=> {
            if(this.memoryGame.level !== "HARD") {
                this.memoryGame.currentLevel = "HARD"
                this.handleChange()
            }
        });
        $("#start-game").off("click");
        $("#start-game").on("click",()=> this.memoryGame.playGame() );
        $("#player-name button").off("click");
        $("#player-name button").on("click",()=> this.memoryGame.startPage.alterName() );
    }

    acivate(){
        
        $(".nav-link").each((key, obj)=>{
            $(obj).addClass('link-dark');
            $(obj).removeClass('active');
        });

        $(`#menu-${this.memoryGame.currentLevel.toLowerCase()}`).addClass('active');
    }

    handleChange(){
        if(this.memoryGame.currentStatus === "STARTED"){
            Message.confirm(
                    "Are you sure?"
                    , "Do you want to exit the current game?"
                    , "fa fa-question-circle"
                    , this.handleGameOver
            );
        } else this.change();
    }

    handleGameOver(){
        memoryGame.startPage.load();
        memoryGame.menu.acivate();
        memoryGame.score.readPositions();
        memoryGame.cleanGame();
    }

    change(){
        this.acivate();
        this.memoryGame.score.readPositions();
    }

}