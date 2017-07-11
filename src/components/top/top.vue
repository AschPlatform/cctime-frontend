<template>
  <div class="main-wrap">
    <ul>
      <li>
        <span class="readcount">
          <!--阅读计数器-->
          55
        </span>
        <span class="title">
          <router-link to="article/14668">Hacker School's Secret Strategy for Being Super Productive (or: Help.)</router-link>
          <span class="titlesuffix">(github.com)</span>
        </span>
        <br/>
        <span class="meta">
          <span class="author">
            <router-link to="user/abise">abise</router-link>
          </span>
          <span class="time">
            12 分钟以前
          </span>&nbsp;|&nbsp;
          <router-link to="article/14668">80 条评论</router-link>
        </span>
      </li>
      <li>
        <span class="readcount">
          <!--阅读计数器-->
          55
        </span>
        <span class="title">
          <router-link to="article/14668">Hacker School's Secret Strategy for Being Super Productive (or: Help.)</router-link>
          <span class="titlesuffix">(github.com)</span>
        </span>
        <br/>
        <span class="meta">
          <span class="author">
            <router-link to="user/abise">abise</router-link>
          </span>
          <span class="time">
            12 分钟以前
          </span>&nbsp;|&nbsp;
          <router-link to="article/14668">80 条评论</router-link>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'top',
    components: {
    }
  }
</script>

<style lang="" scoped>
  .main-wrap{
    width: 100%;
    margin-top: 30px;
  }
  .main-wrap ul{
    list-style: none;
  }
  .main-wrap ul li{
    position: relative;
    margin: auto auto;
    min-width: 760px;
    width: 70%;
    background-color: #fff;
    padding: 20px 30px 20px 80px;
    border-bottom: 1px solid #eee;
    line-height: 20px;
    text-align: left;
  }
  .readcount{
    color: #f60;
    font-size: 1.1em;
    font-weight: 700;
    position: absolute;
    top: 45%;
    left: 0;
    width: 80px;
    text-align: center;
    margin-top: -1px;
  }
  .title a{
    color: #000;
    text-decoration: none;
  }
  .title span{
    color: #9f9f9f;
  }
  .meta{
    color: #9f9f9f;
    font-size: 0.8em;
  }
  .meta a{
    text-decoration: none;
    color: #9f9f9f;
  }
  .meta a:hover{
    color: #ff6600;
  }
</style>
