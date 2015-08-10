var utils = (function() {

    'use strict';

    function $(elementOrId) {

        var result = false;

        if (elementOrId !== null) {

            if (typeof elementOrId === "string") {

                result = document.getElementById(elementOrId);
                return $(result);
            } else {

                result = elementOrId;
            }
        }

        return result;
    }

    function $$(elementOrClass) {

        var result = false;

        if (elementOrClass !== null) {

            if (typeof elementOrClass === "string") {

                result = document.querySelectorAll(elementOrClass);
                return $$(result);
            } else {

                result = elementOrClass;
            }
        }

        return result;
    }

    //Returns true if it is a DOM node
    function isNode(o){

        return (

            typeof Node === "object" ? o instanceof Node : 
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
        );
    }

    //Returns true if it is a DOM element    
    function isElement(o){

        return (

            typeof HTMLElement === "object" ? o instanceof HTMLElement : 
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );
    }

    function createElement(type, parent) {

        var element = document.createElement(type);
       
        for (var i = 2; i < arguments.length; i++) {

            // Check if object is an array
            if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {

                element[arguments[i][0]] = arguments[i][1];
            }
        }

        if (parent && utils.isElement(parent)) {

            parent.appendChild(element);
        } else {

            return element;
        }
    }

    function getJSON(path, callback) {

        var httpRequest = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        httpRequest.onreadystatechange = function() {

            if (httpRequest.readyState === 4 || httpRequest.readyState === 0) {

                if (httpRequest.status === 200) {

                    var data = JSON.parse(httpRequest.responseText);

                    if (callback) {

                        callback(data);
                    }
                }
            }
        };

        httpRequest.open('GET', path);
        httpRequest.send(); 
    }

    function fuzzySearch(substr, str) {

        var result = str.toLowerCase(), i = 0, n = -1, l;

        substr = substr.toLowerCase();

        for (; l = substr[i++] ;) {

            if (!~(n = result.indexOf(l, n + 1))) {

                return false;
            }
        }

        return true;
    }

    function preventEnter(e) {

        e = e || window.event;

        if (event.keyCode == 13) {

            e.preventDefault();
            return false;
        }
    }

    return {
        $: $,
        $$: $$,
        isNode: isNode,
        isElement: isElement,
        createElement: createElement,
        getJSON: getJSON,
        fuzzySearch: fuzzySearch,
        preventEnter: preventEnter
    };
})();