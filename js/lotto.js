function lottoString()
{
	return lottoArrayToString(lotto(1,45));
}

function lottoArrayToString(arr)
{
	var result = "";
	
	for (var i = 0 ; i < arr.length - 1 ; i++) {
		result += ('0' + arr[i]).slice(-2);
		result += '-';
	}
	
	result += ('0' + arr[arr.length - 1]).slice(-2);
	
	return result;
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

function lotto(min, max, count) {
	var shuffle;
	var temp;
	var sorted;
	
	if (count === undefined) {
		count = 6;
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
	
	sorted.sort(function(a, b){return a - b});
	
	return sorted;
}