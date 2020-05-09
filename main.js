import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.checkLogin = function(){
	var UPHONE  = uni.getStorageSync('UPHONE');
	var UID = uni.getStorageSync('UID');
	var UNAME=uni.getStorageSync('UNAME');
	var UROLE=uni.getStorageSync('UROLE');
	if(UPHONE == '' || UID == '' || UNAME == ''){
		return false;
	}
	return [UPHONE, UID, UNAME,UROLE];
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
