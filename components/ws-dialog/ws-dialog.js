import Dialog from './index.js';

const wx_dialog = {
    install: function(Vue){
        Vue.prototype.$showModal = function (options = {}) {
            return new Promise((resolve,reject) => {
                let dialog = new Dialog({
                    ...options,
                    $event:function(e){
                        if(e.res){
                            resolve(e);
                        }else{
                            reject(e);
                        }
                    }
                })
                dialog.show();
                Vue.prototype.$hide = function(){
                    dialog.hide();
                }
            })
        }
    }
};

export default wx_dialog;
