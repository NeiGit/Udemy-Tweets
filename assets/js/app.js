



document.querySelector('#formulario').addEventListener('submit', addTweetFromInput)
const listaTweets = document.getElementById('lista-tweets')

const deleteButton = function () {
    const button =  document.createElement('a')
    button.classList = 'borrar-tweet'
    button.innerText = 'X'
    return button;
}

loadTweetsFromLocalStorage();

listaTweets.addEventListener('click', deleteTweet);


// functions

function addTweetFromInput(e) {
    e.preventDefault();
    const tweet = document.getElementById('tweet').value;
    if (tweet == "") {
        console.log("Tweet vacío")
        return;
    } 
    addTweet(tweet)
}

function addTweet(tweet, store = true) {
    const li = addRow(listaTweets);
    li.innerText = tweet;
    li.appendChild(deleteButton())
    if (store)
        addToLocalStorage(tweet);
}

function addToLocalStorage(tweet) {
    let tweets = getCollectionFromLocalStorage('tweets')
    tweets.push(tweet)
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function addRow(list) {
    const li = document.createElement('li')
    list.appendChild(li);
    return li;
}

function deleteTweet(e) {
    e.preventDefault();
    const className = e.target.className
    if (className == 'borrar-tweet') {
        const tweet = e.target.parentElement
        localStorage.removeItem(tweet);
        tweet.remove()
        removeFromLocalStorage(getRealValue(tweet.innerText))
    }
}

function getRealValue(tweet) {
    return tweet.split('X')[0]
}

function removeFromLocalStorage(tweet) {
    let tweets = getCollectionFromLocalStorage('tweets').filter(t => t != tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getCollectionFromLocalStorage(key){
    let tweets
    if(localStorage.getItem(key) === null) {
        tweets = []
    } else {
        tweets = JSON.parse(localStorage.getItem(key))
    }    
    return tweets;    
}

function loadTweetsFromLocalStorage() {
    let tweets = getCollectionFromLocalStorage('tweets')
    tweets.forEach(t => addTweet(t, false))
}

/* TODO:
    - Puntualizar el hacer click en botón sin necesidad de if (ver método deleteTweet)
    - hacer un load() */
