<template>
  <div class="camera-modal">
    <video ref="video" class="camera-stream"/>
    <div class="camera-modal-container">
        <span @click="capture" class="take-picture-button take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
          <i class="material-icons">camera</i>
        </span>
    </div>
  </div>
</template>

<script>
import { storage } from '../services/firebase'
import postComplain from '../mixins/postComplain'

export default {
  name: 'camera',
  mixins: [postComplain],
  data () {
    return {
      mediaStream: null
    }
  },
  methods: {
    capture () {
      let mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      let imageCapture = new ImageCapture(mediaStreamTrack)

      return imageCapture.grabFrame()
      .then(imgBitMap => {
        let canvas = document.createElement('canvas');
        canvas.width = imgBitMap.width;
        canvas.height = imgBitMap.height;
        let context = canvas.getContext('2d');
        context.drawImage(imgBitMap, 0, 0)
        const imageQualityConversion = 0.90
        canvas.toBlob((blob) => {
          console.log(blob)
          storage.ref()
          .child(`images/picture-${new Date().getTime()}`)
          .put(blob)
          .then(res => {
            console.log('image store into Firebase successfully', res)
            let imageUrl = `https://firebasestorage.googleapis.com/v0/b/reclamacidade-93fad.appspot.com/o/${encodeURIComponent(res.metadata.fullPath)}?alt=media`
            this.$emit('image-capture', imageUrl)
            return res
          })
        }, 'image/jpeg', imageQualityConversion);
      })
      .catch(error => console.error('error when taking pic: ', error))
    }
  },
  mounted () {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        this.mediaStream = mediaStream
        // debugger
        this.$refs.video.srcObject = mediaStream
        this.$refs.video.play()
      })
      .catch(error => console.error('getUserMedia() error:', error))
  },
  destroyed () {
    const tracks = this.mediaStream.getTracks()
    tracks.map(track => track.stop())
  }
}
</script>

<style scoped>
  .camera-modal {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background-color: white;
    z-index: 10;
  }
  .camera-stream {
    width: 100%;
    max-height: 100%;
  }
  .camera-modal-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    align-items: center;
    margin-bottom: 24px;
  }
  .take-picture-button {
    display: flex;
  }
</style>