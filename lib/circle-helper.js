/*
 *      Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */

/*global tau */
/*jshint unused: vars*/
var page,
        elScroller,
        list,
        listHelper = [],
        snapList = [],
        i,
        len;

function evtlstPagebeforeshow(e) {
	page = e.target;
    elScroller = page.querySelector(".ui-scroller");
      /**
     * If elScroller existed, set 'tizen-circular-scrollbar' attribute
       */
    if (elScroller) {
        list = elScroller.querySelectorAll(".ui-listview");
        if (list) {
            if (page.id !== "pageMarqueeList" && page.id !== "pageTestVirtualList" && page.id !== "pageAnimation") {
                len = list.length;
                for (i = 0; i < len; i++) {
                    listHelper[i] = tau.helper.SnapListStyle.create(list[i]);
                }
                len = listHelper.length;
                if (len) {
                    for (i = 0; i < len; i++) {
                        snapList[i] = listHelper[i].getSnapList();
                    }
                }
            }
        }
    }
}

function evtlstPagebeforehide(e)
{
	len = listHelper.length;
    if (len) {
        for (i = 0; i < len; i++) {
            listHelper[i].destroy();
        }
        listHelper = [];
    }
}

function circle_helper(tau) {
	document.addEventListener('rotarydetent', function(ev) {
	    /* Get the direction value from the event */
	    var direction = ev.detail.direction;
	    var delta = 40;

	    if (direction == 'CW') {
	        /* Add behavior for clockwise rotation */
	        document.querySelector('.ui-scroller').scrollTop += delta;	        
	    } else if (direction == 'CCW') {
	        /* Add behavior for counter-clockwise rotation */
	    	document.querySelector('.ui-scroller').scrollTop -= delta;
	    }

	    //console.log(document.querySelector('.ui-scroller').scrollTop);
	});
	
	/*
    document.removeEventListener("pagebeforeshow", evtlstPagebeforeshow);
    document.removeEventListener("pagebeforehide", evtlstPagebeforehide);

    if (tau.support.shape.circle) {
        document.addEventListener("pagebeforeshow", evtlstPagebeforeshow);
        document.addEventListener("pagebeforehide", evtlstPagebeforehide);
    }
    */
};

circle_helper(tau);