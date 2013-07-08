---
title: WebRTC JavaScript Object RTC Examples
# abbrev: WebRTCJSObjExamples
docname: draft-raymond-rtcweb-webrtc-js-obj-rtc-examples-00
date: 2013-07-05
category: info

ipr: trust200902
area: General
workgroup: Network Working Group
keyword: Internet-Draft

stand_alone: yes
pi: [toc, sortrefs, symrefs]

author:
 -
    ins: R. Raymond
    name: Robin Raymond
    org: Hookflash
    street: 436, 3553 31 St. NW
    city: Calgary
    region: Alberta
    code: T2L 2K7
    email: robin@hookflash.com
 -
    ins: C. Dorn
    name: Christoph Dorn
    org: Independent
    street: 1999 Highway 97 South
    city: West Kelowna
    region: BC
    code: V1Z 1B2
    country: Canada
    email: christoph@christophdorn.com
 -
    ins: E. Lagerway
    name: Erik Lagerway
    org: Hookflash
    street: 436, 3553 31 St. NW
    city: Calgary
    region: Alberta
    code: T2L 2K7
    country: Canada
    email: erik@hookflash.com
 -
    ins: I. Baz Castillo
    name: Inaki Baz Castillo
    org: Versatica
    street: Barakaldo
    city: Basque Country
    country: Spain
    email: ibc@aliax.net
 -
    ins: R. Shpount
    name: Roman Shpount
    org: TurboBridge
    street: 4905 Del Ray Ave Suite 300
    city: Bethesda
    region: MD
    country: USA
    code: 20814
    email: rshpount@turbobridge.com


normative:
  WebRTCJSObj:
    target: http://tools.ietf.org/html/draft-raymond-rtcweb-webrtc-js-obj-rtc-00
    title: WebRTC JavaScript Object RTC
    author:
      name: Robin Raymond
      ins: R. Raymond
    date: 2013-07-05

informative:
  I-D.ietf-rtcweb-jsep: <!--JSEP -->
  I-D.raymond-rtcweb-webrtc-js-obj-api-rationale: <!-- WebRTC JavaScript Object API Rationale -->
  RFC2119: <!-- keywords -->
  WebRTC10:
    target: http://www.w3.org/TR/2012/WD-webrtc-20120821/
    title: WebRTC 1.0 Real-time Communication Between Browsers
    author:
      name: Adam Bergkvist
      ins: A. Bergkvist
    date: 2012-08-21
  MediaCapture:
    target: http://www.w3.org/TR/2013/WD-mediacapture-streams-20130516/
    title: Media Capture and Streams
    author:
      name: Daniel C. Burnett
      ins: D. Burnett
    date: 2013-05-29


--- abstract

This draft outlines example use cases with example code for using the WebRTC JavaScript Object RTC.

--- middle

