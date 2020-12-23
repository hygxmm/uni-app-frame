export class Dialog {
    constructor(options = {}){
        this.bodyModel = null;
        this.cancelModel = null;
        this.confirmModel = null;
        this.pageHeight = uni.getSystemInfoSync().screenHeight;
        let opacity = options.opacity || 0.4;
        let modelTitle = options.title || '提示';
        let modelContent = options.content || '请输入内容~';
        let clickEvent = options.isClickEvent || false;
        let cancelVal = options.cancelVal || '取消';
        let confirmVal = options.confirmVal || '确认';
        let cancelColor = options.cancelColor || '#0F7EF5';
        let confirmColor = options.confirmColor || '#0F7EF5';
        let delCancel = options.delCancel || false;
        let align = options.align || 'center';
        let fn = () => {};
        this.$event = options.$event || fn;
        let backOff = options.backOff || false;
        // #ifdef APP-PLUS
        this.createView(
            {height: `${this.pageHeight}px`,top: 0},
            opacity,
            clickEvent,
            {title: modelTitle,content: modelContent,cancelVal,confirmVal,cancelColor,confirmColor,delCancel,align}
        );
        if(!backOff){
            this.backBtn();
        }
        // #endif
    }
    backBtn(){
        let self = this;
        plus.key.addEventListener('backbutton',function(e){
            console.log(e,'back');
            self.hide();
        },false);
    }
    createView(style,opacity,clickEvent,modelInfo){
        style = {
            left: '0px',
            width: '100%',
            ...style
        };
        let view = new plus.nativeObj.View('showModalView',style);
        view.draw([
            {tag: 'rect',id: 'modal',color: `rgba(0,0,0,${opacity})`,position: {top: '0px',left: '0px',width: '100%',height: '100%'}},
            {tag: 'rect',id: 'content',color: 'rgb(255,255,255)',rectStyle: {borderWidth: '2px',radius: '8px'},position: {top: '0px',left: '0px',width: '100%',height: '100%'}},
            {tag: 'rect',id: 'modal',color: `rgba(0,0,0,${opacity})`,position: {top: '0px',left: '0px',width: '100%',height: '100%'}},
            {tag: 'rect',id: 'modal',color: `rgba(0,0,0,${opacity})`,position: {top: '0px',left: '0px',width: '100%',height: '100%'}},
            {tag: 'rect',id: 'modal',color: `rgba(0,0,0,${opacity})`,position: {top: '0px',left: '0px',width: '100%',height: '100%'}},
            {tag: 'rect',id: 'modal',color: `rgba(0,0,0,${opacity})`,position: {top: '0px',left: '0px',width: '100%',height: '100%'}},
            {tag: 'rect',id: 'modal',color: `rgba(0,0,0,${opacity})`,position: {top: '0px',left: '0px',width: '100%',height: '100%'}},
        ])


    }
    showModalAnimationClose(){
        let options = {type: 'pop-out',duration: 300};
        plus.nativeObj.View.startAnimation(options,
            {view:this.bodyModel},
            {view:this.cancelModel},
            {view:this.viewconfirm},
            function(){
                console.log('动画结束');
                plus.nativeObj.View.clearAnimation();
            }
        );
    }
    showModalAnimationOpen(){
        let options = {type: 'pop-in',duration: 1000};
        plus.nativeObj.View.startAnimation(options,
            {view: this.bodyModel},
            {view: this.cancelModel},
            {view: this.viewconfirm},
            function(){
                console.log('关闭动画')
                plus.nativeObj.View.clearAnimation();
            }
        )
    }
    show(){
        this.showModalAnimationOpen();
        this.bodyModel.show();
        if(this.cancelModel){
            this.cancelModel.show();
        }
        this.confirmModel.show();
    }
    hide(){
        this.showModalAnimationClose();
        this.bodyModel.hide();
        if(this.cancelModel){
            this.cancelModel.hide();
        }
        this.confirmModel.hide();
    }
}

export default Dialog;
