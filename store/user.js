
export const state =　() => ({
  userinfo: {
    token: '',
    user: {}
  }
})


export const mutations = {
  setUser(state,userinfo){
    state.userinfo = userinfo
  }
}


export const actions =  {
  setUser(context,form) {
    this.$axios.post('/accounts/login',form)
      .then(res => {
        context.commit('setUser',res.data)
        console.log(res)
        localStorage.setItem('xyly_lc37',JSON.stringify(res.data))
      })
  }
}