const postComplain = {
  methods: {
    postComplain (url, title, {complainText = '', location = '', cpf = '', username = 'anônimo(a)'} = {}) {
      this.$root.$firebaseRefs.complain.push(
        {
          url,
          title,
          // complainText: complainText,
          location,
          cpf,
          'info': `Publicado por ${username}`,
          'created_at': -1 * new Date().getTime()
        })
        .then(this.$router.go('home'))
        .catch((e) => {
          console.log('Error on postComplain: ', e)
        })
    }
  }
}

export default postComplain
