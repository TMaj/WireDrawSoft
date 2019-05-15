import * as React from 'react'


export default class VideoContainer extends React.Component {

    public render() {
        return (
            <video autoPlay={true} controls={true} width="420px" height="290px" src="http://live.uci.agh.edu.pl/video/stream1.cgi?start=1543408695 ">        
                 Your browser does not support the VIDEO tag and/or RTP streams. 
            </video>
        );
    }
}
