/**
 * blear.classes.count-down
 * @author ydr.me
 * @create 2016年06月04日14:09:36
 */

'use strict';

var time = require('blear.utils.time');
var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');
var Events = require('blear.classes.events');


var defaults = {
    /**
     * 倒计时长度，单位：ms
     * @type Number
     */
    count: 60000,

    /**
     * 步长，单位：ms
     * @type Number
     */
    interval: 1000
};
var CountDown = Events.extend({
    className: 'CountDown',
    constructor: function (options) {
        var the = this;

        if (typeis.Number(options)) {
            options = {
                count: options
            };
        }

        the[_options] = object.assign({}, defaults, options);
        CountDown.parent(the);
    },


    /**
     * 计时器开始
     * @returns {CountDown}
     */
    start: function () {
        var the = this;

        if (the[_timer]) {
            return the;
        }

        var options = the[_options];

        the.emit('start');
        var timer = the[_timer] = time.setInterval(function () {
            var remain = options.count - timer.elapsedTime;

            if (remain <= 0) {
                time.clearInterval(timer);
                the[_timer] = null;
                the.emit('change', 0);
                the.emit('stop');
                return;
            }

            the.emit('change', remain);
        }, options.interval, true);

        return the;
    },


    /**
     * 判断是否在倒计时
     * @returns {boolean}
     */
    is: function () {
        return !!this[_timer];
    }
});
var _options = CountDown.sole();
var _timer = CountDown.sole();

CountDown.defaults = defaults;
module.exports = CountDown;