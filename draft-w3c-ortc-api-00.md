## The RTCSession Class


### Overview

An {{RTCSession}} instance provides the interface for a browser to directly communicate with another browser or a compliant device, for sending and receiving both media streams or data. Communication is signaled via HTTP or WebSocket through a web server or WebSocket server by unspecified means.

The {{RTCSession}} is provided with media streams and transports for carrying them, along with option parameters.


### Interface Definition

```webidl
[Constructor (optional RTCSessionOptions options)]
interface RTCSession : EventTarget  {
    RTCSessionDescription               getLocalDescription ();
    void                                setRemoteDescription ();
    RTCSessionDescription               getRemoteDescription ();
    void                                addStream ();
    void                                removeStream ();
    void                                sendStream ();
    void                                sendTrack ();
    void                                addChannel ();
    void                                removeChannel ();
    sequence<RTCChannel>                getChannels ();
    void                                setChannelForStream ();
    void                                setChannelForTrack ();
    sequence<MediaStream>               getLocalStreams ();
    sequence<MediaStream>               getRemoteStreams ();
    void                                close ();
                attribute EventHandler          onaddstream;
                attribute EventHandler          onremovestream;
                attribute EventHandler          onchannelconnected;
                attribute EventHandler          onchanneldisconnected;
};
```


#### Events


__onaddstream__ of type EventHandler,

> This event handler, of event handler event type {{addstream}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStream}} is added. It is fired when the remote peer signals the addition of a {{MediaStreamTrack}} with a new *msid*.
>
| *Event Argument* | *Description* |
|--- | --- |
|{{MediaStream}} |The {{MediaStream}} instance being added by the remote peer. |


__onremovestream__ of type EventHandler,

> This event handler, of event handler event type {{removestream}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStream}} is removed. It is fired when the remote peer signals the removal of all the {{MediaStreamTrack}} with same *msid*.
>
| *Event Argument* | *Description* |
|--- | --- |
|{{MediaStream}} |The {{MediaStream}} instance being removed by the remote peer. |


__onchannelconnected__ of type EventHandler,

> This event handler, of event handler event type {{channelconnected}}, must be fired to allow a developer's JavaScript to be notified when {{RTCChannel}} within this {{RTCSession}} has been paired with its remote and the ICE connection has been established.
>
| *Event Argument* | *Description* |
|--- | --- |
|{{RTCChannel}} |The connected {{RTCChannel}}. |


__onchanneldisconnected__ of type EventHandler,

> This event handler, of event handler event type {{channeldisconnected}}, must be fired to allow a developer's JavaScript to be notified when {{RTCChannel}} within this {{RTCSession}} has been disconnected.
>
| *Event Argument* | *Description* |
|--- | --- |
|{{RTCChannel}} |The disconnected {{RTCChannel}}. |



#### Methods


##### getLocalDescription

> Returns the {{RTCSessionDescription}} with the collection of local {{MediaStreamTrack}} and parameters associated to each one (represented by their {{RTCTrackDescription}} object).
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|filter |{{RTCSessionDescriptionFilter}} | yes | yes |A filter to restrict the tracks to be retrieved. |



##### setRemoteDescription

> Set the remote {{RTCSessionDescription}}.
>
If the second argument "incremental" is false (default value) the given {{RTCSessionDescription}} represents the full {{RTCTrackDescription}} collection of the remote peer. If it is "true", then it represents an incremental modification in the {{RTCTrackDescription}} collection of the remote peer.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|description |{{RTCSessionDescription}} | yes | yes |The remote {{RTCSessionDescription}}. |
|incremental |Boolean | yes | yes | Whether the given description is a full or incremental description. |
>
When using the "incremental" mode, a {{MediaStreamTrack}} removal must be indicated by setting a *delete* property with value *true* within the {{RTCTrackDescription}} associated to the track.


##### getRemoteDescription

> Returns the {{RTCSessionDescription}} with the collection of remote {{MediaStreamTrack}} and parameters associated to each one (represented by their {{RTCTrackDescription}} object).
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|filter |{{RTCSessionDescriptionFilter}} | yes | yes |A filter to restrict the tracks to be retrieved. |


##### addStream

> Adds the given {{MediaStream}} to the {{RTCSession}}. It does not automatically start sending it via RTP.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|stream |{{MediaStream}} | no | no | |


##### removeStream

> Removes the given {{MediaStream}} from the {{RTCSession}}. It does automatically stop sending it via RTP.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|stream |{{MediaStream}} | no | no | |


##### sendStream

