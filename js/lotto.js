/*exported lotto*/
var lotto = (function() {
	'use strict';

	var lotto = {};
	var settings = {
			min: 1,
			max : 45,
			count: 6,
			games: 5,
			maxGames : 100,
			generate : generatePseudoRandom,
			truerandomUrl : "https://www.random.org/sequences/?format=plain&rnd=new",
			callbackTrueRandom : null,
	};

	function arrayToString(arr)
	{
		var result = "";

		for (var i = 0 ; i < arr.length - 1 ; i++) {
			result += ('0' + arr[i]).slice(-2);
			result += '-';
		}

		result += ('0' + arr[arr.length - 1]).slice(-2);

		return result;
	}

	function sortComp(a, b) {
		return a - b;
	}

	function getRandomInt(max)
	{
		return Math.floor(Math.random() * Math.floor(max));
	}

	function fyshuffle(arr) {
		var len = arr.length;
		var i, j, t;

		for (i = len - 1 ; i >= 1 ; i--) {
			j = getRandomInt(i + 1); // 0 ~ i

			t = arr[i];
			arr[i] = arr[j];
			arr[j] = t;
		}
	}
	
	function generatePseudoRandomSingle(min, max, count)
	{
		var shuffle;
		var temp;
		var sorted;

		if (count === undefined) {
			count = settings.count;
		}

		if (min > max) {
			temp = min;
			min = max;
			max = temp;
		}

		shuffle = new Array(max - min + 1);

		for (var i = 0 ; i < shuffle.length ; i++) {
			shuffle[i] = i + 1;
		}

		fyshuffle(shuffle);

		sorted = shuffle.slice(0, count);

		sorted.sort(sortComp);

		return sorted;
	}

	function generatePseudoRandom(min, max, count, games) {
		var result;
		
		result = new Array(games);
		
		for (var i = 0 ; i < games ; i++) {
			result[i] = arrayToString(generatePseudoRandomSingle(min, max, count));
		}
		
		return result;
	}

	/*
	function dummy(min, max, count)
	{
		var shuffle;
		var temp;
		
		if (count === undefined) {
			count = settings.count;
		}

		if (min > max) {
			temp = min;
			min = max;
			max = temp;
		}

		shuffle = new Array(max - min + 1);
		
		for (var i = 0 ; i < shuffle.length ; i++) {
			shuffle[i] = 0;
		}
		
		return shuffle.slice(0, count);
	}
	*/

	function httpGetSync(theUrl)
	{
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	    xmlHttp.send( null );
	    return xmlHttp.responseText;
	}

	function httpGetAsync(theUrl, count, preCallback, afterCallback)
	{
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function() { 
	        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
	        	preCallback(xmlHttp.responseText, count, afterCallback);
	        }
	    };
	    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
	    xmlHttp.send(null);
	}
	
	function trueRandomUrlBuilder(min, max)
	{
		var url;

		url = settings.truerandomUrl + "&min=" + min + "&max=" + max + "&col=1";
		
		return url;
	}
	
	function preCallback(responseTxt, count, afterCallback)
	{
		var arry;
		var result;
		
		arry = responseTxt.split("\n").slice(0, count);
		
		arry.sort(sortComp);
		
		result = new Array(1);
		result[0] = arrayToString(arry);
		
		afterCallback(result);
	}
	
	function generateTrueRandom(min, max, count, games, afterCallback) {
		var url = trueRandomUrlBuilder(min, max);
		
		httpGetAsync(url, count, preCallback, afterCallback);
	}

	lotto.get = function(games, callback) {
		var min = settings.min;
		var max = settings.max;
		var count = settings.count;

		if (games === undefined) {
			games = settings.games;
		}
		
		if (callback === undefined) {
			return settings.generate(min, max, count, games);
		}
		
		settings.generate(min, max, count, games, callback);
	};

	lotto.getGames = function() {
		return settings.games;
	};

	lotto.setGames = function(games) {
		settings.games = games;
	};

	lotto.incGames = function() {
		if (settings.games >= settings.maxGames) {
			return;
		}

		settings.games++;
	};

	lotto.decGames = function() {
		if (settings.games <= 1) {
			return;
		}

		settings.games--;
	};
	
	lotto.setRandomMethod = function(useTrueRandom) {
		if (useTrueRandom === undefined || useTrueRandom === false) {
			settings.generate = generatePseudoRandom;
		} else {
			settings.generate = generateTrueRandom;
		}
	};
	
	/* Returns true if trueRandom method or else returns false */
	lotto.getRandomMethod = function() {
		if (settings.generate === generateTrueRandom) {
			return true;
		} else {
			return false;
		}
	};
	
	lotto.setCallbackTrueRandom = function(callback) {
		settings.callbackTrueRandom = callback;
	};

	return lotto;
}());
