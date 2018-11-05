(function mainWrapper() {
    'use strict';

    /**
     * Service application id.
     *
     * @const {string}
     */
    var SERVICE_APP_ID = 'org.example.hybridservice',


        /**
         * Start button element.
         *
         * @type {HTMLElement}
         */
        startBtn = document.getElementById('btn-start'),

        /**
         * Logs list element.
         *
         * @type {HTMLElement}
         */
        logsListEl = document.getElementById('logs'),

        /**
         * Alert popup.
         *
         * @type {HTMLElement}
         */
        alertPopup = document.getElementById('alert-popup'),
        JSON_DATA = 
        [
         //{DATA:}
        ],
        
        vlist
        ;
    
    function makeLottoElem()
    {
    	var newElement;

    	newElement = document.createElement('LI');
    	newElement.classList.add('ul-li-static');
    	//newElement.classList.add('ui-snap-listview-item');
    	//ul-li-static ui-snap-listview-item ui-snap-listview-selected
    	newElement.innerHTML = '<div class="li-text-sub">' +
        lottoString() + '</div>';
        
        return newElement;
    }
    
    function refreshLotto(first, count)
    {
    	var child, scroller;
    	
    	if (count === undefined) {
    		count = 5;
    	}
    	
    	if (first === undefined) {
    		first = false;
    	}
    	
    	if (first) {
    		if (count > 0) {
        		child = makeLottoElem();
        		child.classList.add('ui-snap-listview-selected');
        		logsListEl.appendChild(child);
        	}
        	
        	for (var i = 1 ; i < count ; i++) {
        		logsListEl.appendChild(makeLottoElem());
        	}
    	} else {
    		count = logsListEl.children.length;

    		for (var i = 0 ; i < count ; i++) {
        		logsListEl.children[i].innerHTML = '<div class="li-text-sub">'  +
                lottoString() + '</div>';
        	}
    	}

    	//reset scroll to top
    	scroller = document.querySelector('.ui-scroller');
    	
    	if (scroller != undefined) {
    		scroller.scrollTop = 0;
    	}
    	
    	//document.querySelector('#main').querySelector('.ui-scroller').firstChild.style = 'transform: translate(0px, 0px);';
    	//circle_helper(tau);
    	
    	//evtlstPagebeforehide({});
    	//evtlstPagebeforeshow({target:document.querySelector('#main')})
    }
    
    /**
     * Displays popup with alert message.
     *
     * @param {string} message
     */
    function showAlert(message) {
        alertPopup.querySelector('#message').innerHTML = message;
        tau.openPopup(alertPopup);
        alertPopup.addEventListener('click', function onClick() {
            tau.closePopup(alertPopup);
        });
    }

    /**
     * Performs action when getAppsContext method of tizen.application API
     * results in error.
     *
     * @param {Error} err
     */
    function onGetAppsContextError(err) {
        console.error('getAppsContext exc', err);
    }

    /**
     * On click on start button handler.
     */
    function onStartBtnTap() {
    	//showAlert("test");
    	//refreshLotto();
    	//location.reload(true);
    	//test();
    	//evtlstPagebeforehide({});
    	refreshLotto();
    }

    /**
     * Creates TAU Selector and bind it's events.
     */
    function bindSelectorEvents() {
        var page = document.querySelector('#main'),
            elSelector = page.querySelector('#selector'),
            handler = page.querySelector('.popup-handler'),
            popup = page.querySelector('#selector-popup'),
            selector = null;
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
            } else if (pageid === "list") {
                tau.changePage("#main");
            } else {
                window.history.back();
            }
        }
    }

    /**
     * Initializes main module.
     */
    function initMain() {
    	refreshLotto(true);
    	
    	startBtn.addEventListener('click', onStartBtnTap);

    	// Add event listeners for Tizen hardware key
        window.addEventListener('tizenhwkey', keyEventHandler);
    	
    	return;
    	
    	// Add event listeners for tauMoreOptions & tauList components.
        document.querySelector("#main").addEventListener("pagebeforeshow", function() {
            tauMoreOptions.pageBeforeShowHandler("#main");
        });
    	
        
        document.querySelector("#main").addEventListener("pagebeforehide", tauMoreOptions.pageHideHandler);
    }

    initMain();
})();