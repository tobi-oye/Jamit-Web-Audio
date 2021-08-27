import "./App.css";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  ChakraProvider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Flex,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

function App() {
  const audioSource =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3";
  // const [audioContext, setAudioContext] = useState(null);
  const [gainNodeState, setGainNodeState] = useState();
  const audioElementRef = useRef();
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const gainNode = audioContext.createGain();
    const audioElementDOM = audioElementRef.current;
    const track = audioContext.createMediaElementSource(audioElementDOM);
    track.connect(gainNode).connect(audioContext.destination);
    setGainNodeState(gainNode);
  }, []);
  return (
    <ChakraProvider>
      <Flex
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <audio
          ref={audioElementRef}
          src={audioSource}
          crossOrigin="anonymous"
          style={{ border: "1px solid black" }}
        ></audio>
        <Button onClick={() => audioElementRef.current.play()} style={styles}>
          play
        </Button>
        <Button onClick={() => audioElementRef.current.pause()} style={styles}>
          pause
        </Button>
        <Slider
          aria-label="slider-ex-4"
          defaultValue={1.5}
          onChange={(e) => {
            gainNodeState.gain.value = e;
            // console.log(audioElementRef);
          }}
          min={0}
          max={3}
          step={0.01}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="tomato" as={BellIcon} />
          </SliderThumb>
        </Slider>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
const styles = {
  width: "500px",
  height: "100px",
  margin: "40px",
  color: "black",
};
