
((function() {

    requirejs.config({
        paths: {
            q: "/lib/q",
            tests: "/tests",
            "ortc": "/lib"
        }
    });

    var ready = Q.defer();

    window.__TestHarnessReady = ready.promise;

    require([
        "q/q",
        "ortc/ortc"
    ], function(Q, ORTC) {

        window.HELPERS = {
        };

        // Wait for DOM to be ready.
        $(document).ready(function() {

            $("BUTTON.link-rerun").click(function() {
                location.reload(true);
            });

            // Signal that everything is ready for use.
            ready.resolve();
        });
    });

})());
