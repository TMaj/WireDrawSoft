import * as React from 'react' 

export default class VideoContainer extends React.Component {

    public render() {
        return (
            <video autoPlay={true} controls={true} width="400px" height="250px" src="http://live.uci.agh.edu.pl/video/stream1.cgi">        
                Your browser does not support the VIDEO tag and/or RTP streams. 
            </video>
            // <video autoPlay={true} controls={true} width="420px" height="290px" src="http://localhost:8080/">        
            //     Your browser does not support the VIDEO tag and/or RTP streams. 
            // </video>
        );
    }
}