> Starts sending the tracks of the given {{MediaStream}} via RTP. If the {{RTCChannel}} is not yet connected, it will wait until it gets connected.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|stream |{{MediaStream}} | no | no | |


##### sendTrack

> Starts sending the given {{MediaStreamTrack}} via RTP. If the {{RTCChannel}} is not yet connected, it will wait until it gets connected.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|track |{{MediaStreamTrack}} | no | no | |


##### addChannel

> Adds the given {{RTCChannel}} to the {{RTCSession}}. The first given {{RTCChannel}} will be used for carrying all the tracks unless a specific {{RTCChannel}} is assigned to a {{MediaStream}} or {{MediaStreamTrack}}.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|channel |{{RTCChannel}} | no | no | |


##### removeChannel

> Removes the given {{RTCChannel}} from the {{RTCSession}}. If there is any {{MediaStreamTrack}} being carried over the given {{RTCChannel}}, this method throws an exception (TODO: define the exception).
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|channel |{{RTCChannel}} | no | no | |


##### getChannels

> Get a sequence of all the {{RTCChannel}} instances within the {{RTCSession}}.
>
Parameters: none


##### setChannelForStream

> Set the given {{RTCChannel}} as the transport for all the tracks in the given {{MediaStream}}.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|stream |{{MediaStream}} | no | no | |
|channel |{{RTCChannel}} | no | no | |


##### setChannelForTrack

> Set the given {{RTCChannel}} as the transport for the given {{MediaStreamTrack}}.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|track |{{MediaStreamTrack}} | no | no | |
|channel |{{RTCChannel}} | no | no | |


##### getLocalStreams

> Get a sequence of the local {{MediaStream}} instances within the {{RTCSession}}.
>
Parameters: none


##### getRemoteStreams

> Get a sequence of the remote {{MediaStream}} instances within the {{RTCSession}}.
>
Parameters: none


##### close

> Closes all the {{RTCChannel}} instances and stops sending RTP to the peer.
>
Parameters: none




#### The RTCSessionOptions Object

With this object the developer can select the preference of audio and video codecs along with other media attributes. If not given, the browser will produce its default values depending on its media capabilities. The resulting settings will be applied to each local {{MediaStreamTrack}} within this {{RTCSession}} (which will be representing in the corresponding {{RTCTrackDescription}}).

```webidl
dictionary RTCSessionOptions {
    sequence<RTCCodec>?                 codecs;
    sequence<RTCMediaAttributes>?       mediaAttributes;
};
```


__codecs__ type of sequence<RTCCodecs>


__mediaAttributes__ type of sequence<RTCMediaAttributes>



##### The RTCCodec Object

```webidl
dictionary RTCCodec {
    int         payload-id;
    DOMString   kind;
    DOMString?  name;
    int?        hzRate;
    int?        channels;
};
```


##### Attributes


__payload-id__ of type unsigned int


__kind__ of type DOMString


__name__: of type DOMString


__hzRate__: of type unsigned int


__channels__: of type unsigned int


*TODO:* TBD


##### The RTCMediaAttributes Object

```webidl
dictionary RTCMediaAttributes {
    int?        videoMaxWidth;
    int?        videoMaxHeight;
};
```


##### Attributes


__videoMaxWidth__ of type unsigned int


__videoMaxHeight__ of type unsigned int


*TODO:* TBD



##### RTCSessionOptions Example

```javascript
{
  codecs: [
      {
          payload-id: 96,
          kind: "audio",
          name: "<name>",
          hzRate: 32000,
          channels: 1
          // ...
      },
      {
          payload-id: 96,
          kind: "video",
          name: "<name>",
          hzRate: 96000
          // ...
      }
  ],
  mediaAttributes: {
      videoMaxWidth: 1280,
      videoMaxHeight: 720
      // ...
  }
};
```




### The RTCSessionDescription Object

The {{RTCSessionDescription}} is an Object which keys are the *id* attribute of a {{MediaStreamTrack}} with the corresponding {{RTCTrackDescription}} as value.


#### The RTCTrackDescription Object

```webidl
dictionary RTCTrackDescription {
    DOMString                           id;
    DOMString                           kind;
    DOMString                           ssrc;
    DOMString                           msid;
    DOMString                           channel-id;
    sequence<RTCCodec>                  codecs;
    sequence<RTCMediaAttributes>?       mediaAttributes;
};
```

__id__ of type DOMString

> The *id* attribute of the {{MediaStreamTrack}}.

__kind__ of type DOMString

> Can be "audio", "video", "dtmf" (TODO).

__ssrc__ of type DOMString

__msid__ of type DOMString

__channel-id__ of type DOMString

