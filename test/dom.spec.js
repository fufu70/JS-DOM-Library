import * as dom  from '../src/dom';

describe('dom', () => {

    describe('addQueryListener', () =>  {

        it('Must be a function', () => expect(dom.addQueryListener).toEqual(jasmine.any(Function)));

        it('Allows a single onclick event', () => {
            let clickTriggered = false;

            dom.addQueryListener('body', ['click'], () => {
                clickTriggered = true;
            });

            let event = document.createEvent("HTMLEvents");
            event.initEvent("click", true, true);
            event.eventName = "click";
            document.querySelector('body').dispatchEvent(event);

            expect(clickTriggered).toBe(true);
        });

        it('Attach a onclick and onchange event', () => {
            let clickTriggered = false;
            let changeTriggered = false;

            dom.addQueryListener('body', ['click'], (e) => {
                clickTriggered = true;
            });

            dom.addQueryListener('body', ['change'], (e) => {
                changeTriggered = true;
            });

            let clickEvent = document.createEvent("HTMLEvents");
            clickEvent.initEvent("click", true, true);
            clickEvent.eventName = "click";
            document.querySelector('body').dispatchEvent(clickEvent);

            let changeEvent = document.createEvent("HTMLEvents");
            changeEvent.initEvent("change", true, true);
            changeEvent.eventName = "change";
            document.querySelector('body').dispatchEvent(changeEvent);

            expect(clickTriggered).toBe(true);
            expect(changeTriggered).toBe(true);
        });

        it('Attach a onclick and onchange event in the same function call', () => {
            let eventCount = false;

            dom.addQueryListener('body', ['click', 'change'], (e) => {
                eventCount ++;
            });

            let clickEvent = document.createEvent("HTMLEvents");
            clickEvent.initEvent("click", true, true);
            clickEvent.eventName = "click";
            document.querySelector('body').dispatchEvent(clickEvent);

            let changeEvent = document.createEvent("HTMLEvents");
            changeEvent.initEvent("change", true, true);
            changeEvent.eventName = "change";
            document.querySelector('body').dispatchEvent(changeEvent);

            expect(eventCount).toEqual(2);
        });
    });

    describe('addClass', () => {
        it('Must be function', () => expect(dom.addClass).toEqual(jasmine.any(Function)));

        it('Must allow a single class to be added to a Dom object', () => {
            // clean the body class
            document.querySelector('body').className = '';

            dom.addClass('body', 'my-class');

            expect(document.querySelector('body').className).toEqual('my-class');
        });

        it('Add the same class twice to the same Dom Object', () => {
            // clean the body class
            document.querySelector('body').className = '';

            dom.addClass('body', 'my-class');
            dom.addClass('body', 'my-class');

            expect(document.querySelector('body').className).toEqual('my-class');
        });

        it('Applies multiple classes to a single Dom object', () => {
            // clean the body class
            document.querySelector('body').className = '';

            dom.addClass('body', 'new-class');
            dom.addClass('body', 'fast-gas');

            expect(document.querySelector('body').className).toEqual('new-class fast-gas');
        });

        it('Applies multiple classes to a single Dom object with a preexisting class', () => {
            // clean the body class
            document.querySelector('body').className = 'test';

            dom.addClass('body', 'new-class');
            dom.addClass('body', 'fast-gas');

            expect(document.querySelector('body').className).toEqual('test new-class fast-gas');
        });
    });

    describe('removeClass', () => {
        it('Must be a function', () => expect(dom.removeClass).toEqual(jasmine.any(Function)));

        it('Remove a single class from a Dom object', () => {
            // setup the body class
            document.querySelector('body').className = 'my-class';

            dom.removeClass('body', 'my-class');

            expect(document.querySelector('body').className).toEqual('');
        });

        it('Remove a non-existing class from a Dom object', () => {
            // setup the body class
            document.querySelector('body').className = 'my-class';

            dom.removeClass('body', 'className');

            expect(document.querySelector('body').className).toEqual('my-class');
        });

        it('Remove 2 classes from a Dom object', () => {
            // setup the body class
            document.querySelector('body').className = 'test my-class another-class';

            dom.removeClass('body', 'my-class');
            dom.removeClass('body', 'another-class');

            expect(document.querySelector('body').className).toEqual('test');
        });

        it('Remove all classes from a Dom object', () => {
            // setup the body class
            document.querySelector('body').className = 'test my-class another-class';

            dom.removeClass('body', 'my-class');
            dom.removeClass('body', 'another-class');
            dom.removeClass('body', 'test');

            expect(document.querySelector('body').className).toEqual('');
        });
    });

});