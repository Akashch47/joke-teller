const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disale /enable button
function toggleButton(){
    button.disabled = !button.disabled;
}


// Passing joke to VoiceRss APi
function tellMe(joke){
    VoiceRSS.speech({
        key: '64310f1526324072874cbc6f3600025e',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from joke API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming';
    
    try{
        const response = await fetch (apiUrl);
        const data = await response.json();

        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        // Text-to-speed
        tellMe(joke);
        // disable button
        toggleButton();

    }catch(error){
        // catch errors here
        console.log('whoops', error)
    }
}

// event listener
 button.addEventListener('click', getJokes);
 audioElement.addEventListener('ended', toggleButton);