> The identificator of the {{RTCChannel}} transporting this track.



#### RTCSessionDescription Example

```javascript
{
  "track-audio-01": {
      id: "track-audio-01",
      kind: "audio",
      ssrc: "1234",
      msid: "m1",
      channel-id: "c1",
      codecs: [
          {
              payload-id: 96,
              kind: "audio",
              hzRate: 32000,
              channels: 1
          },
          {
              payload-id: 97,
              kind: "audio",
              hzRate: 96000,
              channels: 1
          }
      ]
  },
  
  "track-audio-02": { ... },
  
  "track-video-01": { ... }
}
```


### The RTCSessionDescriptionFilter Object

This Object is used to filter the output of both *getLocalDescription* and *getRemoteDescription* methods of {{RTCSession}}. By passing a {{MediaStream}} *id* attribute (which matches the *misd* attribute in the {{RTCTrackDescription}}) and/or a {{RTCChannel}} *id* attribute (which matches the *channel-id* attribute in the {{RTCTrackDescription}}), just those tracks with the given attribute values are returned.

This can be useful for a wire protocol in which just incremental media changes are signaled. By using the filter capability just the desired information is retrieved (i.e. the description of just the tracks within a newly added local {{MediaStream}}).


```webidl
dictionary RTCSessionDescriptionFilter {
    DOMString?          msid;
    DOMString?          channel-id;
};
```

#### Attributes

__msid__ of type DOMString

__channel-id__ of type DOMString




## The RTCChannel Class


### Overview

An {{RTCChannel}} instance establishes a transport with the remote peer for sending and receiving RTP tracks or data. Such a transport is established by following ICE procedures.

Once the {{RTCChannel}} has been instantiated the ICE gathering procedure automatically starts for retrieving local ICE candidates.


### Operation

The WebRTC session initiator initializes a {{RTCChannel}} by just passing as argument the optional sequence of {{RTCIceServer}}. Then the initiator signals its {{RTCChannel}} local description to the remote peer (which includes a *channel-id* field along with the list of local ICE candidates gathered by that moment).

The remote peer initializes then its own {{RTCChannel}} instance by passing an optional sequence of {{RTCIceServer}} and the received channel description, so this new {{RTCChannel}} will be created having the same *channel-id* and both peers can reference the connected channel via signaling.

ICE candidates can be signaled one to each other at any time (trickle-ICE). Calling the method *connect* of both instances of {{RTCChannel}} allows the ICE connection procedure to begin between both peers.



### Interface Definition

```webidl
[Constructor (RTCIceServer[] iceServers, optional RTCChannelDescription remoteDescription)]
interface RTCChannel : EventTarget  {
    readonly    attribute DOMString     id;
    RTCChannelDescription               getLocalDescription ();
    void                                setRemoteDescription ();
    RTCChannelDescription               getRemoteDescription ();
    void                                setRemoteCandidate ();
    void                                connect ();
    void                                update ();
                attribute EventHandler          oncandidate;
                attribute EventHandler          oncandidatesdone;
                attribute EventHandler          onactivecandidate;
};
```


#### Attributes

__id__ of type DOMString (read only)

> The string identifier of the {{RTCChannel}}.


#### Events


__oncandidate__ of type EventHandler,

> This event handler, of event handler event type {{candidate}}, must be fired to allow a developer's JavaScript to receive a discovered ICE candidate ({{RTCIceCandidateDescription}}).
>
| *Event Argument* | *Description* |
|--- | --- |
|{{RTCIceCandidateDescription}} |The local ICE candidate being added. |


__oncandidatesdone__ of type EventHandler,

> This event handler, of event handler event type {{candidatesdone}}, must be fired to allow a developer's JavaScript to be notified when all candidate discoveries have completed.
>
Event arguments: none


__onactivecandidate__ of type EventHandler,

> This event handler, of event handler event type {{activecandidate}}, must be fired to allow a developer's JavaScript to be notified which active ICE candidate local/remote pairing the connection is using.
>
| *Event Argument* | *Description* |
|--- | --- |
|{{RTCIceCandidateDescription}} |The connected local ICE candidate. |



#### Methods


##### getLocalDescription

Returns the local {{RTCChannelDescription}} containing the channel identificator along with discovered ICE candidates in the moment it is called.
>
Parameters: none


##### setRemoteDescription

Sets the given remote {{RTCChannelDescription}} to the {{RTCChannel}} instance.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|description |{{RTCChannelDescription}} | no | no | |


##### getRemoteDescription

Returns the remote {{RTCChannelDescription}} containing the channel identificator along with remote ICE candidates in the moment it is called.
>
Parameters: none


