<template>
  <div class="container">
    <div>
      <h1>후보자 정보</h1>

      <div type="text/x-template" v-for='' id="blog-card">
      <a class="card-link" href="#">
        <article class="blog-card">
          <img class="post-image" :src="image" />
          <div class="article-details">
            <h4 class="post-category">{{ category }}</h4>
            <h3 class="post-title">{{ name }}</h3>
            <p class="post-description">{{ desc }}</p>
            <p class="post-author">By {{ author }}</p>
          </div>
          <div class="article-details">
            <p >{{did}}</p>
          </div>

        </article>
      </a>
      </div>

      <router-link :to="{ name: 'HelloWorld', params: {} }">홈으로</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CandInfo',
  sockets: {
      connect: function(){
          console.log('socket connected')
      },
      rental: function(){
          console.log('hello')
          this.$notice({
              type: 'success',
              text: '새로고침 되었습니다.'
          })
          this.getData()
      }
  },
  data() {
    return {
      name: '이유진',
      category: '기호1번',
      image: 'https://source.unsplash.com/DnWYw0zLJBg',
      author: '공약',
      desc: `2018`,
      did: 'ㅇㅇ'
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
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
@mixin transition($args...) {
  transition: $args;
}

* {
  box-sizing: border-box;
  &::before, &::after {
    box-sizing: border-box;
  }
}
body {
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: $text;
  background: $bg;
  font-size: 0.9375rem;
  min-height: 100vh;
  margin: 0;
  line-height: 1.6;
  align-items: center;
  justify-content: center;
  text-rendering: optimizeLegibility;
}

#container {
  width: 30rem;
  height: 13.625rem;
}

.blog-card {
  display: flex;
  flex-direction: row;
  background: $white;
  box-shadow: 0 0.1875rem 1.5rem $shadow;
  border-radius: 0.375rem;
  overflow: hidden;
}

.post-image {
  @include transition(opacity 0.3s ease);
  display: block;
  width: 100%;
   object-fit: cover;
}

.article-details {
  padding: 1.5rem;
}

.post-category {
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.75rem 0;
  padding: 0 0 0.25rem 0;
  border-bottom: 0.125rem solid $border;
}

.post-title {
  @include transition(color 0.3s ease);
  font-size: 1.125rem;
  line-height: 1.4;
  color: $black;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.post-author {
  font-size: 0.875rem;
  line-height: 1;
  margin: 1.125rem 0 0 0;
  padding: 1.125rem 0 0 0;
  border-top: 0.0625rem solid $border;
}

@media (max-width: 40rem) {
  #container {
    width: 18rem;
    height: 27.25rem;
  }

  .blog-card {
    flex-wrap: wrap;
  }
}

@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: ". main main ." ". main main .";
  }

  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }

  .post-image {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }

  @media (max-width: 40rem) {
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}
</style>
