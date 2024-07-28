const socket = io();
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '443',

});
let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
    // peerIdentity: ;
    // preferCurrentTab?: boolean;
}).then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call', (call) => {
        call.answer(stream); // Answer the call with an A/V stream.
        const video = document.createElement("video");
        call.on('stream', (remoteStream) => {
            addVideoStream(video, remoteStream);
        });
    });
  
    socket.on('user-connected', (userId) => {
        console.log("User Connected");
        connectToUser(userId, stream);
    });

    let text = $('#chat_message');

    $('html').keydown((e) => {
        if(e.which == 13 && text.val().length !== 0) {
            socket.emit('message', text.val());
            console.log(text.val())
            text.val('');
        }
    });
    
    socket.on('create-message', (message) => {
        console.log("this is coming from server: ", message);
        $('#message-list').append(`<l1 class="message"><b>user</b><br>${message}</li>`);
        scrollToBottom();
    });

}).catch(e => {
    console.log(e);
});

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});

// socket.emit('join-room', ROOM_ID);

const connectToUser = (userId, stream) => {
    // console.log("New user connected", userId);
    const call = peer.call(userId, stream);
    const video = document.createElement("video");
    call.on('stream', userVideoStream => {
        // video.srcObject = userVideoStream;
        addVideoStream(video, userVideoStream);
    });
};

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    var factor = -1;
    video.style.webkitTransform = "scaleX(" + factor + ")"; 
    video.style.transform       = "scaleX(" + factor + ")";
    videoGrid.append(video);
};

const scrollToBottom = () => {
    let d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}

const toggleMute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    console.log(enabled);
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        myVideoStream.getAudioTracks()[0].enabled = true;
        setMuteButton();
    }
}

const setMuteButton = () => {
    const html = `
        <i class="fas fa-microphone"></i>
        <span>Mute</span>
    `;
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
        <i class="unmute fas fa-microphone-slash"></i>
        <span>Unmute</span>
    `;
    document.querySelector('.main__mute_button').innerHTML = html;
}

const toggleVideo = () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    console.log(enabled);
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        myVideoStream.getVideoTracks()[0].enabled = true;
        setStopVideo();
    }
}

const setStopVideo = () => {
    const html = `
        <i class="fas fa-video"></i>
        <span>Stop Video</span>
    `;
    document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
    const html = `
        <i class="stop fas fa-video-slash"></i>
        <span>Play Video</span>
    `;
    document.querySelector('.main__video_button').innerHTML = html;
}