Introduction        {#problems}
============

This draft is supplementary to the WebRTC JavaScript Object RTC draft {{WebRTCJSObj}} and outlines code examples when using the proposed object model. The code is written in a sequential fashion where both "Alice" and "Bob" roles are merged into a single code stream even though they would actually be split across the network. This is helpful for code illustration purposes, otherwise a sequence diagram and event firings to incorporate custom signaling would confuse the example but add virtually no value in understanding the sequences needing to be called to setup RTC communications.


Terminology
===========

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 {{RFC2119}}.




Example Use Cases
=================

Simple {#simple}
------

1. Browser A creates a connection
2. Browser A indicates the desire to connect to Browser B
3. Browser B creates a connection
4. Browser B sends response to Browser A
5. Browser A and B exchange candidates
6. Browser A and B are connected
7. Browser A and Browser B send media

### Example Code ### {#simpleexample}

This code illustrates both "Alice" and "Bob" forming a simple media stream connection (within the same code flow for documentation sake) where the external signaling is left up to the implementation. This is very similar to the "basic" use case in the current WebRTC 1.0 {{WebRTC10}}. Media streams capture and rendering details are not shown as they they fall with in the scope of the browser media stream API {{MediaCapture}}.

    //-------------------------------------------------------------------
    // STEP 1: Browser A creates a connection
    var alice_connection = new ORTC.Connection();
    
    //-------------------------------------------------------------------
    // STEP 2: Browser A indicates the desire to connect to Browser B
    var msg_connection_info_for_bob = JSON.stringify(
      alice_connection.getDescription());
    var msg_constraints_for_bob = JSON.stringify(
      alice_connection.getConstraints("receive"));
    
    alice_connection.receiveStream(aliceMediaStreamFromBob);
    
    mysignal(msg_connection_info_for_bob, msg_constraints_for_bob);
    
    //-------------------------------------------------------------------
    // STEP 3: Browser B creates a connection
    var bob_connection = new ORTC.Connection();    
    bob_connection.setDescription( JSON.parse(
      msg_connection_info_for_bob),"remote");
    bob_connection.setConstraints( JSON.parse(
      msg_constraints_for_bob), "send");
    
    bob_connection.receiveStream(bobMediaStreamFromAlice);
    bob_connection.sendStream(bobMediaStreamForAlice);
    
    //-------------------------------------------------------------------
    // STEP 4: Browser B sends response to Browser A
    var msg_connection_info_for_alice = JSON.stringify(
      bob_connection.getDescription());
    var msg_constraints_for_alice = JSON.stringify(
      bob_connection.getConstraints("receive"));
    
    mysignal(msg_connection_info_for_alice, msg_constraints_for_alice);
    
    alice_connection.setDescription( JSON.parse(
      msg_connection_info_for_alice), "remote");
    alice_connection.setConstraints( JSON.parse(
      msg_constraints_for_alice), "send");
    
    alice_connection.sendStream(aliceMediaStreamForBob);
    
    //-------------------------------------------------------------------
    // STEP 5: Browser A and B exchange candidates    
    // - tightly couple trickle ICE (usually sent over signaling channel)
    alice_connection.onconnectioncandidate = function(candidate) {
        bob_connection.addConnectionCandidate(
          JSON.parse(JSON.stringify(candidate)));
    });
    bob_connection.onconnectioncandidate = function(candidate) {
        alice_connection.addConnectionCandidate(
          JSON.parse(JSON.stringify(candidate)));
    });
    
    //-------------------------------------------------------------------
    // STEP 6: Browser A and B are connected
    alice_connection.onconnected = function() {
      // ... horray ...
    }
    
    bob_connection.onconnected = function() {
      // ... horray ...
    }
    
    //-------------------------------------------------------------------
    // STEP 7: Browser A and Browser B send media
    
    alice_connection.onstreamconnected = function(stream) {
      // ... horray ... stream can play now...
    }
    bob_connection.onstreamconnected = function(stream) {
      // ... horray ... stream can play now...
    }


### Same Under JSEP ###

This simple example {{simpleexample}} illistrates one simple concept, the local party dictates the codecs it wishes to receive. The same situation expressed in WebRTC 1.0 {{WebRTC10}} code is too unmanageable to publish so pseudo code will suffice to illustrate the comparison:

1. Alice creates an offer
2. Alice hold back setting the offer in the browser
2. Alice parses the offer SDP to extract out the codec / algorithm list, and converts to "mysignal" format
4. Alice signals "mysignal" format on the wire to Bob
5. Bob converts "mysignal" into a regenerated SDP offer format
6. Bob creates an answer (using the regenerated SDP offer)
7. Bob parses the SDP answer, extracts out the codec list, and prepare for "mysignal" format
9. Bob regenerates the SDP answer, changes the m-line to match the codec, changes all the "a=" to match the codecs from Alice, changes all the special "format" SDP attributes that match the payload id of the codecs
10. Bob set the new regenerated "replacement" answer back to the browser as a replacement answer
11. Bob signals "mysignal" format on the wire back to Alice
12. Alice generates a replacement offer based on Bob's codecs from "mysignal" format
13. Alice sets the replacement offer to the browser
12. Alice generates a new SDP answer based on Alice's original codecs
13. Alice gives the answer to the browser

