
define([
    "ortc/ortc.abstract",
    "ortc/sdp",
    "ortc/rtc",
    "ortc/util",
    "ortc/eventemitter2"
], function(AORTC, SDP, RTC, UTIL, EVENTS) {

    var ORTC = Object.create(AORTC);



    /* ########################################################################
     * # Connection
     * ######################################################################## */

    var SUPER_Connection = ORTC.Connection;
    var Connection = function(options) {
        var self = this;

        SUPER_Connection.apply(self, arguments);

        // Support multiple sockets.
        self._rtcSession = new RTC(self, self._sockets[0]);

        var candidates = [];
        self._rtcSession.on("onicecandidate", function(candidate) {
            if (!candidate) {
                if (self.hasOwnProperty("onconnectioncandidatesdone")) {
                    self.onconnectioncandidatesdone(candidates);
                }
            } else {
                var obj = UTIL.fromNativeCandidateObject(candidate);
                obj.socketId = self._rtcSession._socket.id;
                candidates.push(obj);
                if (self.hasOwnProperty("onconnectioncandidate")) {
                    self.onconnectioncandidate(obj);
                }
            }
        });

        self._rtcSession.on("onaddstream", function(stream) {
            if (self.hasOwnProperty("onstreamconnected")) {
                // TODO: Include options for second argument.
                self.onstreamconnected(stream, {});
            }
        });

        self._rtcSession.on("connected", function() {
            if (self.hasOwnProperty("onconnected")) {
                self.onconnected();
            }
        });
 
        self._rtcSession.on("disconnected", function() {
            if (self.hasOwnProperty("ondisconnected")) {
                // TODO: Set appropriate `<reason>`.
                self.ondisconnected("<reason>");
            }
        });
    }

    Connection.prototype = Object.create(SUPER_Connection.prototype);
    ORTC.Connection = Connection;

    Connection.prototype.setDescription = function(description, selector) {
        SUPER_Connection.prototype.setDescription.apply(this, arguments);
        if (selector !== false && selector !== "local") {
            this._rtcSession.notifyChange();
        }
    }

    Connection.prototype.addRemoteConnectionCandidate = function(candidateOrCandidates) {
        var self = this;
        function add(candidateObj) {
            self._rtcSession.addIceCandidate(UTIL.toNativeCandidateObject(candidateObj));
        }
        if (Array.isArray(candidateOrCandidates)) {
            candidateOrCandidates.forEach(add);
        } else {
            add(candidateOrCandidates);
        }
    }

    Connection.prototype.sendStream = function(stream, options) {
        SUPER_Connection.prototype.sendStream.apply(this, arguments);
        this._rtcSession.setStream(this._streams[stream.id]);
        return stream;
    }

    Connection.prototype.disconnect = function() {
        this._rtcSession.disconnect();
    }



    /* ########################################################################
     * # Helpers
     * ######################################################################## */

    ORTC.getConstraints = AORTC.getConstraints = UTIL.getConstraints;

    AORTC._getRandomString = UTIL.getRandomString;
    AORTC._getRandomNumber = UTIL.getRandomNumber;
    AORTC._deepCopy = UTIL.deepCopy;

    return ORTC;
});
