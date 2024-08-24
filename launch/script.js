const targetDate='2024-09-23T05:24:00';

/*calling the elements */
function getTimeSegmentElements(segmentElement){
    const segmentDisplay = segmentElement.querySelector('.segment-display');
    const segmentDisplayTop = segmentDisplay.querySelector('.segment-display-top');
    const segmentDisplayBottom = segmentDisplay.querySelector('.segment-display-bottom');
    const segmentOverlay = segmentDisplay.querySelector('.segment-overlay');
    const segmentOverlayTop=  segmentOverlay.querySelector('.segment-overlay-top');
    const segmentOverlayBottom = segmentOverlay.querySelector('.segment-overlay-bottom');

    return{
        segmentDisplayTop,
        segmentDisplayBottom,
        segmentOverlay,
        segmentOverlayTop,
        segmentOverlayBottom 
    }
}

/*updating the elements value */
function updateSegmentValues(displayElement, overlayElement,value){
    displayElement.textContent = value;
    overlayElement.textContent = value;
}


function updateTimeSegment(segmentElement, timeValue){
    const segmentElements = getTimeSegmentElements(segmentElement); /*WE ARE JUST CALLING THE SEGMENTELEMTS WE CREATED AS WE ARE GOING TO USE IT HERE */

    if (
        parseInt(
          segmentElements.segmentDisplayTop.textContent,
          10
        ) === timeValue
      ) {
        return;
      }

    segmentElements.segmentOverlay.classList.add('flip');

    /*update the displaytop and overlaybottom first  and
    when the animation is finished we want to change the displaybottom and overlaytop*/
    updateSegmentValues( /*initial part of the animation */
        segmentElements.segmentDisplayTop,
        segmentElements.segmentOverlayBottom,
        timeValue
    ) ;
    function finishAnimation(){
        segmentElements.segmentOverlay.classList.remove('flip');
        updateSegmentValues( 
            segmentElements.segmentDisplayBottom,
            segmentElements.segmentOverlayTop,
            timeValue
        ) ;
        this.removeEventListener('animationend',finishAnimation)
    }
    segmentElements.segmentOverlay.addEventListener('animationend',finishAnimation)

}

/*because we splitted our numbers*/
function updateTimeSection(sectionID,timeValue){ //14
    const firstNumber = Math.floor(timeValue / 10); //1
    const SecondNumber = timeValue % 10;//4

    const sectionElement = document.getElementById(sectionID); //refrence to the sectionelement
    const timeSegments = sectionElement.querySelectorAll('.time-segment');
    //refrence to the two time values

    updateTimeSegment(timeSegments[0], firstNumber);
    updateTimeSegment(timeSegments[1], SecondNumber );
}

//time remaining

function getTimeRemaining(targetDateTime){
    const nowTime = Date.now(); //1234565677888
    const secondsRemaining = Math.floor(
        (targetDateTime - nowTime) / 1000);

        const complete = nowTime >= targetDateTime;
        if(complete){
            return{
                complete,
                days:0,
                seconds:0,
                minutes:0,
                hours:0,
            };
        }

    const days = Math.floor(secondsRemaining / (24 * 3600)) ;
    const hours = Math.floor(secondsRemaining / 60 / 60) % 24;
    const minutes = Math.floor(secondsRemaining / 60) % 60;
    const seconds = secondsRemaining % 60;


    return{
         days,
        seconds,
        minutes,
        hours,
    };
}



function updateAllSegments(){
    const targetTimeStamp = new Date(targetDate).getTime();
    const timeRemainingBits = getTimeRemaining(targetTimeStamp);

    updateTimeSection('seconds', timeRemainingBits.seconds);
    updateTimeSection('minutes', timeRemainingBits.minutes);
    updateTimeSection('hours', timeRemainingBits.hours);
    updateTimeSection('days', timeRemainingBits.days);
    return timeRemainingBits.complete;
}

const countdownTimer = setInterval(()=>{
    const isComplete = updateAllSegments();
    if(isComplete){
        clearInterval(countdownTimer);
    }
},1000);

updateAllSegments();