Why is this so much more complicated under JSEP?

1. Requires SDP parsing, generating and format mangling to set "basic" things like codecs
2. Requires the SDP format to be understood, including the SSRC bundling information, even though only the codecs are re-arranged
3. The state machine requires a particular state order, in which operations must be followed
4. The SDP is a negotiated codec list, not a unidirectional codec list

Even ignoring the need to parse the SDP format (assuming a library is used to do that work), the code is still very difficult to use and manage.

In "mysignal" signaling, the remote party must only send to the codecs / payloads dictated by the local peer. Except, this is not how SDP works. An SDP offer dictates the sending codecs the remote peer should expect to receive, not the codec list the local peer wishes to receive. In this scenario, only when the answer arrives can the actual codec list for the offer be determined to "trick" SDP into thinking that's the way it wanted to "send" the codecs all along.

This could lead to the argument "follow the SDP way of doing constraints". That's part of the trouble, signaling protocols either have to bend over backwards to "follow the SDP way", or, just do SDP. The JSEP protocol is highly biased to a signal method of doing negotiations, that is SIP with SDP. All alternative signaling protocols are forced to carry an SDP parser and generated to utilize WebRTC despite not needing SDP, or, they are forced to use SDP.

This is merely one of many cases that is quite complex under JSEP.


More Complex {#morecomplex}
------------

1. Browser A creates a connection
2. Browser A indicates the desire to connect to Browser B, includes stream description
3. Browser B creates a connection, send browser A a stream description
4. Browser B sends response to Browser A
5. Browser A and B exchange candidates
6. Browser A and B are connected
7. Browser A and Browser B send media as defined in the stream descriptions

### Example Code ###

This case differs slightly from the simple example ({{simple}}) where Alice and Bob include details of their stream information on the wire rather than relying loose rules auto-assembly of the stream information. This ensures the streams sent over RTP are assembled exactly as specified by the sender for signaling situations (where this matters).

    //-------------------------------------------------------------------
    // STEP 1: Browser A creates a connection
    var alice_connection = new ORTC.Connection();
    
    //-------------------------------------------------------------------
    // STEP 2: Browser A indicates the desire to connect to Browser B
    var msg_connection_info_for_bob = JSON.stringify(
      alice_connection.getDescription());
    var msg_constraints_for_bob = JSON.stringify(
      alice_connection.getConstraints("receive"));
    var msg_stream_info_for_bob = JSON.stringify(
      alice_connection.getDescription(aliceStreamForBob));
    
    alice_connection.sendStream(aliceMediaStreamForBob);
    
    mysignal(
      msg_connection_info_for_bob,
      msg_constraints_for_bob,
      msg_stream_info_for_bob
      );
    
    //-------------------------------------------------------------------
    // STEP 3: Browser B creates a connection
    var bob_connection = new ORTC.Connection();    
    bob_connection.setDescription( JSON.parse(
      msg_connection_info_for_bob),"remote");
    bob_connection.setConstraints( JSON.parse(
      msg_constraints_for_bob), "send");
    
    bob_connection.receiveStream(
      bobMediaStreamFromAlice,
      JSON.parse(msg_stream_info_for_bob));
    bob_connection.sendStream(bobMediaStreamForAlice);
    
    //-------------------------------------------------------------------
    // STEP 4: Browser B sends response to Browser A
    var msg_connection_info_for_alice = JSON.stringify(
      bob_connection.getDescription());
    var msg_constraints_for_alice = JSON.stringify(
      bob_connection.getConstraints("receive"));
    var msg_stream_info_for_alice = JSON.stringify(
      alice_connection.getDescription(bobStreamForAlice));
    
    mysignal(
      msg_connection_info_for_alice,
      msg_constraints_for_alice,
      msg_stream_info_for_alice
      );
    
    alice_connection.setDescription( JSON.parse(
      msg_connection_info_for_alice), "remote");
    alice_connection.setConstraints( JSON.parse(
      msg_constraints_for_alice), "send");
    
    alice_connection.receiveStream(
      aliceMediaStreamFromBob,
      JSON.parse(msg_stream_info_for_alice));
    
    //-------------------------------------------------------------------
    // STEP 5: Browser A and B exchange candidates    
    // - tightly couple trickle ICE (usually sent over signaling channel)
    alice_connection.onconnectioncandidate = function(candidate) {
        bob_connection.addConnectionCandidate(
          JSON.parse(JSON.stringify(candidate)));
    });
    bob_connection.onconnectioncandidate = function(candidate) {
        alice_connection.addConnectionCandidate(
          JSON.parse(JSON.stringify(candidate)));
    });
    
    //-------------------------------------------------------------------
    // STEP 6: Browser A and B are connected
    alice_connection.onconnected = function() {
      // ... horray ...
    }
    
    bob_connection.onconnected = function() {
      // ... horray ...
    }
    
    //-------------------------------------------------------------------
    // STEP 7: Browser A and Browser B send media
    
    alice_connection.onstreamconnected = function(stream) {
      // ... horray ... stream can play now...
    }
    bob_connection.onstreamconnected = function(stream) {
      // ... horray ... stream can play now...
    }



