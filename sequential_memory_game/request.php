<?php 

    $entityBody = file_get_contents('php://input');
    $obj = json_decode($entityBody);

    $level = $obj->level;
    $name = $obj->name;
    $playerScore = $obj->score;

    $json = file_get_contents('data/score.json');
    $json_data = json_decode($json,true);

    usort(

        $json_data[$level],
    
         function( $a, $b ) {
             if( $a["score"] == $b["score"] ) return 0;
             return ( ( $b["score"] < $a["score"] ) ? -1 : 1 );
         }
    );

    foreach($json_data[$level] as $element){
        if($playerScore > $element["score"]) {
            array_pop($json_data[$level]);
            $json_data[$level][] = ["name" => $name,"score" => $playerScore];
            break;
        }
    }

    var_dump(json_encode($json_data));

    unlink("data/score.json");
	$fp = fopen("data/score.json", "a+");
    fwrite($fp, json_encode($json_data));
	fclose($fp);
  
?>