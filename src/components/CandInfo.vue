<template>
  <div>
  <div class="container">
    <h1>Candidate</h1>
    <h2>후보 이름들 및 정보...</h2>
    <br>
    <h2>후보 공약들...</h2>
    <div>
      <div v-for="item in list" id="card-candidate">
        <div class="card" v-for="item in list">
          <div class="card-body">
            <h5 class="card-title">{{item.기호}}</h5>
            <h6 class="card-subtitle" style="color: #5cb85c">{{item.정후보이름}} {{item.부후보이름}}</h6>
            <p class="card-text">{{item.공약번호}}</p>
            <p class="card-text">{{item.공약내용}}</p>
          </div>
        </div>
      </div>
      <router-link :to="{ name: 'HelloWorld', params: {} }">홈으로</router-link>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'candInfo',
  data() {
    return {
      msg: '후보자정보',
      list: [],
      vote_num: '',
      candi_num: ''
    }
  },
  mounted: function() {
    this.msg=''
    this.vote_num=this.$route.query.선거회차
    console.log('현재 선거회차 : ' + this.vote_num)
    console.log('기호 : ' + this.candi_num)
    this.getData()
  },
  watch: {
    $route: function(to, from) {
      this.msg=''
      console.log('현재 선거회차 : ' + this.vote_num)
      console.log('기호 : ' + this.candi_num)
      this.getData()
    }
  },
  methods: {
    getData: function() {
      var url = this.$config.targetURL+'/vote/candInfo/'+this.vote_num+"/"+this.candi_num;
      console.log(url)
      this.$http.get(url)
      .then(result=> {
        console.log(result)
        console.log(result.data.status)
        this.list = result.data.data
        console.log(this.list)
      })
      .catch(error=> {
        console.log('서버에러')
      })
    }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rank {
  background-color: rgb(240,240,240);
  font-size: 1.1em;
}
h3 {
  margin: 20px;
}
</style>