Adding / Removing Streams
-------------------------

### Simple Example ###

1. Browser A creates a connection
2. Browser A indicates the desire to connect to Browser B
3. Browser B creates a connection
4. Browser B sends response to Browser A
5. Browser A and B exchange candidates
6. Browser A and B are connected
7. Browser A and Browser B send media
8. Browser A sends additional media stream
9. Browser A removes first media stream


#### Example Code ####

Steps 1-7 follow the example steps from the simple example ({{simpleexample}}).

    //-------------------------------------------------------------------
    // STEP 1 .. STEP 7: follows simple example steps
    
    // ... see simple example ...
    
    //-------------------------------------------------------------------
    // STEP 8: Browser A sends additional media stream
    
    alice_connection.sendStream(aliceFishTankStreamForBob);
    
    mysignal("to:bob", "+stream: fish tank cam");
    
    bob_connection.receiveStream(addedStreamFromAlice);
    
    //-------------------------------------------------------------------
    // STEP 9: Browser A removes first media stream
    
    alice_connection.sendStream(aliceMediaStreamForBob, false);
    
    mysignal("to:bob", "-stream: me");
    
    bob_connection.onstreamdisconnected = function(stream) {
      // ... can't see alice now ...
    }


### Complex Example ###

1. Browser A creates a connection
2. Browser A indicates the desire to connect to Browser B, includes stream description
3. Browser B creates a connection, send browser A a stream description
4. Browser B sends response to Browser A
5. Browser A and B exchange candidates
6. Browser A and B are connected
7. Browser A and Browser B send media as defined in the stream descriptions
8. Browser A creates a description for a new stream, sends to Browser B
9. Browser B listens for new stream based on description
10. Browser B notifies Browser A ready
11. Browser A send new stream to Browser B


#### Example Code ####

Steps 1-7 follow the example steps from the more complex example ({{morecomplex}}).

    //-------------------------------------------------------------------
    // STEP 1 .. STEP 7: follows more complex example steps
    
    // ... see more complex example ...
    
    //-------------------------------------------------------------------
    // STEP 8: Browser A creates a description for a new stream,
    //         sends to Browser B
    
    fishDes = alice_connection.getDescription(aliceFishTankStreamForBob);
    
    mysignal("to:bob","stream:info", JSON.stringify(fishDes));
    
    //-------------------------------------------------------------------
    // STEP 9: Browser B listens for new stream based on description
    
    bob_connection.receiveStream(
      addedStreamFromAlice,
      JSON.parse(fishDes));
    
    //-------------------------------------------------------------------
    // STEP 10: Browser B notifies Browser A ready
    
    mysignal("to:alice","stream:listening");
    
    //-------------------------------------------------------------------
    // STEP 11: Browser B notifies Browser A ready
    
    alice_connection.sendStream(aliceFishTankStreamForBob);


