/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* RSS feeds suite */
    describe('RSS Feeds', function() {
        /* Make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* This test loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty. */

         it('have a name defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });

    });

    /* The menu suite */
    describe('The menu', function() {

         /* This test ensures the menu element is hidden by default */
         it('element is hidden by default', function() {
            const $body = $('body');
            expect($body.hasClass('menu-hidden')).toBe(true);
         });

         /* This test ensures the menu changes visibility when the menu icon is clicked. */
          it('changes visibility when the menu item is clicked.', function() {
            // const body = document.querySelector('body');
            const $body = $('body');
            // const menu = document.querySelector('.menu-icon-link');
            const $menu = $('.menu-icon-link');
            $menu.click();
            expect($body.hasClass('menu-hidden')).toBe(false);
            // does it hide when clicked again.
            $menu.click();
            expect($body.hasClass('menu-hidden')).toBe(true);

          });

    });

    /* Initial Entries suite */
    describe('Ininital Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

         beforeEach(function(done) {
            loadFeed(0, done);   // passing the "0" function lets Jasmine know that our beforeEach function is done, and can proceed with the test. in other words, once the feed is loaded, process with the test.

         });

         it('completes its work', function() {
            const $feed = $('.feed .entry');
            expect($feed.length).toBeGreaterThan(0); // TODO: not sure what is wrong.

         });


    })


    /* New Feed Selection suite */
    describe('New Feed Selection', function() {
        let feed = document.querySelector('.feed'); // store .feed element in feed variable
        let firstFeed = []; // store first feed's content in empty array
        let newFeedData = [];

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {

            loadFeed(0, function() {
                // feed 0 done loading

                Array.from(feed.children).forEach(function(feed) {
                    firstFeed.push(feed.innerText);

                    loadFeed(1, function() {
                        Array.from(feed.children).forEach(function(feed) {
                            newFeedData.push(feed.innerText);
                        })

                        // all variables initialized, can begin test
                        done();

                    });
                });
            });
        });

        it('content changed', function() {
            expect(firstFeed).not.toEqual(newFeedData);
         });

    });

}());
