function timeToWalk(steps, footprint, speed){
    let distanceInMeters = steps * footprint;
    let speedMetersInSec = speed / 3.6;
    let time = distanceInMeters / speedMetersInSec;
    let rest = Math.floor(distanceInMeters / 500);

    let timeInMin = Math.floor(time / 60);
    let timeInSec = Math.ceil(time - (timeInMin * 60));
    let timeinHours = Math.floor(time / 3600);
    timeInMin += rest;
    timeinHours += Math.floor(timeInMin / 60)
    timeInMin = timeInMin % 60;

    let formattedHours = timeinHours < 10 ? `0${timeinHours}` : `${timeinHours}`;
    let formattedMinutes = timeInMin < 10 ? `0${timeInMin}` : `${timeInMin}`;

    console.log(`${formattedHours}:${formattedMinutes}:${timeInSec}`);
}