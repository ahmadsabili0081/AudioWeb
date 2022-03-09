export const convert = (time) => {
    let minuts = Math.floor(time / 60 ) 
    let seconds = Math.floor(time % 60)
    if(minuts < 10 ){
        minuts = '0' + String(minuts)
    } 
    if(seconds < 10){
        seconds = '0' + String(seconds);
    }
    return minuts + ':' + seconds;
}
