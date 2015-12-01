var respecConfig = {
  specStatus: "CG-DRAFT",
  shortName: "ortc-api",
  editors: [
    {
      name: "Robin Raymond",
      url: "http://about.me/robinraymond",
      company: "Hookflash",
      companyURL: "http://www.hookflash.com/"
    }
  ],
  authors: [
    {
      name: "Bernard Aboba",
      url: "https://plus.google.com/+BernardAboba/about",
      company: "Microsoft Corporation",
      companyURL: "http://www.microsoft.com/"
    },
    {
      name: "Justin Uberti",
      url: "https://plus.google.com/+JustinUberti/posts",
      company: "Google",
      companyURL: "https://www.google.com/"
    }
  ],
  wg: "Object-RTC API Community Group",
  wgURI: "http://www.w3.org/community/ortc/",
  wgPublicList: "public-ortc",
  wgPatentURI: "",
  localBiblio: {
    "IANA-RTP-2": {
      "title": "RTP Payload Format media types",
      "href": "http://www.iana.org/assignments/rtp-parameters/rtp-parameters.xhtml#rtp-parameters-2",
      "publisher": "IANA"
    },
    "IANA-RTP-10": {
      "title": "RTP Compact Header Extensions",
      "href": "http://www.iana.org/assignments/rtp-parameters/rtp-parameters.xhtml#rtp-parameters-10",
      "publisher": "IANA"
    },
    "IANA-SDP-14": {
      "title": "'rtcp-fb' Attribute Values",
      "href": "http://www.iana.org/assignments/sdp-parameters/sdp-parameters.xhtml#sdp-parameters-14",
      "publisher": "IANA"
    },
    "IANA-SDP-15": {
      "title": "'ack' and 'nack' Attribute Values",
      "href": "http://www.iana.org/assignments/sdp-parameters/sdp-parameters.xhtml#sdp-parameters-15",
      "publisher": "IANA"
    },
    "IANA-SDP-19": {
      "title": "Codec Control Messages",
      "href": "http://www.iana.org/assignments/sdp-parameters/sdp-parameters.xhtml#sdp-parameters-19",
      "publisher": "IANA"
    },
    "MUX-FIXES": {
      "title": "Multiplexing Scheme Updates for Secure Real-time Transport Protocol (SRTP) Extension for Datagram Transport Layer Security (DTLS)",
      "href": "https://tools.ietf.org/html/draft-ietf-avtcore-rfc5764-mux-fixes",
      "authors": [
        "M. Petit-Huguenin",
        "G. Salgueiro"
      ],
      "status": "19 October. Internet draft (work in progress)",
      "publisher": "IETF"
    },
    "RID": {
      "title": "RTP Payload Format Constraints",
      "href": "https://tools.ietf.org/html/draft-pthatcher-mmusic-rid",
      "authors": [
        "P. Thatcher",
        "M. Zanaty",
        "S. Nandakumar",
        "B. Burman",
        "A. Roach",
        "B. Campen"
      ],
      "status": "19 October 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "RFC3264": {
      "title": "An Offer/Answer Model with the Session Description Protocol",
      "href": "https://tools.ietf.org/html/rfc3264",
      "authors": [
        "J. Rosenberg",
        "H. Schulzrinne"
      ],
      "status": "July 2002. RFC",
      "publisher": "IETF"
    },
    "RFC3890": {
      "title": "A Transport Independent Bandwidth Modifier for the Session Description Protocol (SDP)",
      "href": "https://tools.ietf.org/html/rfc3890",
      "authors": [
        "M. Westerlund"
      ],
      "status": "September 2004. RFC",
      "publisher": "IETF"
    },
    "RFC4585": {
      "title": "Extended RTP Profile for RTCP-Based Feedback (RTP/AVPF)",
      "href": "https://tools.ietf.org/html/rfc4585",
      "authors": [
        "J. Ott",
        "S. Wenger",
        "N. Sato",
        "C. Burmeister",
        "J. Rey"
      ],
      "status": "July 2006. RFC",
      "publisher": "IETF"
    },
    "RFC4733": {
      "title": "RTP Payload for DTMF Digits, Telephony Tones, and Telephony Signals",
      "href": "https://tools.ietf.org/html/rfc4733",
      "authors": [
        "H. Schulzrinne",
        "T. Taylor"
      ],
      "status": "December 2006. RFC",
      "publisher": "IETF"
    },
    "RFC4961": {
      "title": "Symmetric RTP/RTC Control Protocol (RTCP)",
      "href": "https://tools.ietf.org/html/rfc4961",
      "authors": [
        "D. Wing"
      ],
      "status": "July 2007. RFC",
      "publisher": "IETF"
    },
    "RFC5104": {
      "title": "Codec Control Messages in the RTP Audio-Visual Profile with Feedback (AVPF)",
      "href": "https://tools.ietf.org/html/rfc5104",
      "authors": [
        "S. Wenger",
        "U. Chandra",
        "M. Westerlund",
        "B. Burman"
      ],
      "status": "February 2008. RFC",
      "publisher": "IETF"
    },
    "RFC5124": {
      "title": "Extended Secure RTP Profile for Real-time Transport Control Protocol (RTCP)-Based Feedback (RTP/SAVPF)",
      "href": "https://tools.ietf.org/html/rfc5124",
      "authors": [
        "J. Ott",
        "E. Carrara"
      ],
      "status": "February 2008. RFC",
      "publisher": "IETF"
    },
    "RFC5285": {
      "title": "A General Mechanism for RTP Header Extensions",
      "href": "https://tools.ietf.org/html/rfc5285",
      "authors": [
        "D. Singer",
        "H. Desineni"
      ],
      "status": "July 2008. RFC",
      "publisher": "IETF"
    },
    "RFC5450": {
      "title": "Transmission Time Offsets in RTP Streams",
      "href": "https://tools.ietf.org/html/rfc5450",
      "authors": [
        "D. Singer",
        "H. Desineni"
      ],
      "status": "March 2009. RFC",
      "publisher": "IETF"
    },
    "RFC5506": {
      "title": "Support for Reduced-Size Real-Time Transport Control Protocol (RTCP): Opportunities and Consequences",
      "href": "https://tools.ietf.org/html/rfc5506",
      "authors": [
        "I. Johansson",
        "M. Westerlund"
      ],
      "status": "April 2009. RFC",
      "publisher": "IETF"
    },
    "RFC5583": {
      "title": "Signaling Media Decoding Dependency in the SDP",
      "href": "https://tools.ietf.org/html/rfc5583",
      "authors": [
        "T. Schierl",
        "S. Wenger"
      ],
      "status": "July 2009. RFC",
      "publisher": "IETF"
    },
    "RFC5761": {
      "title": "Multiplexing RTP Data and Control Packets on a Single Port",
      "href": "https://tools.ietf.org/html/rfc5761",
      "authors": [
        "C. Perkins",
        "M. Westerlund"
      ],
      "status": "April 2010. RFC",
      "publisher": "IETF"
    },
    "RFC5764": {
      "title": "Datagram Transport Layer Security (DTLS) Extension to Establish Keys for the Secure Real-time Transport Protocol (SRTP)",
      "href": "https://tools.ietf.org/html/rfc5764",
      "authors": [
        "D. McGrew",
        "E. Rescorla"
      ],
      "status": "May 2010. RFC",
      "publisher": "IETF"
    },
    "RFC6051": {
      "title": "Rapid Synchronisation of RTP Flows",
      "href": "https://tools.ietf.org/html/rfc6051",
      "authors": [
        "C. Perkins",
        "T. Schierl"
      ],
      "status": "November 2010. RFC",
      "publisher": "IETF"
    },
    "RFC6184": {
      "title": "RTP Payload Format for H.264 Video",
      "href": "https://tools.ietf.org/html/rfc6184",
      "authors": [
        "Y.-K.. Wang",
        "R. Even",
        "T. Kristensen",
        "R. Jesup"
      ],
      "status": "May 2011. RFC",
      "publisher": "IETF"
    },
    "RFC6190": {
      "title": "RTP Payload Format for Scalable Video Coding",
      "href": "https://tools.ietf.org/html/rfc6190",
      "authors": [
        "S. Wenger",
        "Y.-K. Wang",
        "T. Schierl",
        "A. Eleftheriadis"
      ],
      "status": "May 2011. RFC",
      "publisher": "IETF"
    },
    "RFC6464": {
      "title": "A Real-time Transport Protocol (RTP) Header Extension for Client-to-Mixer Audio Level Indication",
      "href": "https://tools.ietf.org/html/rfc6464",
      "authors": [
        "J. Lennox, Ed.",
        "E. Ivov",
        "E. Marocco"
      ],
      "status": "December 2011. RFC",
      "publisher": "IETF"
    },
    "RFC6465": {
      "title": "A Real-time Protocol (RTP) Header Extension for Mixer-to-Client Audio Level Indication",
      "href": "https://tools.ietf.org/html/rfc6465",
      "authors": [
        "E. Ivov",
        "E. Marocco",
        "J. Lennox"
      ],
      "status": "December 2011. RFC",
      "publisher": "IETF"
    },
    "RFC6455": {
      "title": "The WebSocket Protocol",
      "href": "https://tools.ietf.org/html/rfc6455",
      "authors": [
        "I. Fette",
        "A. Melnikov"
      ],
      "status": "December 2011. RFC",
      "publisher": "IETF"
    },
    "RFC6544": {
      "title": "TCP Candidates with Interactive Connectivity Establishment (ICE)",
      "href": "https://tools.ietf.org/html/rfc6544",
      "authors": [
        "J. Rosenberg",
        "A. Keranen",
        "B. B. Lowekamp",
        "A. B. Roach"
      ],
      "status": "March 2012. RFC",
      "publisher": "IETF"
    },
    "RFC6716": {
      "title": "Definition of the Opus Audio Codec",
      "href": "https://tools.ietf.org/html/rfc6716",
      "authors": [
        "JM. Valin",
        "K. Vos",
        "T. Terriberry"
      ],
      "status": "September 2012. RFC",
      "publisher": "IETF"
    },
    "RFC6904": {
      "title": "Encryption of Header Extensions in the SRTP",
      "href": "https://tools.ietf.org/html/rfc6904",
      "authors": [
        "J. Lennox"
      ],
      "status": "April 2013. RFC",
      "publisher": "IETF"
    },
    "RFC7022": {
      "title": "Guidelines for Choosing RTP Control Protocol (RTCP) Canonical Names (CNAMEs)",
      "href": "https://tools.ietf.org/html/rfc7022",
      "authors": [
        "A. Begen",
        "C. Perkins",
        "D. Wing",
        "E. Rescorla"
      ],
      "status": "September 2013. RFC",
      "publisher": "IETF"
    },
    "RFC7064": {
      "title": "URI Scheme for Session Traversal Utilities for NAT (STUN) Protocol",
      "href": "https://tools.ietf.org/html/rfc7064",
      "authors": [
        "S. Nandakumar",
        "G. Salgueiro",
        "P. Jones",
        "M. Petit-Huguenin"
      ],
      "status": "November 2013. RFC",
      "publisher": "IETF"
    },
    "RFC7065": {
      "title": "Traversal Using Relays around NAT (TURN) Uniform Resource Identifiers",
      "href": "https://tools.ietf.org/html/rfc7065",
      "authors": [
        "M. Petit-Huguenin",
        "S. Nandakumar",
        "G. Salgueiro",
        "P. Jones"
      ],
      "status": "November 2013. RFC",
      "publisher": "IETF"
    },
    "RFC7587": {
      "title": "RTP Payload Format for Opus Speech and Audio Codec",
      "href": "https://tools.ietf.org/html/rfc7587",
      "authors": [
        "J. Spittka",
        "K. Vos",
        "JM. Valin"
      ],
      "status": "June 2015. RFC", 
      "publisher": "IETF"
    },
    "RFC7635": {
      "title": "Session Traversal Utlities for NAT (STUN) Extension for Third Party Authorization",
      "href": "https://tools.ietf.org/html/rfc7635",
      "authors": [
        "T. Reddy",
        "P. Patil",
        "R. Ravindranath",
        "J. Uberti"
      ],
      "status": "August 2015. RFC",
      "publisher": "IETF"
    },
    "BUNDLE": {
      "title": "Negotiating Media Multiplexing Using the Session Description Protocol (SDP)",
      "href": "https://tools.ietf.org/html/draft-ietf-mmusic-sdp-bundle-negotiation",
      "authors": [
        "C. Holmberg",
        "H. Alvestrand",
        "C. Jennings"
      ],
      "status": "20 July 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "CONSENT": {
      "title": "STUN Usage for Consent Freshness",
      "href": "https://tools.ietf.org/html/draft-ietf-rtcweb-stun-consent-freshness",
      "authors": [
        "M. Perumal",
        "D. Wing",
        "T. Reddy",
        "M. Thomson"
      ],
      "status": "13 August 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "DATA": {
      "title": "WebRTC Data Channels",
      "href": "https://tools.ietf.org/html/draft-ietf-rtcweb-data-channel",
      "authors": [
        "R. Jesup",
        "S. Loreto",
        "M. Tuexen"
      ],
      "status": "04 January 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "DATA-PROT": {
      "title": "WebRTC Data Channel Establishment Protocol",
      "href": "https://tools.ietf.org/html/draft-ietf-rtcweb-data-protocol",
      "authors": [
        "R. Jesup",
        "S. Loreto",
        "M. Tuexen"
      ],
      "status": "04 January 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "FEC": {
      "title": "WebRTC Forward Error Correction Requirements",
      "href": "https://tools.ietf.org/html/draft-ietf-rtcweb-fec",
      "authors": [
        "J. Uberti"
      ],
      "status": "18 October 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "GROUPING": {
      "title": "RTP Grouping Taxonomy",
      "href": "https://tools.ietf.org/html/draft-ietf-avtext-rtp-grouping-taxonomy",
      "authors": [
        "J. Lennox",
        "K. Gross",
        "S. Nandakumar",
        "G. Salgueiro",
        "B. Burman"
      ],
      "status": "20 July 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "RTCWEB-SECURITY": {
      "title": "Security Considerations for WebRTC",
      "href": "https://tools.ietf.org/html/draft-ietf-rtcweb-security",
      "authors": [
        "E. Rescorla"
      ],
      "status": "26 February 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "RTCWEB-SECURITY-ARCH": {
      "title": "WebRTC Security Architecture",
      "href": "https://tools.ietf.org/html/draft-ietf-rtcweb-security-arch",
      "authors": [
        "E. Rescorla"
      ],
      "status": "07 March 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "RTCWEB-AUDIO": {
      "title": "WebRTC Audio Codec and Processing Requirements",
      "href": "https://tools.ietf.org/html/draft-ietf-rtcweb-audio",
      "authors": [
        "JM. Valin",
        "C. Bran"
      ],
      "status": "05 November 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "RTCWEB-VIDEO": {
      "title": "WebRTC Video Processing and Codec Requirements",
      "href": "https://tools.ietf.org/html/draft-ietf-rtcweb-video",
      "authors": [
        "A.B. Roach"
      ],
      "status": "12 June 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "RTP-MULTI-STREAM": {
      "title": "Sending Multiple Types of Media in a Single RTP Session",
      "href": "https://tools.ietf.org/html/draft-ietf-avtcore-multi-media-rtp-session",
      "authors": [
        "M. Westerlund",
        "C. Perkins",
        "J. Lennox"
      ],
      "status": "11 September 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "RTP-USAGE": {
      "title": "Web Real-Time Communication (WebRTC): Media Transport and Use of RTP",
      "href": "https://tools.ietf.org/html/draft-ietf-rtcweb-rtp-usage",
      "authors": [
        "C. Perkins",
        "M. Westerlund",
        "J. Ott"
      ],
      "status": "12 June 2015. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "VP8-RTP": {
      "title": "RTP Payload Format for VP8 Video",
      "href": "https://tools.ietf.org/html/draft-ietf-payload-vp8",
      "authors": [
        "P. Westin",
        "H. Lundin",
        "M. Glover",
        "J. Uberti",
        "F. Galligan"
      ],
      "status": "09 September. Internet Draft (work in progress)",
      "publisher": "IETF"
    },
    "WEBRTC-STATS": {
      "title": "Identifiers for WebRTC's Statistics API",
      "href": "http://w3c.github.io/webrtc-stats/",
      "authors": [
        "Harald Alvestrand",
        "Varun Singh"
      ],
      "status": "23 October 2015 (work in progress)",
      "publisher": "W3C"
    }
  }
}