##### setRemoteCandidate

Adds a remote ICE candidate to the {{RTCChannel}}.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|candidate |RTCIceCandidateDescription | no | no | |


##### connect

Starts the ICE establishment procedure with the peer. If new local or remote ICE candidates are provided once this method has been called, they will be also considered for the ICE connection procedure.
>
Parameters: none


##### update

This method will usually be called upon network interfaces change (i.e. in mobile network). By calling this method the ICE gathering procedure starts again as when the {{RTCChannel}} was instantiated.
>
Parameters: none



#### The RTCIceServer Object

```webidl
dictionary RTCIceServer {
    DOMString  url;
    DOMString? credential;
};
```


##### Attributes


__url__ of type DOMString

> A STUN or TURN URI as defined in {{STUN-URI}} and {{TURN-URI}}.


__credential__ of type DOMString, nullable

> If the url element is a {{TURN-URI}}, then this is the credential to use with that TURN server.


In network topologies with multiple layers of NATs, it is desirable to have a STUN server between every layer of NATs in addition to the TURN servers to minimize the peer to peer network latency.

An example array of {{RTCIceServer}} objects is:

```
[ { url:"stun:stun.example.net" } , { url:"turn:user@turn.example.org", credential:"myPassword"} ]
```


#### The RTCChannelDescription Object

```webidl
dictionary RTCChannelDescription {
    DOMString                                   channel-id;
    DOMString                                   usefrag;
    DOMString                                   secret;
    sequence<DOMString>                         fingerprints;
    sequence<RTCIceCandidateDescription>?       candidates;
};
```

##### Attributes


__channel-id__ of type DOMString


__usefrag__ of type DOMString


__secret__ of type DOMString


__fingerprints__ of type sequence<DOMString>


__candidates__ of type sequence<RTCIceCandidateDescription>




#### The RTCIceCandidateDescription Object


```webidl
dictionary RTCIceCandidateDescription {
    DOMString                                   foundation;
    int                                         component;
    DOMString                                   transport;
    int                                         priority;
    DOMString                                   connectionAddress;
    int                                         connectionPort;
    DOMString                                   type;
};
```


##### Attributes


__foundation__ of type unsinged DOMString


__component__ of type unsigned int


__transport__ of type DOMString


__priority__ of type unsigned int


__connectionAddress__ of type DOMString


__connectionPort__ of type unsigned int


__type__ of type DOMString


##### RTCIceCandidateDescription Example

```javascript
{
  foundation: "abcd1234",
  component: 1,
  transport: "udp",
  priority: 1694498815,
  connectionAddress: "192.0.2.33",
  connectionPort: 10000,
  type: "host"
};
```



## Extensions to MediaCapture MediaStream

This specification extends the MediaCapture MediaStream class for remote streams received from the network, by adding the following events:


__onconnected__ of type EventHandler,

> This event handler, of event handler event type {{connected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStream}} is connected, which means that RTP for at least one of the tracks in this {{MediaStream}} has been received.
>
Event arguments: none


__ondisconnected__ of type EventHandler,

> This event handler, of event handler event type {{disconnected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStream}} is disconnected, which means that a RTP BYE has been received or RTP timeout occurred for the last remaining track in this {{MediaStream}}.
>
Event arguments: none



## Extensions to MediaCapture MediaStreamTrack

This specification extends the MediaCapture MediaStreamTrack class for remote tracks received from the network, by adding the following events:


__onconnected__ of type EventHandler,

> This event handler, of event handler event type {{connected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStreamTrack}} is connected, which means that RTP for this track has been received.
>
Note that this event is just fired for a remote {{MediaStreamTrack}} which {{MediaStream}} was already connected (so {{onaddstream}} event was called for it).
>
Event arguments: none


__ondisconnected__ of type EventHandler,

> This event handler, of event handler event type {{disconnected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStreamTrack}} is disconnected, which means that a RTP BYE has been received or RTP timeout occurred.
>
Event arguments: none



## Examples


### Usage of setRemoteDescription with "incremental" mode

Alice signals to Bob (via custom wire protocol) that she will stop sending an audio track which *id* is "audio-track-01":

```javascript
// Alice's browser:

signalToBob("{ deleteTrack: 'audio-track-01' }");


// Bob's browser:

var trackToRemove = JSON.parse(messageFromAlice)['deleteTrack'];
var incrementalDesc = {};
incrementalDesc[trackToRemove] = { delete: true };

mySession.setRemoteDescription(incrementalDesc, true);

// This will fire ontrackremoved event on the corresponding remote MediaStream.
```
