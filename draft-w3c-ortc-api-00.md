## The RTCConnection Object

```webidl
interface RTCConnection : EventTarget  {
    void                    sendStream();
    void                    receiveStream();
    void                    addSocket();
    RTCConnectionDictionary getConstraints();
    void                    setConstraints();
    void                    fork();    
    sequence<MediaStream>   getLocalStreams ();
    sequence<MediaStream>   getRemoteStreams ();
    sequence<Socket>        getSockets (); 
    void                  close ();
                attribute EventHandler          onactiveconnectioncandidate
                attribute EventHandler          onconnected
                attribute EventHandler          ondisconnected
                attribute EventHandler          onstreamconnected
                attribute EventHandler          onstreamdisconnected
                attribute EventHandler          onstreamreport
                attribute EventHandler          ontrackconnected
                attribute EventHandler          ontrackdisconnected
                attribute EventHandler          ontrackcontributors
                attribute EventHandler          ontrackreport
};
```

### Attributes

__onactiveconnectioncandidate__ of type EventHandler,
  > This event handler, of event handler event type {{connectioncandidate}}, must be fired to allow a developer's JavaScript to be  notified which active candidate local/remote pairing the connection is using.

__onconnected__ of type EventHandler,
  > This event handler, of event handler event type {{socket}}, must be fired to allow a developer's JavaScript to be notified when a connection is connected. 

__ondisconnected__ of type EventHandler,
  > This event handler, of event handler event type {{socket}}, must be fired to allow a developer's JavaScript to be notified when a connection is disconnected. 

__onstreamconnected__ of type EventHandler,
  > This event handler, of event handler event type {{mediastream}}, must be fired to allow a developer's JavaScript to be notified when a {{mediastream}} is connected. 

__onstreamdisconnected__ of type EventHandler,
  > This event handler, of event handler event type {{mediastream}}, must be fired to allow a developer's JavaScript to be notified when a {{mediastream}} is connected. 

__onstreamreport__ of type EventHandler,
  > This event handler, of event handler event type {{mediastream}}, may be fired to allow a developer's JavaScript to be notified of media stream's conditions or statistics.

__ontrackconnected__ of type EventHandler,
  > This event handler, of event handler event type {{mediastreamtrack}}, must be fired to allow a developer's JavaScript to be notified when a media stream track has connected.

__ontrackdisconnected__ of type EventHandler,
  > This event handler, of event handler event type {{mediastreamtrack}}, must be fired to allow a developer's JavaScript to be notified when a media stream track has connected.

__ontrackcontributors__ of type EventHandler,
  > This event handler, of event handler event type {{mediastreamtrack}}, must be fired to allow a developer's JavaScript to be notified when the contributing sources for a media stream track have changed.  This allows to have knowledge of the active contributorsin a given media stream.

__ontrackreport__ of type EventHandler,
  > This event handler, of event handler event type {{mediastreamtrack}}, may be fired to allow a developer's JavaScript to be notified of media stream track's conditions or statistics.

### Methods

#### sendStream
> This method allows sending a {{mediastream}} to the remote peer, or remove a stream from sending with "false" specified.

#### receiveStream
> This method allows receiving a {{mediastream}} from the remote peer, or stop receiving a stream with "false" specified.

#### addSocket
> This method adds a new {{socket}} to the {{connection}}.

#### getConstraints
> Returns the current restrictions on "send" or "receive" streams or individual tracks mapped into an RTP stream. Exposes the restrictions placed on media streams for codecs, encryption algorithms, or other extension constraints.

#### setConstraints
> Sets restrictions on "send" or "receive" streams, or  individual tracks mapped into an RTP stream. Imposes the restrictions placed on media streams for codecs, encryption algorithms, or other extension constraints.

#### fork
> This method allows peering a local {{connection}} with multiple remote peers. Each forked connection can be given a unique set of remote connection candidates from each potentially responding peer.  The streams attached and the setup for each forked connection must be unique.

> The constraints are copied from the original forked connection but can set unique per fork.  Each forked connection object must be considered a unique object, except that it shares the same originating connection context, and sockets.
    
#### getLocalStreams
> Returns a sequence of {{mediastream}} objects representing the streams that are currently sent with this {{connection}} object.

#### getRemoteStreams
> Returns a sequence of {{mediastream}} objects representing the streams that are currently received with this {{connection}} object.

#### getSockets
> Returns a sequence of {{socket}} objects that are currently used to send and receive media streams with this {{connection}} object.


## SOCKET

```webidl
[Constructor (RTCSocketServers servers, optional RTCSocketOptions options)]
interface RTCSocket : EventTarget  {
                attribute EventHandler          oncandidate
                attribute EventHandler          oncandidatesdone
};
```

### Atributes

__oncandidate__ of type EventHandler,
  > This event handler, of event handler event type {{candidate}}, must be fired to allow a developer's JavaScript to receive a discovered connection candidate.

__oncandidatesdone__ of type EventHandler,
  > This event handler, of event handler event type {{candidate}}, must be fired to allow a developer's JavaScript to be notified when all candidate discoveries have completed

## RTCSocketServers


## RTCSocketOptions

__mux__

__kind__

__keys__

