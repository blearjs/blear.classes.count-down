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

    it('#start', function (done) {
        var cd = new CountDown({
            count: 100,
            interval: 10
        });
        var times = 0;

        cd.start();
        cd.start();
        cd.on('change', function () {
            times++;
        });
        cd.on('stop', function () {
            expect(times).toBeGreaterThan(0);
            done();
        });
    });

    it('#pause/resume', function (done) {
        var cd = new CountDown({
            count: 200,
            interval: 10
        });
        var times = 0;

        cd.start();
        cd.start();
        cd.on('change', function () {
            times++;

            if (times === 2) {
                cd.pause();
                cd.pause();
                cd.resume();
            }
        });
        cd.on('stop', function () {
            expect(times).toBeGreaterThan(0);
            done();
        });
    });

    it('#setCount', function (done) {
        var cd = new CountDown({
            count: 100,
            interval: 10
        });
        var times = 0;

        cd.start();
        cd.setCount(200);
        cd.on('change', function () {
            times++;
        });
        cd.on('stop', function () {
            expect(times).toBeGreaterThan(1);
            done();
        });
    });

    it('#reset', function (done) {
        var cd = new CountDown({
            count: 100,
            interval: 10
        });
        var times = 0;
        var reset = false;

        cd.start();
        cd.on('change', function () {
            times++;
        });
        cd.on('stop', function () {
            if (reset) {
                expect(times).toBeGreaterThan(2);
                done();
                return;
            }

            reset = true;
            expect(times).toBeGreaterThan(1);
            cd.reset();
            cd.start();
        });
    });

    it('#stop、#getElapsedTime、#getRemainTime', function (done) {
        var cd = new CountDown({
            count: 200,
            interval: 10
        });

        cd.stop();
        cd.start();
        cd.on('change', function (remainTime, elapsedTime) {
            expect(cd.getRemainTime()).toBe(remainTime);
            expect(cd.getElapsedTime()).toBe(elapsedTime);
        });
        cd.stop();
        cd.on('stop', function () {
            expect(cd.getRemainTime()).toBe(0);
            done();
        });
    });

    it('#destroy', function (done) {
        var timer = new CountDown({
            count: 200,
            interval: 10
        });

        timer.start();
        timer.destroy();
        timer.on('stop', function () {
            done();
        });
    });
});
