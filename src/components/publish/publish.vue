<template>
  <div class="pub_container">
    <div class="inner_wrapper">
      <div class="upper_form">
        <input type="text" placeholder="  标题" @focus="clearError()" v-model="title">
        <input type="text" placeholder="  URL" @focus="clearError()" v-model="url">
        <input type="text" placeholder="  标签" @focus="clearError()" @keyup="dealWithTags()" v-model="tags" maxlength="20">
      </div>
      <div class="lower_form">
        <textarea placeholder="文章内容(最多4096个字符)" maxlength="4096" v-model="text"></textarea>
        <div class="btn btn_1"  @click="postarticle()">提交</div>
        <div class="btn btn_2" @click="closeModal()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'publish',
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
    components: {
    },
    methods: {
      postarticle: function () {
        let that = this
        // untest
        if (this.text.length > 4096) {
          this.$store.commit('callToast', {msgHeader: '警告', msgContent: '发布文章的内容长度要小于4096字节', _confirmfunc: '确定', _cancelfunc: '关闭', deals: undefined, contract: 4})
          return
        }
        if (this.text !== '' && this.url !== '') {
          this.isError = true
          this.errorMsg = '网络地址与文章内容只能选填一个'
          this.$store.commit('callToast', {msgHeader: '发生错误', msgContent: this.errorMsg, _confirmfunc: '确定', _cancelfunc: '关闭', deals: undefined, contract: 4})
          return
        } else if (this.text === '' && this.url === '') {
          this.isError = true
          this.errorMsg = '网络地址与文章内容至少要填一项'
          this.$store.commit('callToast', {msgHeader: '发生错误', msgContent: this.errorMsg, _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
          return
        } else {
          // 处理网址
          if (this.url !== '') {
            let reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/
            if (reg.test(this.url)) {
              let tagArr = this.pushInEvent
              that.$store.dispatch('invokeContract', {
                type: 1000,
                fee: '10000000',
                args: tagArr,
                that: that,
                callback: function (err, res) {
                  if (err) {
                    return
                  }
                  that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '发布文章成功！大约十秒后看到更新', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
                  window.history.go(-1)
                }
              })
            } else {
              // 错误处理
              this.$store.commit('callToast', {msgHeader: '发生错误', msgContent: '请确认是否输入正确的网址，推荐直接复制', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
            }
            return
          } else {
            // 文章传入
            let tagArr = this.pushInEvent
            that.$store.dispatch('invokeContract', {
              type: 1000,
              fee: '10000000',
              args: tagArr,
              that: that,
              callback: function (err, res) {
                if (err) {
                  return
                }
                that.$store.commit('callToast', {msgHeader: '成功！', msgContent: '发布文章成功！大约十秒后看到更新', _confirmfunc: '了解', _cancelfunc: '关闭', deals: undefined, contract: 4})
                that.$router.back()
              }
            })
          }
        }
      },
      clearError: function () {
        this.isError = false
        this.errorMsg = ''
      },
      closeModal: function () {
        // this.$router.push('/news')
        this.$router.back()
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
      // 按键结束处理标签内容
      dealWithTags: function () {
        let tag = this.tags
        this.trim(tag)
        if (tag.indexOf(' ') !== -1) {
          this.tags = tag.replace(' ', ',')
        }
      }
    },
    computed: {
      pushInEvent: function () {
        let arr = []
        let aftTitle = this.title.trim()
        arr.push(aftTitle)
        arr.push(this.url)
        // 格式化text($(_temp))
        let texta = this.text
        texta.replace(/\n/g, 'duri')
        console.log(texta)
        arr.push(texta)
        arr.push(this.tags)
        return arr
      }
    },
    created: function () {
      if (this.$store.state.isLogin === false) {
        console.log('判断成功')
        this.$router.push('/top')
      }
    }
  }
</script>

<style lang="" scoped>
  .pub_container{
    min-width: 1000px;
    width: 80%;
    min-height: 700px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 210px;
  }
  .inner_wrapper{
    width: 70%;
    margin: 5% auto 0 auto;
  }
  .upper_form{
    width: 100%;
    border-left: 6px solid rgb(220, 220, 220);
  }
  .upper_form input{
    font-size: 24px;
    height: 50px;
    border: 1px solid rgb(220, 220, 220);
    background-color: rgb(240, 240, 240);
    width: 90%;
    display: block;
    margin-left: 25px;
    margin-top: 25px;
  }
  .lower_form{
    width: 100%;
    margin-top: 25px;
  }
  .lower_form textarea{
    font-size: 24px;
    width: 90%;
    height: 250px;
    margin-left: 31px;
    float: left;
  }
  .btn{
    font-size: 25px;
    display: inline-block;
    margin: 40px 30px;
    width: 110px;
    height: 45px;
    line-height: 45px;
    vertical-align: baseline;
    border-radius: 8px;
    cursor: pointer;
  }
  .btn_1{
    border: 1px solid rgb(210, 229, 244);
    color: rgb(102, 146, 217);
    background-color: rgb(210, 229, 244);
    margin-right: 65px;
  }
  .btn_2{
    border: 1px solid rgb(210, 229, 244);
    color: rgb(102, 146, 217);
    background-color: #fff;
  }
  .err{
    color: red;
    font-size: 20px;
  }
  @media screen and (max-width: 1441px) {
    .pub_container{
      width: 60%;
      min-height: 700px;
      height: 100%;
      margin: 0 auto;
      overflow: hidden;
      padding-bottom: 210px;
    }
    .upper_form{
      border-left: 2px solid rgb(220, 220, 220);
    }
    .upper_form input{
      font-size: 14px;
      height: 28px;
      border: 1px solid rgb(220, 220, 220);
      background-color: rgb(240, 240, 240);
      width: 90%;
      display: block;
      margin-left: 12px;
      margin-top: 12px;
    }
    .lower_form textarea{
      font-size: 14px;
      line-height: 28px;
      width: 90%;
      height: 250px;
      margin-left: 14px;
      resize: none;
    }
    .btn{
      font-size: 14px;
      display: inline-block;
      margin: 40px 30px;
      width: 60px;
      height: 28px;
      line-height: 28px;
      vertical-align: baseline;
      border-radius: 8px;
      cursor: pointer;
    }
  }
</style>
