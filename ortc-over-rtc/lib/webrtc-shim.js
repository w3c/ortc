
// @source https://raw.github.com/openpeer/webrtc-shim/v0.1.2/webrtc-shim.js

define(function() {

  // begin compatibility insanity

  var IceCandidate, MediaStream, PeerConnection, SessionDescription, URL,
      attachStream, browser, extract, getUserMedia, processSDPIn,
      processSDPOut, removeCN, replaceCodec, shim, supported, useOPUS;


  // First we deal with vendor prefixes

  PeerConnection = window.mozRTCPeerConnection || window.PeerConnection ||
    window.webkitPeerConnection00 || window.webkitRTCPeerConnection;

  IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;

  SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;

  MediaStream = window.MediaStream || window.webkitMediaStream;

  getUserMedia = navigator.mozGetUserMedia || navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.msGetUserMedia;

  URL = window.URL || window.webkitURL || window.msURL || window.oURL;


  // getUserMedia errors unless it is bound to the scope of navigator

  if (getUserMedia) {
    getUserMedia = getUserMedia.bind(navigator);
  }

  // Very simple browser detection for chrome and FF

  browser = (navigator.mozGetUserMedia ? 'firefox' : 'chrome');
  supported = (PeerConnection && getUserMedia);


  // Simple util for dealing with regex matches
  extract = function (str, reg) {
    var match = str.match(reg);
    return (match ? match[1] : null);
  };

  // replaceCodec takes an SDP line with a codec in it and replaces it with a new codec
  replaceCodec = function (line, codec) {
    var el, els, out, i, len;
    els = line.split(' ');
    out = [];
    for (i = 0, len = els.length; i < len; ++i) {
      el = els[i];
      if (i === 3) {
        out[i++] = codec;
      }
      if (el !== codec) {
        out[i++] = el;
      }
    }
    return out.join(' ');
  };

  // Removes troublesome CN lines from SDP messages that causes certain browsers to crash
  removeCN = function (lines, mLineIdx) {
    var cnPos, idx, line, mLineEls, payload, i, len;
    mLineEls = lines[mLineIdx].split(' ');
    for (i = 0, len = lines.length; i < len; ++i) {
      line = lines[i];
      if (!line) continue;

      payload = extract(line, /a=rtpmap:(\d+) CN\/\d+/i);

      if (payload) {
        cnPos = mLineEls.indexOf(payload);
        if (cnPos !== -1) {
          mLineEls.splice(cnPos, 1);
        }
        lines.splice(i, 1);
      }
    }
    lines[mLineIdx] = mLineEls.join(' ');
    return lines;
  };

  // Replace audio codecs in SDP with OPUS
  useOPUS = function (sdp) {
    var line, lines, mLine, mLineIdx, payload, i, len;
    lines = sdp.split('\r\n');

    mLine = lines.filter(function(el){
      return line.indexOf('m=audio') !== -1;
    })[0];
    mLineIdx = lines.indexOf(mLine);

    if (!mLineIdx) return sdp;

    for (i = 0, len = lines.length; i < len; ++i) {
      line = lines[i];
      if (line.indexOf('opus/48000') === -1) continue;
      payload = extract(line, /:(\d+) opus\/48000/i);
      if (payload) {
        lines[mLineIdx] = replaceCodec(lines[mLineIdx], payload);
      }
      break;
    }
    lines = removeCN(lines, mLineIdx);
    return lines.join('\r\n');
  };

  // Use this to format all outbound SDP Messages
  processSDPOut = function (sdp, env) {
    var addCrypto, lines, line, out;
    if (!env) env = browser; // for testing

    out = [];
    lines = sdp.split('\r\n');
    if (env === 'firefox') {
      // FF does not support crypto yet - chrome does not support unencrypted though.
      // If FF makes an offer to chrome you need to put a fake crypto key in or chrome will ignore it
      addCrypto = "a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:BAADBAADBAADBAADBAADBAADBAADBAADBAADBAAD";
      lines.forEach(function(line){
        out.push(line);
        if (line.indexOf('m=') === 0) {
          out.push(addCrypto);
        }
      });
    } else {
      out = lines.filter(function(line){
        return line.indexOf("a=ice-options:google-ice") !== -1;
      });
    }
    return useOPUS(out.join('\r\n'));
  };

  // Use this to format all inbound SDP messages - currently does nothing
  processSDPIn = function (sdp, env) {
    if (!env) env = browser; // for testing
    return sdp;
  };

  // Util for attaching a video stream to a DOM element
  attachStream = function (uri, el) {
    var i, len;
    if (typeof el === "string") {
      return attachStream(uri, document.getElementById(el));
    } else if (el.jquery) {
      el.attr('src', uri);
      for (i = 0, len = el.length; i < len; i++) {
        el[i].play();
      }
    } else {
      el.src = uri;
      el.play();
    }
    return el;
  };


  // Patches over RTC prototypes with missing functions
  // Also exposes a config based on browser. FF and chrome require certain configs for interop
  shim = function () {
    var PeerConnConfig, mediaConstraints, out;
    if (!supported) {
      // no need to shim
      return;
    }
    if (browser === 'firefox') {
      PeerConnConfig = {
        iceServers: [{
            url: "stun:23.21.150.121" // FF doesn't support resolving DNS in iceServers yet
          }
        ]
      };
      mediaConstraints = {
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true,
          MozDontOfferDataChannel: true // Tell FF not to put datachannel info in SDP or chrome will crash
        }
      };
      // FF doesn't expose this yet
      MediaStream.prototype.getVideoTracks = function () {
        return [];
      };
      MediaStream.prototype.getAudioTracks = function () {
        return [];
      };
    } else {
      PeerConnConfig = {
        iceServers: [{
            url: "stun:stun.l.google.com:19302"
          }
        ]
      };
      mediaConstraints = {
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
        },
        optional: [{
            DtlsSrtpKeyAgreement: true
          }
        ]
      };
      // API compat for older versions of chrome
      if (!MediaStream.prototype.getVideoTracks) {
        MediaStream.prototype.getVideoTracks = function () {
          return this.videoTracks;
        };
        MediaStream.prototype.getAudioTracks = function () {
          return this.audioTracks;
        };
      }
      if (!PeerConnection.prototype.getLocalStreams) {
        PeerConnection.prototype.getLocalStreams = function () {
          return this.localStreams;
        };
        PeerConnection.prototype.getRemoteStreams = function () {
          return this.remoteStreams;
        };
      }
    }
    // Not a shim - custom to holla. Allows you to do stream.pipe(element) which is more elegant than attachStream(streamUri, el)
    MediaStream.prototype.pipe = function (el) {
      var uri;
      uri = URL.createObjectURL(this);
      attachStream(uri, el);
      return this;
    };
    out = {
      PeerConnection: PeerConnection,
      IceCandidate: IceCandidate,
      SessionDescription: SessionDescription,
      MediaStream: MediaStream,
      getUserMedia: getUserMedia,
      URL: URL,
      attachStream: attachStream,
      processSDPIn: processSDPIn,
      processSDPOut: processSDPOut,
      PeerConnConfig: PeerConnConfig,
      browser: browser,
      supported: supported,
      constraints: mediaConstraints,
      // This stuff is exposed for testing
      useOPUS: useOPUS,
      removeCN: removeCN,
      replaceCodec: replaceCodec
    };
    return out;
  };

  return shim();

});
