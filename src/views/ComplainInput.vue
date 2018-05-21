<template>
  <div class="complain page">
    <form>
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
            <input id="title" v-model="title" type="text" class="mdl-textfield__input"/>
            <label for="title" class="mdl-textfield__label">Título da reclamação</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield">
            <textarea v-model="complainText" class="mdl-textfield__input" type="text" rows= "3" id="complainText" ></textarea>
            <label class="mdl-textfield__label" for="complainText">Minha reclamação...</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
            <input id="username" v-model="username" type="text" class="mdl-textfield__input"/>
            <label for="username" class="mdl-textfield__label">Nome completo:</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
            <input id="cpf" v-model="cpf" type="text" class="mdl-textfield__input"/>
            <label for="cpf" class="mdl-textfield__label">CPF:</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
            <input id="location" v-model="location" type="text" class="mdl-textfield__input"/>
            <label for="location" class="mdl-textfield__label">Endereço:</label>
          </div>
          <div v-if="position" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
            <input disabled id="position" v-model="position" type="text" class="mdl-textfield__input"/>
            <label for="position" class="mdl-textfield__label">Posição GPS:</label>
          </div>

          <div class="demo-card-image mdl-card mdl-shadow--2dp" v-if="imageUrl">
            <div class="mdl-card__title mdl-card--expand">
              <img :src="imageUrl" alt="">
            </div>
            <div class="mdl-card__actions">
              <span class="demo-card-image__filename">{{title}}</span>
            </div>
          </div>
          <div class="actions">
            <a @click.prevent="postTheComplain" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" :class="{'mdl-button--disabled': !hasUploadedImage}">
              Reclamar
            </a>
            <button class="take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored" @click="toggleCamera">
              <i class="material-icons">camera_alt</i>
            </button>
          </div>
        </div>
      </div>
      <camera @image-capture="handleCapture" v-if="showCamera"></camera>
    </form>
  </div>
</template>

<script>
  import parse from 'xml-parser'
  import postComplain from '../mixins/postComplain'
  import Camera from '@/components/Camera'
  export default {
    mixins: [postComplain],
    data () {
      return {
        'showCamera': false,
        'imageUrl': null,
        'title': null,
        'complainText': '',
        'cpf': '',
        'location': '',
        'username': '',
        'position': null
      }
    },
    mounted () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.position = `${position.coords.latitude} ; ${position.coords.longitude}`
      })
    },
    computed: {
      hasUploadedImage () {
        return  this.imageUrl && this.imageUrl.length > 0
      },
      hasTitle () {
        return this.title && this.title.length > 0
      }
    },
    methods: {
      toggleCamera () {
        this.showCamera = !this.showCamera
      },
      handleCapture (imageUrl) {
        this.showCamera = false
        this.imageUrl = imageUrl
      },
      postTheComplain () {
        this.imageUrl && this.title ?
        this.postComplain(this.imageUrl, this.title, {
          complainText: this.complainText,
          location: this.location,
          username: this.username,
          cpf: this.cpf
        })
        :
        console.warn('not enough date to complain');
      }
    },
    components: {
      Camera
    }
  }
</script>

<style scoped>
.take-picture-button {
  position: fixed;
  right: 24px;
  bottom: 90px;
  z-index: 5;
}
</style>
