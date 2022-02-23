//js for jokes30js
'use strict';
let timeoutReset;
let jsondata = [];
let apiurl = './enjokes.json';
const getreq = 'GET';
const audiobnb = new Audio();
const tracklist = ['awesome.wav', 'bnbbigger.mp3', 'bnbvaca.mp3', 'break_something.wav', 'bunghole.wav', 'burn.wav', 'butt_crack.wav', 'check_this_out.wav', 'chicken.wav', 'diarreha.wav', 'genius.wav', 'here_i_sit.wav', 'huh.wav', 'pullfinger.wav', 'rump_roast.wav', 'see_more_butts.wav', 'uranus.wav', 'weiner.wav'];
const ajax = new XMLHttpRequest();
const locStorage = window.localStorage;
const getJokes = document.getElementById('getjokes');
const switchLang = document.getElementById('switchlang');
const startFunc = function() {
	getjokes.addEventListener('click', letsGo);
	startMoving();
};
function letsGo() {
	coverblock.classList.add('none');
	getJokes.removeEventListener('click', letsGo);
	actorsblock.classList.remove('none');
	getJokes.addEventListener('click', startJokes);
	startMoving();
	playAudio('bnbbigger.mp3');
};
function startJokes() {
	startMoving();
	getApiData(jsondata);
	audioRand();
};
function startMoving() {
	beavis.classList.add('beav_change');
	butthead.classList.add('butt_change');
	blockbutton.classList.add('shake-btn');
	timeoutReset = window.setTimeout(stopMoving, 3000);
};
function stopMoving() {
	beavis.classList.remove('beav_change');
	butthead.classList.remove('butt_change');
	blockbutton.classList.remove('shake-btn');
	window.clearTimeout(timeoutReset);
};
// start ajax
function startAjax() {
	ajax.open(getreq, apiurl, true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		jsondata = JSON.parse(this.responseText);
		// console.log(jsondata);
		getApiData(jsondata);
		} else if (this.readyState !=4 && this.status !=200) {
		let nodata = "Don\'t get data!\n";
		console.log(nodata, this.responseText);
		};
	};
};
// Get Api Data
function getApiData(argdata) {
	let argLength = (argdata.length - 1);
	let randNum = Math.round(Math.random() * argLength);
	console.log(randNum);
	let randomActor = argdata[`${randNum}`].author;
	console.log(randomActor);
	let randomQuote = argdata[`${randNum}`].text;
	printJokes(randomActor, randomQuote);
};
//print jokes
function printJokes(hero, joke) {
	console.log(joke);
	if (hero === 'Beavis' || hero === 'Бивис') {
		text_beav_jokes.textContent = '';
		text_butt_jokes.textContent = `${hero}: ${joke}`;
	} else if (hero === 'Butt-head' || hero === 'Батт-хед') {
		text_butt_jokes.textContent = '';
		text_beav_jokes.textContent = `${hero}: ${joke}`;
	};
};
// audio rand
function audioRand() {
	let listlength = (tracklist.length - 1);
	let randindex = Math.round(Math.random() * listlength);
	let randtrack = `${tracklist[randindex]}`;
	playAudio(randtrack);
};
// play audio
function playAudio(track) {
	audiobnb.src = `./assets/audio/${track}`;
	audiobnb.currentTime = 0;
	audiobnb.play();
}
//setup api
function setApi(lang) {
	if (lang === 'rus') {
		apiurl = './rujokes.json';
		console.log('set api url: rujokes');
	} else {
		apiurl = './enjokes.json';
		console.log('set api url: enjokes');
	};
	startAjax();
};
//setup lang
function setLang(lang) {
	if (lang === 'rus') {
		englang.classList.remove('select');
		ruslang.classList.add('select');
		apiurl = './rujokes.json';
		setApi('rus');
	} else {
		englang.classList.add('select');
		ruslang.classList.remove('select');
		apiurl = './enjokes.json';
		setApi('eng');
	};
};
//switch lang
switchLang.onclick = function() {
	if (englang.classList.contains('select')) {
		console.log('switch to russian');
		locStorage.setItem('langSet', 'rus');
		apiurl = './rujokes.json';
		setLang('rus');
	} else if (ruslang.classList.contains('select')) {
		console.log('switch to english');
		locStorage.setItem('langSet', 'eng');
		apiurl = './enjokes.json';
		setLang('eng');
	};
};
//has storage
function hasStorage() {
	if (locStorage.length === 0) {
		startAjax();
	} else if (locStorage.length > 0 && locStorage.getItem('langSet') === 'rus') {
		console.log('set lang: rus');
		setLang('rus');
	} else if (locStorage.length > 0 && locStorage.getItem('langSet') === 'eng') {
		console.log('set lang: eng');
		setLang('eng');
	};
	startFunc();
};

//script start

window.onload = hasStorage;
