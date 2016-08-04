/**
 * karma 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var CountDown = require('../src/index.js');

describe('测试文件', function () {
    it('参数为数字', function (done) {
        var cd = new CountDown(10000);

        cd.on('start', function () {
            console.log('start');
        });

        cd.on('change', function (remain) {
            console.log('change', Math.ceil(remain / 1000));
        });

        cd.on('stop', function () {
            console.log('stop');
            expect(cd.is()).toEqual(false);
            done();
        });

        cd.start();
    }, 20000);

    it('参数为对象', function (done) {
        var cd = new CountDown({count: 4000});

        cd.on('start', function () {
            console.log('start');
        });

        cd.on('change', function (remain) {
            console.log('change', Math.ceil(remain / 1000));
        });

        cd.on('stop', function () {
            console.log('stop');
            expect(cd.is()).toEqual(false);
            done();
        });

        cd.start();
    }, 20000);
});
