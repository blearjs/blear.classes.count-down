/**
 * blear.classes.count-down
 * @author ydr.me
 * @create 2016年06月04日14:09:36
 */

'use strict';

var time = require('blear.utils.time');
var object = require('blear.utils.object');
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

        the[_options] = object.assign({}, defaults, options);
    }
});
var _options = CountDown.sole();

CountDown.defaults = defaults;
module.exports = CountDown;