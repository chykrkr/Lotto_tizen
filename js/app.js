/* supress warnings */
/* global lotto, tau */

(function mainWrapper() {
    'use strict';

    /**
     * Service application id.
     *
     * @const {string}
     */
    var /**
	 * Start button element.
	 *
	 * @type {HTMLElement}
	 */
	startBtn = document.getElementById('btn-start'),

	incbtn = document.getElementById('btn_inc'),
	decbtn = document.getElementById('btn_dec'),

	/**
	 * Logs list element.
	 *
	 * @type {HTMLElement}
	 */
	logsListEl = document.getElementById('logs'),

	lottoGameCounter = document.getElementById('counter'),

	ui_more = document.querySelector(".ui-more"),

	prev_count = -1;

    function makeLottoElem()
    {
	var newElement;

	newElement = document.createElement('LI');
	newElement.classList.add('ul-li-static');

	return newElement;
    }

    function refreshLotto()
    {
	var scroller;
	var lottos;
	var i;

	lottos = lotto.get();

	if (logsListEl.children.length !== lottos.length) {
		logsListEl.innerHTML = "";

		for (i = 0 ; i < lottos.length ; i++) {
			logsListEl.appendChild(makeLottoElem());
		}
	}

	for (i = 0 ; i < lottos.length ; i++) {
		logsListEl.children[i].innerHTML = '<div class="li-text-sub">'  +
	    lottos[i] + '</div>';
	}

	scroller = document.getElementById('main').querySelector('.ui-scroller');

	//scroller = document.querySelector('.ui-scroller');

	if (scroller) {
		scroller.scrollTop = 0;
	}
    }

    /**
     * On click on start button handler.
     */
    function onStartBtnTap() {
	refreshLotto();
    }

    function keyEventHandler(event) {
	if (event.keyName === "back") {
	    var page = document.getElementsByClassName('ui-page-active')[0],
		popup = document.getElementsByClassName('ui-popup-active')[0],
		pageid = "main";

	    pageid = popup ? popup.id : (page ? page.id : "");

	    if (pageid === "main") {
		// Check if the main page is in recording or stand-by mode
		// If in stand-by mode, just close the application
		tizen.application.getCurrentApplication().exit();
	    } else if (pageid === "setting_lcount") {
		tau.changePage("#main");
	    } else {
		window.history.back();
	    }
	}
    }

    function optionHandler() {
	tau.changePage("#setting_lcount");
	lottoGameCounter.innerHTML = prev_count = lotto.getGames();
    }

    function onIncBtn() {
	lotto.incGames();
	lottoGameCounter.innerHTML = lotto.getGames();
    }

    function onDecBtn() {
	lotto.decGames();
	lottoGameCounter.innerHTML = lotto.getGames();
    }

    function pagebeforeshow(e) {
		var page = e.target;

		if (!page) {
			return;
		}

		if (page.id === "main") {
			if (prev_count !== lotto.getGames()) {
			refreshLotto();
		}
		}
    }

    function rotarydetent(ev) {
	/* Get the direction value from the event */
	var direction = ev.detail.direction;
	var delta = 40;
	var scroller;

	scroller = document.querySelector('.ui-scroller');

	if (!scroller) {
		return;
	}

	if (direction === 'CW') {
		/* Add behavior for clockwise rotation */
		scroller.scrollTop += delta;
	} else if (direction === 'CCW') {
		/* Add behavior for counter-clockwise rotation */
		document.querySelector('.ui-scroller').scrollTop -= delta;
	}
    }

    /**
     * Initializes main module.
     */
    function initMain() {

	if(startBtn) {
		startBtn.addEventListener('click', onStartBtnTap);
	}

	incbtn.addEventListener('click', onIncBtn);
	decbtn.addEventListener('click', onDecBtn);

	// Add event listeners for Tizen hardware key
	window.addEventListener('tizenhwkey', keyEventHandler);

	ui_more.addEventListener('click', optionHandler);

	document.addEventListener("pagebeforeshow", pagebeforeshow);

	document.addEventListener('rotarydetent', rotarydetent);
    }

    initMain();
})();