Audio with DTMF, Video and Data Sockets
---------------------------------------

### Use case ###

In this scenario, browser A wishes to use three separate sockets on three different ports. One for audio, one for video and one for data. The socket should not be muxed in this case for the various kind of media and streams. The code only differs from the simple example ({{simpleexample}}) by the following:

1. Alice and Bob create sockets with specific roles
2. Alice sends a data stream
3. Alice creates a DTMF media stream track and adds to audio / video stream
4. Bob listens for the DTMF media stream track to connect
5. Bob distinguishes the type of stream connected, i.e. media vs data (for unspecified purpose)

The code reflects only those changes needed to accomplish the task. In other words, the modularity allows object model code not to have to do bend to a state machine and the coder is free to treat the additions as independent tasks rather than having to be concerned with the impact it will have on the other components.


### Example Code ###

    //-------------------------------------------------------------------
    // STEP 1: Browser A creates sockets and a connection
    
    var alice_aSock = new ORTC.MediaSocket(
      "audio",
      {kinds:["audio", "dtmf"]});
    var alice_vSock = new ORTC.MediaSocket(
      "video",
      {kinds:["video"]});
    var alice_dSock = new ORTC.DataSocket();
    var alice_connection = new ORTC.Connection(
      {sockets:[alice_aSock, alice_vSock, alice_dSock]});
    
    //-------------------------------------------------------------------
    // STEP 2: Browser A indicates the desire to connect to Browser B
    var msg_connection_info_for_bob = JSON.stringify(
      alice_connection.getDescription());
    var msg_constraints_for_bob = JSON.stringify(
      alice_connection.getConstraints("receive"));
    
    alice_connection.receiveStream(aliceMediaStreamFromBob);
    alice_connection.sendStream(aliceDataStream);
    
    mysignal(msg_connection_info_for_bob, msg_constraints_for_bob);
    
    //-------------------------------------------------------------------
    // STEP 3: Browser B creates a connection
    var bob_aSock = new ORTC.MediaSocket(
      "audio",
      {kinds:["audio", "dtmf"]});
    var bob_vSock = new ORTC.MediaSocket(
      "video",
      {kinds:["video"]});
    var bob_dSock = new ORTC.DataSocket();
    var bob_connection = new ORTC.Connection(
      {sockets:[bob_aSock, bob_vSock, bob_dSock]});
    
    bob_connection.setDescription( JSON.parse(
      msg_connection_info_for_bob),"remote");
    bob_connection.setConstraints( JSON.parse(
      msg_constraints_for_bob), "send");
    
    bob_connection.receiveStream(bobMediaStreamFromAlice);
    bob_connection.sendStream(bobMediaStreamForAlice);
    
    //-------------------------------------------------------------------
    // STEP 4: Browser B sends response to Browser A
    var msg_connection_info_for_alice = JSON.stringify(
      bob_connection.getDescription());
    var msg_constraints_for_alice = JSON.stringify(
      bob_connection.getConstraints("receive"));
    
    mysignal(msg_connection_info_for_alice, msg_constraints_for_alice);
    
    alice_connection.setDescription( JSON.parse(
      msg_connection_info_for_alice), "remote");
    alice_connection.setConstraints( JSON.parse(
      msg_constraints_for_alice), "send");
    
    var aliceDtmfTrackToBob = 
        new ORTC.DtmfMediaStreamTrack(alice_aSock);
    var aliceMediaStreamForBob =
        new ORTC.MediaStream([aliceDtmfTrackToBob]);
    
    alice_connection.sendStream(aliceMediaStreamForBob);
    
    //-------------------------------------------------------------------
    // STEP 5: Browser A and B exchange candidates    
    // - tightly couple trickle ICE (usually sent over signaling channel)
    alice_connection.onconnectionandidate = function(candidate) {
        bob_connection.addConnectionCandidate(
          JSON.parse(JSON.stringify(candidate)));
    });
    bob_connection.onconnectioncandidate = function(candidate) {
        alice_connection.addConnectionCandidate(
          JSON.parse(JSON.stringify(candidate)));
    });
    
    //-------------------------------------------------------------------
    // STEP 6: Browser A and B are connected
    alice_connection.onconnected = function() {
      // ... horray ...
    }
    
    bob_connection.onconnected = function() {
      // ... horray ...
    }
    
    //-------------------------------------------------------------------
    // STEP 7: Browser A and Browser B send media
    
    alice_connection.onstreamconnected = function(stream) {
      // ... horray ... stream can play now...
      aliceDtmfTrackToBob.playTones("4,1,5,111222344#");
    }
    
    bob_connection.onstreamconnected = function(stream) {
      if (stream instanceof ORTC.DataStream) {
         // horray have data stream
      } else {
         // ... horray ... stream can play now...
       }
    }
    
    bob_connection.ontrackconnected = function(track) {
      if (track instanceof ORTC.DtmfMediaStreamTrack) {
        track.ontonestop = function(digit) {
          // ... react just like an IVR system! ...
        }
      }
    }


