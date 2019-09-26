export default class Tool {

    constructor() {

    }

    //截流函数
    throttle(fn, wait) {
        let context, args;
        let previous = 0;

        return function() {
            let now = +new Date()
            context = this
            args = arguments
            if (now - previous > wait) {
                fn.apply(context, args);
                previous = now;
            }


        }


    }



}