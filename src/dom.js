/**
 *
 * Dom Functions
 *
 * Contains Wrappers for Dom functions to simplify dom manipulation.
 *
 * @author christian.micklisch@successwithsos.com
 */

/**
 * Checks to see if the query exists inside of the dom, if so then the
 * existsFunction is called.
 * 
 * @param  {String}   query          The query to get the dom object.
 * @param  {Function} existsFunction [description]
 */
function queryExists(query = "query", existsFunction = function() {}) {
    const dom = document.querySelector(query);

    if (dom !== null) {
        existsFunction();
    } else {
        console.error(query + " cannot be found in the document");
    }
}

/**
 * Returns an array of the document query selection.
 * 
 * @param  {String} query The query to get the dom object.
 * @return {Array}        An array of all of the doms that equal the query.
 */
function queryToArray(query = "body") {
    const domObject = document.querySelectorAll(query);
    return Object.keys(domObject).filter((domObjectKey) => {
        return typeof domObject[domObjectKey] === 'object';
    }).map((key) => {
        return domObject[key];
    });
}

/**
 * Adds the given event function to the current event function, if one does not
 * exist it creates one.
 * 
 * @link   http://www.dannytalk.com/how-to-handle-multiple-window-events-in-javascript/
 * @param  {Function}  func The function to call onresize.
 */
function addEvent(query = 'body', event = 'onclick', eventFunction) {

    if (eventFunction === undefined) {
        return;
    }
    
    queryExists(
        query,
        () => queryToArray(query).map(dom => {
            let eventWrapperFunction = () => {
                try {
                    eventFunction();
                } catch(e) {
                    console.error("Failed to run: " + eventFunction);
                }
            };

            if (typeof dom[event] == 'function') {
                eventWrapperFunction = () => {
                    try {
                        dom[event]();
                    } catch(e) {
                        console.error("Failed to run: " + dom[event]);
                    }

                    try {
                        eventFunction();
                    } catch(e) {
                        console.error("Failed to run: " + eventFunction);
                    }
                }
            }

            dom[event] = eventFunction;
        })
    );
}

/**
 * Easy addition to multi event functions. Helpful for mobile and desktop clicking.
 * 
 * @param {String}   query         The query used to reference an object
 * @param {Array}    events        The specific event to capture on the element,
 * @param {Function} eventFunction The function to trigger when the event is captured.
 */
export function addEvents(query = 'body', events = [], eventFunction = function() {}) {
    events.forEach(e => addEvent(query, 'on' + e, eventFunction));
}

/**
 * Adds a class to the given dom.
 * 
 * @param {String} query     The query used to reference an object
 * @param {String} className The class to add.
 */
export function addClass(query = 'body', className = 'hidden') {
    queryExists(
        query,
        () => queryToArray(query).map(dom => {
            if (dom.className.split(' ').indexOf(className) === -1) {
                dom.className += ' ' + className;
                dom.className = dom.className.trim();
            }
        })
    );
}

/*
 * Removes a class from a given dom.
 * 
 * @param {String} query     The query used to reference an object
 * @param {String} className The class to remove.
 */
export function removeClass(query = 'body', className = 'hidden') {
    queryExists(
        query,
        () => queryToArray(query).map(function(dom) {
            if (dom.className.split(' ').indexOf(className) !== -1) {
                var classNameIndex = dom.className.split(' ').indexOf(className);
                var classArray = dom.className.split(' ');
                classArray.splice(classNameIndex, 1);
                dom.className = classArray.join(' ');
            }
        })
    );
}