WebRTC 1.0 Comparison Example Usage Cases
=========================================

Stream Added
------------

Scenario:

1. Alice adds a new stream on an established session with Bob.

### WebRTC 1.0 ###

    //-------------------------------------------------------------------
    // Alice adds a new stream to the RTCPeerconnection and sends
    // the SDP Offer to Bob
    alice_RTCPeerConnection.addStream(stream);
    alice_RTCPeerConnection.createOffer(
      localDescriptionCreated, rtcError);
    
    var localDescriptionCreated = function(description) {
      alice_RTCPeerConnection.setLocalDescription(
        description, sendDescription, rtcError);
    }
    
    var sendDescription = function() {
      mySignal({sdp: alice_RTCPeerConnection.localDescription});
    }
    
    // Bob receives the SDP Offer from Alice, consumes it and
    // sends her the SDP Answer
    bob_RTCPeerConnection.setRemoteDescription(
      new RTCSessionDescription({type: 'offer', sdp: sdpOfferFromAlice}), 
      sendDescription, 
      rtcError
    );
    
    var sendDescription = function() {
      mySignal({sdp: bob_RTCPeerConnection.localDescription});
    }
    
    // Alice receives the Answer from Bob and processes it
    alice_RTCPeerConnection.setRemoteDescription(
      new RTCSessionDescription({type: 'answer', sdp: sdpAnswerFromBob}), 
      function(){}, 
      rtcError);

### Same Under WebRTC JS Object Model ###

    //-------------------------------------------------------------------
    // Alice sends the description of a new stream to Bob and prepares
    // the stream to be send after ICE discovery.
    var aliceStreamForBobDesc = alice_connection.getDescription(stream);
    alice_connection.sendStream(stream);
    
    mySignal({stream: aliceStreamForBobDesc});
    
    // Bob receives the new stream description and processes it
    bob_connection.receiveStream(aliceStreamForBobDesc);


Stream Removed
--------------

Scenario:

1. Alice removes a stream on an established session with Bob.


### WebRTC 1.0 ###

    //-------------------------------------------------------------------
    // Alice removes a stream from the RTCPeerconnection and sends
    // the SDP Offer to Bob
    alice_RTCPeerConnection.removeStream(stream);
    alice_RTCPeerConnection.createOffer(
      localDescriptionCreated, rtcError);
    
    var localDescriptionCreated = function(description) {
      alice_RTCPeerConnection.setLocalDescription(
        description, sendDescription, rtcError);
    }
    
    var sendDescription = function(){
      mySignal({sdp: alice_RTCPeerConnection.localDescription});
    }
    
    // Bob receives the SDP Offer from Alice and processes it
    bob_RTCPeerConnection.setRemoteDescription(
      new RTCSessionDescription({type: 'offer', sdp: sdpOfferFromAlice}), 
      sendDescription, 
      rtcError
    );
    
    // setRemoteDescription() execution will inform Bob
    // about the stream removal
    bob_RTCPeerConnection.onremovestream = function(stream) {
      // stream removed
    }
    
    //  Bob sends the SDP Answer to Alice
    var sendDescription = function(){
      mySignal({sdp: bob_RTCPeerConnection.localDescription});
    }
    
    // Alice receives the Answer from Bob and processes it
    alice_RTCPeerConnection.setRemoteDescription(
      new RTCSessionDescription({type: 'answer', sdp: sdpAnswerFromBob}), 
      function(){}, 
      rtcError);


