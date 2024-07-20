// Drum Arrays
let kicks = new Array(16).fill(false);
let snares = new Array(16).fill(false);
let hiHats = new Array(16).fill(false);
let rideCymbals = new Array(16).fill(false);

function toggleDrum(type, idx){
    $(`#type-${idx}`).addClass('active');
    if(type==='kicks')
        kicks[idx]=!kicks[idx];
    if(type==='snares')
        snares[idx]=!snares[idx];
    if(type==='hiHats')
        hiHats[idx]=!hiHats[idx];
    if(type==='rideCymbals')
        rideCymbals[idx]=!rideCymbals[idx];    
}

function clear(type){
    let drum=[];
    if(type==='kicks')
        drum=kicks;
    if(type==='snares')
        drum=snares;
    if(type==='hiHats')
        drum=hiHats;
    if(type==='rideCymbals')
        drum=rideCymbals;

    for(let idx=0; idx<drum.length; idx++){
        $(`#type-${idx}`).removeClass('active');
        drum[idx]=false;
    }
}


function invert(type){
    let drum=[];
    if(type==='kicks')
        drum=kicks;
    if(type==='snares')
        drum=snares;
    if(type==='hiHats')
        drum=hiHats;
    if(type==='rideCymbals')
        drum=rideCymbals;

    for(let idx=0; idx<drum.length; idx++){
        if($(`#type-${idx}`).hasClass('active'))
            $(`#type-${idx}`).removeClass('active');
        else
            $(`#type-${idx}`).addClass('active');

        drum[idx]=!drum[idx];
    }
}