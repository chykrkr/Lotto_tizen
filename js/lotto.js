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

	function generate(min, max, count) {
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

	lotto.get = function(games) {
		var result;
		var min = settings.min;
		var max = settings.max;
		var count = settings.count;

		if (games === undefined) {
			games = settings.games;
		}

		result = new Array(games);

		for (var i = 0 ; i < games ; i++) {
			result[i] = arrayToString(generate(min, max, count));
		}

		return result;
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

	return lotto;
}());
