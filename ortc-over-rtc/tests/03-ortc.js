define([
    "ortc/webrtc-shim",
    "ortc/ortc",
    "ortc/rtc"
], function (WEBRTC_SHIM, ORTC, RTC) {

    suite('`ORTC`', function() {

        test('must be an object', function() {
            ASSERT.isObject(ORTC);
        });

        test('must export function `getConstraints`', function() {
            ASSERT.isFunction(ORTC.getConstraints);
            ASSERT.isObject(ORTC.getConstraints());            
        });

        test('must export function `getFeatures`', function() {
            ASSERT.isFunction(ORTC.getFeatures);
            ASSERT.isArray(ORTC.getFeatures());            
        });

        test('must export function `MediaSocket`', function() {
            ASSERT.isFunction(ORTC.MediaSocket);
        });

        test('must export function `DataSocket`', function() {
            ASSERT.isFunction(ORTC.DataSocket);
        });

        test('must export function `MediaDataSocket`', function() {
            ASSERT.isFunction(ORTC.MediaDataSocket);
        });

        test('must export function `Connection`', function() {
            ASSERT.isFunction(ORTC.Connection);
        });

        suite('`Connection` instance', function() {

            var pc = new ORTC.Connection();

            test('must be an object', function() {
                ASSERT.isObject(pc);
            });
            test('must export function `onconnectioncandidate`', function() {
                ASSERT.isFunction(pc.onconnectioncandidate);
            });
            test('must export function `onconnectioncandidatesdone`', function() {
                ASSERT.isFunction(pc.onconnectioncandidatesdone);
            });
            test('must export function `onactiveconnectioncandidate`', function() {
                ASSERT.isFunction(pc.onactiveconnectioncandidate);
            });
            test('must export function `onconnected`', function() {
                ASSERT.isFunction(pc.onconnected);
            });
            test('must export function `ondisconnected`', function() {
                ASSERT.isFunction(pc.ondisconnected);
            });
            test('must export function `onstreamconnected`', function() {
                ASSERT.isFunction(pc.onstreamconnected);
            });
            test('must export function `onstreamdisconnected`', function() {
                ASSERT.isFunction(pc.onstreamdisconnected);
            });
            test('must export function `onsteamreport`', function() {
                ASSERT.isFunction(pc.onsteamreport);
            });
            test('must export function `ontrackconnected`', function() {
                ASSERT.isFunction(pc.ontrackconnected);
            });
            test('must export function `ontrackdisconnected`', function() {
                ASSERT.isFunction(pc.ontrackdisconnected);
            });
            test('must export function `ontrackcontributors`', function() {
                ASSERT.isFunction(pc.ontrackcontributors);
            });
            test('must export function `ontrackreport`', function() {
                ASSERT.isFunction(pc.ontrackreport);
            });
            test('must export function `activate`', function() {
                ASSERT.isFunction(pc.activate);
            });
            test('must export function `disconnect`', function() {
                ASSERT.isFunction(pc.disconnect);
            });
            test('must export function `addRemoteConnectionCandidate`', function() {
                ASSERT.isFunction(pc.addRemoteConnectionCandidate);
            });
            test('must export function `getDescription`', function() {
                ASSERT.isFunction(pc.getDescription);
            });
            test('must export function `setDescription`', function() {
                ASSERT.isFunction(pc.setDescription);
            });
            test('must export function `getConstraints`', function() {
                ASSERT.isFunction(pc.getConstraints);
            });
            test('must export function `setConstraints`', function() {
                ASSERT.isFunction(pc.setConstraints);
            });
            test('must export function `sendStream`', function() {
                ASSERT.isFunction(pc.sendStream);
            });
            test('must export function `receiveStream`', function() {
                ASSERT.isFunction(pc.receiveStream);
            });
            test('must export function `fork`', function() {
                ASSERT.isFunction(pc.fork);
            });

        });

        test('must export function `DTMFMediaStreamTrack`', function() {
            ASSERT.isFunction(ORTC.DTMFMediaStreamTrack);
        });

        test('must export function `DataStream`', function() {
            ASSERT.isFunction(ORTC.DataStream);
        });

    });
});
