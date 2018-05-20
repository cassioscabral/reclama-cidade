<template>
  <div class="complain page" v-if="picture">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="picture">
          <img :src="picture.url" />
        </div>
        <div class="info">
          <span>{{ picture.info }}</span>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="comment">
          <span>{{ picture.title }}</span>
        </div>
        <div class="actions">
          <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" to="/complainInput">
            Faça a sua reclamação também
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import data from '../data'
export default {
  data () {
    return {
      picture: null
    }
  },
  mounted () {
    this.picture = this.$root.complain.find((complain) => complain['.key'] === this.$route.params.id)
  }
}
</script>
<style scoped>
  .picture > img {
    color: #fff;
    width:100%;
  }
  .info {
    text-align: right;
    padding: 5px;
    color: #555;
    font-size: 10px;
  }
  .comment {
    padding: 10px;
    color: #555;
  }
  .actions {
    text-align: center;
  }
</style>