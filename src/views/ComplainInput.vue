<template>
  <div class="complain page">
    <form>
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--8-col">
          <div v-if="imageUrl" class="card-image__picture">
            <img :src="imageUrl"/>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
            <input id="title" v-model="title" type="text" class="mdl-textfield__input"/>
            <label for="title" class="mdl-textfield__label">Título da reclamação</label>
          </div>
          <div class="actions">
            <a @click.prevent="postComplain" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
              Reclamar
            </a>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import parse from 'xml-parser'
  export default {
    data () {
      return {
        'imageUrl': null,
        'title': null
      }
    },
    mounted () {
      this.$http.get('https://thecatapi.com/api/images/get?format=xml&results_per_page=1').then(response => {
        this.imageUrl = parse(response.body).root.children['0'].children['0'].children['0'].children['0'].content
      })
    },
    methods: {
      postComplain () {
        this.$root.$firebaseRefs.complain.push(
          {
            'url': this.imageUrl,
            'title': this.title,
            'info': 'Posted by Test_User',
            'created_at': -1 * new Date().getTime()
          })
          .then(this.$router.push('/'))
          .catch((e) => {
            console.log('Error on postComplain: ', e)
          })
      }
    }
  }
</script>