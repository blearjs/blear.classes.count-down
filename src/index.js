/**
 * blear.classes.countdown
 * @author ydr.me
 * @create 2016年11月19日11:50:03
 */

'use strict';

var time = require('blear.utils.time');
var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');
var date = require('blear.utils.date');
var Events = require('blear.classes.events');

var STATE_READY = 0;
var STATE_STARTED = 1;
var STATE_PAUSED = 3;
var STATE_DESTROYED = 5;
var defaults = {
    /**
     * 时间间隔
     * @type Number
     */
    interval: 1000,

    /**
     * 时间总数，-1 为无限计时
     * @type Number
     */
    count: 60000
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

        options = the[_options] = object.assign({}, defaults, options);

        if (typeis.Date(options.count)) {
            options.count = options.count.getTime() - date.now();
        }

        the[_count] = options.count;
        the.state = STATE_READY;
        CountDown.parent(the);
    },


    /**
     * 开始计时
     * @returns {CountDown}
     */
    start: function () {
        var the = this;

        if (the[_timer]) {
            return the;
        }

        var timer = the[_timer] = time.setInterval(function () {
            var elapsedTime = timer.elapsedTime;
            var remainTime = 0;

            if (the[_options].count !== -1) {
                remainTime = the[_count] - elapsedTime;
            }

            if (remainTime < 0) {
                the.stop();
                return;
            }

            the.emit('change', remainTime, elapsedTime);
        }, the[_options].interval, true);
        the.state = STATE_STARTED;
        return the;
    },


    /**
     * 获取已经流逝的时间
     * @returns {Number}
     */
    getElapsedTime: function () {
        var timer = this[_timer];

        if (timer) {
            return timer.elapsedTime;
        }

        return 0;
    },


    /**
     * 获取剩余的时间
     * @returns {Number}
     */
    getRemainTime: function () {
        var the = this;

        if (the[_options].count > 0) {
            return the[_count] - the.getElapsedTime();
        }

        return 0;
    },


    /**
     * 暂停计时
     * @returns {CountDown}
     */
    pause: function () {
        var the = this;

        if (!the[_timer] || the.state === STATE_DESTROYED) {
            return the;
        }

        time.clearInterval(the[_timer]);
        the[_count] -= the[_timer].times * the[_options].interval;
        the[_timer] = null;
        the.state = STATE_PAUSED;
        return the;
    },


    /**
     * 恢复计时
     * @returns {*|CountDown}
     */
    resume: function () {
        return this.start();
    },


    /**
     * 停止计时器
     * @returns {CountDown}
     */
    stop: function () {
        var the = this;

        if (!the[_timer]) {
            return the;
        }

        the[_count] = 0;
        time.clearInterval(the[_timer]);
        the[_timer] = null;
        the.state = STATE_READY;
        time.nextTick(function () {
            the.emit('change', 0, the[_count]);
            the.emit('stop');
        });
        return the;
    },


    /**
     * 设置总时间
     * @param count
     * @returns {CountDown}
     */
    setCount: function (count) {
        var the = this;

        if (typeis.Date(count)) {
            count = count.getTime() - date.now();
        }

        the[_count] = the[_options].count = count;
        return the;
    },


    /**
     * 重置计时
     * @returns {CountDown}
     */
    reset: function () {
        return this.setCount(this[_options].count);
    },


    /**
     * 判断是否正在计时
     * @returns {boolean}
     */
    is: function () {
        return Boolean(this[_timer]);
    },


    /**
     * 销毁实例
     */
    destroy: function () {
        var the = this;

        the.stop();
        the.state = STATE_DESTROYED;
        CountDown.superInvoke('destroy', the);
    }
});
var _options = CountDown.sole();
var _timer = CountDown.sole();
var _count = CountDown.sole();


CountDown.defaults = defaults;
module.exports = CountDown;
