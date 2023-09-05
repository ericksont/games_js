class Message {

    static alert(title, content, icon, callback=null){
        $.confirm({
            title: title,
            content: content,
            icon: icon,
            type: 'orange',
            animation: 'scale',
            closeAnimation: 'scale',
            opacity: 0.5,
            buttons: {
                'confirm': {
                    text: 'yes',
                    btnClass: 'btn-blue',
                    action: ()=>{
                        if(callback !== null)
                            callback();
                    }
                }
            }
        });
    }

    static confirm(title, content, icon, callback){
        $.confirm({
            title: title,
            content: content,
            icon: icon,
            animation: 'scale',
            closeAnimation: 'scale',
            opacity: 0.5,
            buttons: {
                'confirm': {
                    text: 'yes',
                    btnClass: 'btn-blue',
                    action: ()=>{
                        callback();
                    }
                },
                cancel: function(){ }
            }
        });
    }
}