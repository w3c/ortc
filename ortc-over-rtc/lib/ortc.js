
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

                // e.g. `a=candidate:3792091120 1 udp 1845501695 174.4.24.244 52776 typ srflx raddr 192.168.1.146 rport 52776 generation 0`
                // See: http://tools.ietf.org/html/rfc5245#section-15.1

                var obj = {
                    candidateType: "ICE",
                    socketId: self._rtcSession._socket.id,
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    sdpMid: candidate.sdpMid
                };

                var m = candidate.candidate.match(/^a=candidate:(\S+)\s(\d+)\s(\S+)\s(\d+)\s(\S+)\s(\d+)\styp\s(\S+)(\s(.+))?\r\n$/);
                obj.foundation = m[1];
                obj.componentId = parseInt(m[2]);
                obj.transport = m[3];
                obj.priority = parseInt(m[4]);
                obj.connectionAddress = m[5];
                obj.connectionPort = parseInt(m[6]);
                obj.type = m[7];

                if (m[8]) {
                    var extraArgs = m[9].split(" ");
                    for (var i=0 ; i<extraArgs.length ; i+=2) {
                        if (extraArgs[i] === "raddr") {
                            obj.relatedAddress = extraArgs[i+1];
                        } else
                        if (extraArgs[i] === "rport") {
                            obj.relatedPort = parseInt(extraArgs[i+1]);
                        } else
                        if (extraArgs[i] === "generation") {
                            obj.generation = parseInt(extraArgs[i+1]);
                        } else {
                            obj[extraArgs[i]] = extraArgs[i+1];
                        }
                    }
                }

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

            // e.g. `a=candidate:3792091120 1 udp 1845501695 174.4.24.244 52776 typ srflx raddr 192.168.1.146 rport 52776 generation 0`
            // See: http://tools.ietf.org/html/rfc5245#section-15.1

            var candidateStr = [
                "a=candidate:" + candidateObj.foundation,
                candidateObj.componentId,
                candidateObj.transport,
                candidateObj.priority,
                candidateObj.connectionAddress,
                candidateObj.connectionPort,
                "typ",
                candidateObj.type
            ];
            if (candidateObj.relatedAddress) {
                candidateStr.push("raddr", candidateObj.relatedAddress);
            }
            if (candidateObj.relatedPort) {
                candidateStr.push("rport", candidateObj.relatedPort);
            }
            if (candidateObj.generation) {
                candidateStr.push("generation", candidateObj.generation);
            }

            self._rtcSession.addIceCandidate({
                sdpMLineIndex: candidateObj.sdpMLineIndex,
                sdpMid: candidateObj.sdpMid,
                candidate: candidateStr.join(" ")
            });
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
