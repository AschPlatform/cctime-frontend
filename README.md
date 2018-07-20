# CCTime-Frontend

The CCTime Dapp consists of two parts:  
__This repository__ is the frontend part of the Dapp, the [cctime-backend](https://github.com/AschPlatform/cctime) is the backend part which includes the smart contract code.

## Important  

For this repository to work you need to have the [cctime-backend](https://github.com/AschPlatform/cctime) part on your local Asch blockchain registered and installed.  
Therefore please follow the installation instructions on the [cctime-backend](https://github.com/AschPlatform/cctime) repository and then come back and start the frontend part of CCTime.

__CCTIME__
- Dapp Frontend: __this repository__  
- Dapp Backend: [cctime-backend](https://github.com/AschPlatform/cctime)

<br/>

## Prepare Frontend  

This frontend needs to connect to the right Dapp.  
A Dapp is identified through a DappId. So we need to adjust the DappId in the `src/vuex/actions.js` file.  

__TODO__  
> Change the current DappId beginning with `d352263...` with __your__ DappId you got after the registration of your Dapp.  

__src/vuex/actions.js__  
```js
import Identicon from 'identicon.js'
import aschJS from 'asch-js'
// 存储异步操作,获取数据用commit操作mutation
let baseUrl = '/api/dapps/<your Dapp Id>' // 真实环境
```


### Install Frontend Dependencies  
```bash
# install dependencies
npm install
```

### Run Frontend  
This command starts the frontend on `localhost:8080`
```bash
npm run dev
```

<br/>

## Questions  
If you have questions, please ask them on the gitter [asch-development](https://gitter.im/asch-development/Lobby) chat.  


## License

The GPLv3 License.

Copyright (c) 2017-2018 Asch</br>
