export default function createWebMFromFrames(fileWritableStream, settings) {

  let webmWriter = new WebMWriter({
    fileWriter: fileWritableStream,
    codec: 'VP9',
    width: settings.width,
    height: settings.height,
  });

  const init = {
    output: (chunk) => {
      webmWriter.addFrame(chunk);
    },
    error: (e) => {
      console.error(e);
    }
  };

  const config = {
    codec: "vp09.00.10.08",
    width: settings.width,
    height: settings.height,
    bitrate: settings.bitrate,
  };

  let encoder = new VideoEncoder(init);
  // let support = await VideoEncoder.isConfigSupported(config);
  // console.assert(support.supported);
  encoder.configure(config);

  function addFrame(frame) {
    encoder.encode(frame);
  }

  let alreadySaved = false;
  async function save() {
    if(alreadySaved) throw new Error("Already saved.");
    await encoder.flush();
    encoder.close();
    fileWritableStream.close();
    await webmWriter.complete();
    alreadySaved = true;
  }

  async function complete() {
    await encoder.flush();
    encoder.close();
    fileWritableStream.close();
    await webmWriter.complete();
  }

  function flushQueue() {
    return encoder.flush();
  }
  
  function getQueueSize() {
    return encoder.encodeQueueSize;
  }

  return {
    addFrame,
    save, // save the video (ends the ecoding process)
    flushQueue, // returns a promise that resolves when frame queue is empty
    getQueueSize,
  };

}
