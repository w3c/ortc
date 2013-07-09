
// `EventEmitter2` global comes from https://raw.github.com/hij1nx/EventEmitter2/master/lib/eventemitter2.js

define([
    "ortc/webrtc-shim",
    "ortc/sdp",
    "ortc/util",
    "ortc/eventemitter2"
], function(WEBRTC_SHIM, SDP, UTIL, EVENTS) {

    var RTC = function(connection, socket) {
        var self = this;

        self._connection = connection;
        self._socket = socket;

        self._sessionId = UTIL.getRandomNumber(10);
        self._sessionVersion = 0;

        var config = {
            iceServers: []
        };
        if (socket._stunServers.length > 0) {
            config.iceServers.concat(socket._stunServers.map(function(server) {
                return {
                    url: "stun:" + server.server + ((server.port)?":"+server.port:"")
                };
            }));
        }

        try {
            self._pc = new WEBRTC_SHIM.PeerConnection(config);
        } catch(err) {
            console.error(err.stack);
            throw err;
        }

        // @see http://www.w3.org/TR/webrtc (W3C Working Draft 21 August 2012)
        self._pc.onstatechange = function(event) {
            if (self._pc.readyState === "active") {
                self.emit("connected");
            } else
            if (self._pc.readyState === "closed") {
                self.emit("disconnected");
            }
        }

        self._pc.onicecandidate = function(event) {
            self.emit("onicecandidate", event.candidate);
        }

        self._pc.onaddstream = function (event) {
            self.emit("onaddstream", event.stream);
        };
    }

    RTC.prototype = Object.create(EVENTS.prototype);

    RTC.prototype.disconnect = function() {
        this._pc.close();
    }

    RTC.prototype.addIceCandidate = function(candidate) {
        try {
            this._pc.addIceCandidate(candidate);
        } catch(err) {
            console.error(err.stack);
            throw err;
        }
    }

    RTC.prototype.setStream = function(streamInfo) {
        // TODO: Remove stream and add again if same stream or don't add again.
        this._pc.addStream(streamInfo.stream);
    }

    RTC.prototype.notifyChange = function() {
        var self = this;

        if (self.notifyChange__active) return;
        self.notifyChange__active = true;
        function done() {
            self.notifyChange__active = false;
        }

        var sendStreams = [];
        var receiveStreams = [];
        for (var streamId in self._connection._streams) {
            if (self._connection._streams[streamId].direction === "send") {
                sendStreams.push(self._connection._streams[streamId]);
            } else {
                receiveStreams.push(self._connection._streams[streamId]);
            }
        }

        var offerSdp = SDP.generate(self._generateSdpObject(sendStreams));
        var answerSdp = SDP.generate(self._generateSdpObject(receiveStreams));

        self._pc.setLocalDescription(new WEBRTC_SHIM.SessionDescription({
            type: "offer",
            sdp: offerSdp
        }));

        self._pc.setRemoteDescription(new WEBRTC_SHIM.SessionDescription({
            type: "answer",
            sdp: answerSdp
        }));

        return done();
    }

    RTC.prototype._generateSdpObject = function(streams) {
        this._sessionVersion += 1;
        return SDP.generateSdpObject(this, streams);
    }

    return RTC;
});
