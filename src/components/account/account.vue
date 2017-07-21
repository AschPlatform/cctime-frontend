<template>
  <!-- 测试存留副本 <div class="account-wrapper">
    <span class="address">地址：{{this.address}}</span>
    <h1 v-if="isEmpty">{{accountInfo}}</h1>
    <div class="balancetag" v-for="cash in account">
      <span class="currency">币种：{{cash.currency}}</span>
      <span class="balance">余额：{{cash.balance}}</span>
    </div>
  </div>-->
  <div class="account_container">
    <div class="header">
      <p>我的账户</p>
    </div>
    <div class="content">
      <div class="content_header">
        <span>用户ID：adwac12cdcxzxjifb19cubd1biskanx</span>
        <span>地&nbsp;&nbsp;&nbsp;&nbsp;址：awnlc212neodj902jg89ych29cx8274tyo3ut087238r</span>
      </div>
      <div class="content_table">
        <table>
          <tr>
            <th>币种</th>
            <th>数量</th>
            <th>账户操作</th>
          </tr>
          <tr>
            <td>XAS</td>
            <td>977686786</td>
            <td>
              <div class="btn_group">
                <span>充值</span>
                <span>提币</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>BTC</td>
            <td>32423423423423432678567567567</td>
            <td>
              <div class="btn_group">
                <span>充值</span>
                <span>提币</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div> 
</template>

<script>
  export default {
    name: 'account',
    components: {
    },
    data: function () {
      return {
        account: {},
        accountInfo: '',
        address: '',
        isEmpty: true
      }
    },
    created: function () {
      this.account = this.$store.state.userInfo.info.balances
      this.address = this.$store.state.userInfo.info.address
      if (this.account.length === 0) {
        this.accountInfo = '未查询到您账户下的余额信息！可能是新建用户或者输入密钥有误'
      }
      console.log(this.accountInfo)
    }
  }
</script>

<style lang="" scoped>
  .account_container{
    width: 80%;
    background-color: rgb(253, 253, 253);
    min-height: 700px;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 210px;
  }
  .header{
    width: 70%;
    margin: 40px auto;
    border-bottom: 6px solid rgb(238, 238, 238);
    padding-bottom: 15px;
  }
  .header p{
    display: block;
    text-align: left;
    font-size: 32px;
  }
  .content{
    width: 70%;
    margin: auto auto;
  }
  .content_header{
    width: 100%;
    margin: 0 0 0 30px;;
  }
  .content_header span{
    display: block;
    text-align: left; 
    font-size: 20px;
    margin-top: 10px;
  }
  .content_table{
    width: 100%;
    margin-top: 50px;
  }
  .content_table table{
    overflow:hidden;
    cellspacing: 10;
    font-size: 20px;
    vertical-align: center;
    width: 100%;
    border: solid transparent;
    border-radius: 20px;
    margin: auto auto;
  }
  .content_table tr{
    line-height: 20px;
    height: 70px;
  }
  .content_table th,tr,td{
    vertical-align: middle;
  }
  .content_table th{
    color: #fff;
    border: 5px solid #fff;
    background-color: rgb(255, 176, 99);
  }
  .content_table td{
    max-width: 40%;
    background-color: rgb(255, 249, 215);
    border: 5px solid #fff;
  }
  .btn_group span{
    font-size: 16px;
    width: 44px;
    height: 20px;
    color: #fff;
    display: inline-block;
    background-color: rgb(255, 127, 0);
    cursor: pointer;
  }
</style>
