<template>
  <div class="home page">
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"></div>
      <div class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        <div v-for="(picture, index) in getPics()" class="image-card" @click="displayDetails(picture['.key'])" :key="index">
          <div class="image-card__picture">
            <img :src="picture.url" />
          </div>
          <div class="image-card__comment mdl-card__actions">
            <span>{{ picture.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <router-link class="add-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored" to="/complainInput">
      <i class="material-icons">add</i>
    </router-link>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  methods: {
    displayDetails (id) {
      this.$router.push({name: 'complain', params: { id: id }})
    },
    getPics () {
      if (navigator.onLine) {
        this.savePicsToCache()
        return this.$root.complain
      } else {
        return JSON.parse(localStorage.getItem('complains'))
      }
    },
    savePicsToCache () {
      this.$root.$firebaseRefs.complain.orderByChild('created_at').once('value', (snapshot) => {
        let cachedPics = []
        snapshot.forEach((picSnapshot) => {
          let cachedPic = picSnapshot.val()
          cachedPic['.key'] = picSnapshot.key
          cachedPics.push(cachedPic)
        })
        localStorage.setItem('complains', JSON.stringify(cachedPics))
      })
    }
  },
  mounted () {
    this.savePicsToCache()
  },
  data () {
    return {
    }
  },
  components: {
  }
}
</script>


<style scoped>
  .add-picture-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 998;
  }
  .image-card {
    position: relative;
    margin-bottom: 8px;
  }
  .image-card__picture > img {
    width:100%;
  }
  .image-card__comment {
    position: absolute;
    bottom: 0;
    height: 52px;
    padding: 16px;
    text-align: right;
    background: rgba(0, 0, 0, 0.5);
  }
  .image-card__comment > span {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
</style>