### Same Under WebRTC JS Object Model ###

    //-------------------------------------------------------------------
    // Alice removes the stream from the RTC connection
    alice_connection.sendStream(stream, false);
    
    // Bob is informed about the stream disconnection
    bob_connection.onstreamdisconnected = function(stream) {
      // stream removed
    }


Example Descriptions and Constraints
====================================

This section outlines some examples of what object descriptions or constraints might look like expressed as natural JavaScript structures. The exact properties needs to be defined as each option becomes standardized. As such, use these examples for illustrative purposes only.


Connection Description
----------------------

    //-------------------------------------------------------------------
    var myConnectionDescription = {
        cname: "<value>",
        contextId: "<random-id>",
        secret: "<random>",
        fingerprints: ["<hash1>","<hash2>"]
    };


Stream Description
------------------

### Full Description ###

    //-------------------------------------------------------------------
    var myStreamDescription = [
        { // audio
            track: "<track-id>",
            ssrc: 5,
            redundencySsrc: 10,
            socketId: "my-audio-port",
            constraints: { /* optional constraints */ }
        },
        { // video
            kind: "video",
            ssrc: 10,
            socketId: "my-video-port",
            constraints: { /* optional constraints */ }
         },
         { // dtmf
            kind: "dtmf",
            ssrc: 5,
            socketId: "my-audio-port",
            constraints: { /* optional constraints */ }
         },
         { // unspecified
             track: "poor-taste-track-id",
             omit: true
         }
    ];

### Loose Description ###

    //-------------------------------------------------------------------
    // In this example, can auto map audio / video based on kind alone
    var myStreamDescriptionLooseExampleA = [
        {
            kind: "audio"
        },
        {
            kind: "video"
        }
    ];
    
    //-------------------------------------------------------------------
    // In this example a more specific definition is given, 
    // but some things are still auto-mapped
    var myStreamDescriptionLooseExampleB = [
        {
            kind: "audio",
            ssrc: 5,
            socketId: "my-audio-port"
        },
        {
            kind: "video",
            socketId: "my-video-port",
        },
        {
            kind: "dtmf"
        },
        {
            track: "<existing-track-id>",
            ssrc: 17,
            socketId: "my-other-port"
        }
    ];


Constraints
-----------

    //-------------------------------------------------------------------
    var myConstraints = {
        codecs: [
            {
                payloadId: 96,
                kind: "audio",
                name: "<name>",
                hzRate: 32000,
                channels: 1
                // ...
            },
            {
                payloadId: 96,
                kind: "video",
                name: "<name>",
                hzRate: 96000
                // ...
            }
        ],
        crypto: [
            {
                algorithm: "<name>",
                priority: 0,
                // mki: "<octects>",
                key: "<random>"
            },
            {
                algorithm: "<name>",
                priority: 2,
                // mki: "<octets>",
                key: "<random>"
            }
        ],
        required: {
        },
        optional: {
            video: {
                maxWdith: 1280,
                maxHeight: 720
            }
        }
    };




Security Considerations
=======================

As this is merely an informative example draft, the security considerations are identical to the related draft proposal found in the WebRTC JavaScript Object RTC draft {{WebRTCJSObj}}.


IANA Considerations
===================

This document requires no actions from IANA.


--- back

