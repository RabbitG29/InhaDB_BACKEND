<template>
  <div class="container">
    <div>
      <table class="table table-striped">
        <thead>
          <tr class="text-right">
            <th scope="col" class="text-center">기호</th>
            <th scope="col" class="text-center">정후보</th>
            <th scope="col" class="text-center">부후보</th>
            <th scope="col" class="text-center">공약번호</th>
            <th scope="col" class="text-center">공약내용</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" class="text-center">
              <td>{{item.기호}}</td>
              <td>{{item.정후보}}</td>
              <td>{{item.부후보}}</td>
              <td>{{item.공약번호}}</td>
              <td>{{item.공약내용}}</td>
          </tr>
        </tbody>
      </table>


      <router-link :to="{ name: 'HelloWorld', params: {} }">홈으로</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'candInfo',
  data() {
    return {
      msg: '후보자정보',
      list: []
    }
  },
  mounted: function() {
    this.msg=''
    console.log("후보자정보")
    this.getData()
  },
  watch: {
    $route: function(to, from) {
      this.msg=''
      console.log('후보자정보')
      this.getData()
    }
  },
  methods: {
    getData: function() {
      var url = this.$config.targetURL+'/candidate/candInfo/'
      console.log(url)
      this.$http.get(url)
      .then(result=> {
        console.log(result)
        console.log(result.data.status)
        this.list = JSON.parse(result.data.result)
        console.log(this.list)
      })
      .catch(error=> {
        console.log('서버에러')
      })
  //   },
  //   getData2: function() {
  //     var url = this.$config.targetURL+'/candidate/candInfo/studentname/'
  //     console.log(url)
  //     this.$http.get(url)
  //     .then(result=> {
  //       console.log(result)
  //       console.log(result.data.status)
  //       this.list = JSON.parse(resutl.data.result)
  //       console.log(this.list)
  //     })
  //     .catch(error=> {
  //       console.log('서버에러')
  //     })
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
