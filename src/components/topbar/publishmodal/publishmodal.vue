<template>
  <div id="mask">
    <div class="modal-wrapper">
      <div class="publishform">
        <h1>发布一篇文章</h1>
        <label for="type-title">标题</label>
        <input type="text" name="type-title" rols="5" maxlength="256" @focus="clearError" placeholder="请输入标题" v-model="title" />
        <label for="type-url">网址</label>
        <input type="url" name="type-url" maxlength="256" @focus="clearError" placeholder="请输入网址" v-model="url" />
        <label for="type-content">文章内容</label>
        <textarea type="text" cols="75" rows="15" name="type-content" maxlength="4096" @focus="clearError" placeholder="请输入文章内容" v-model="text" />
        <label for="type-tag">文章标签</label>
        <input type="text" name="type-tag" maxlength="20" @focus="clearError" placeholder="这是什么类型的文章？" @blur="dealWithTags" v-model="tags" />
        <div class="btn-group">
          <div class="btn-submit" @click="postarticle()">发布</div>
          <div class="btn-cancel" @click="closeModal()">取消</div>
        </div>
      </div>
    </div>
  </div>    
</template>

<script>
  export default {
    name: 'publishmodal',
    data: function () {
      return {
        title: '',
        url: '',
        text: '',
        tags: '',
        isError: false,
        errorMsg: ''
      }
    },
    methods: {
      postarticle: function () {
        if (this.text !== '' && this.url !== '') {
          this.isError = true
          this.errorMsg = '网络地址与文章内容只能选填一个'
          console.log('Both filled!')
        } else if (this.text === '' && this.url === '') {
          this.isError = true
          this.errorMsg = '网络地址与文章内容至少要填一项'
          console.log('Both unfilled!')
        } else {
          console.log(this)
          let tagArr = this.pushInEvent
          this.$store.dispatch('invokeContract', {
            type: '1000',
            fee: '1000000000',
            args: tagArr,
            that: this
          })
          console.log('Dispatched!')
        }
      },
      clearError: function () {
        this.isError = false
        this.errorMsg = ''
      },
      closeModal: function () {
        this.$store.commit('toggleModal')
      },
      // 输入侦测
      trim: function (m) {
        while ((m.length > 0) && (m.charAt(0) === ' ')) {
          m = m.substring(1, m.length)
        }
        while ((m.length > 0) && (m.charAt(m.length - 1) === ' ')) {
          m = m.substring(0, m.length - 1)
        }
        return m
      },
      dealWithTags: function () {
        let tag = this.tags
        this.trim(tag)
        if (tag.indexOf(' ') !== -1) {
          this.tags = tag.replace(' ', ',')
        }
      }
    },
    components: {
    },
    computed: {
      pushInEvent: function () {
        let arr = []
        arr.push(this.title)
        arr.push(this.url)
        arr.push(this.text)
        arr.push(this.tags)
        return arr
      }
    }
  }
</script>

<style lang="" scoped>
  #mask{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    top: 0;
    left: 0;
    z-index: 9998;
  }
 .modal-wrapper{
    box-sizing: border-box;
    display: table;
    height: 60%;
    min-height: 500px;
    max-height: 600px;
    width: 600px;
    background-color: rgba(255, 255, 255, 1);
    margin: 55px auto;
    padding: 50px 30px;
    text-align: left;
 }
 .modal-wrapper h1{
    font-size: 2em;
    margin-bottom: 20px;
 }
 label{
    margin-top: 20px;
    display: block;
    font-size: 1.5em;
 }
 input{
    border-bottom: 1px solid black;
    outline: medium;
    margin: 10px auto 0 auto;
 }
 .btn-group{
    float: right;
 }
 .btn-group div{
    display: inline-block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 1.1em;
    cursor: pointer;
    border-radius: 5px;
 }
 .btn-submit{
    background-color: #5eb95f;
 }
 .btn-cancel{
    background-color: #fb5d1e;
 }
 textarea{
    resize: none;
    margin-top: 10px;
 }
</style>
