const path = require('path');
const {By, Key, until, Browser} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const test = require('selenium-webdriver/testing');
const chai   = require('chai');
const assert = chai.assert;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

test.suite(env => {
    describe('form-association-polyfill tests', function() {
        let driver, cap;

        before(async function() {
            let chromeOptions = new chrome.Options().headless();
            let firefoxOptions = new firefox.Options().headless();
            driver = await env.builder()
                .setChromeOptions(chromeOptions)
                .setFirefoxOptions(firefoxOptions)
                .build();
            cap = await driver.getCapabilities();
        });

        after(() => driver.quit());

        it('Check from external', async function() {
            let testFile = path.resolve(__dirname, '../test-data/file1.dat');
            await driver.get('http://localhost:3003/external');
            await driver.findElement(By.css('input[type="file"]')).sendKeys(testFile);
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.body.hidden, '1');
            assert.strictEqual(json.body.text, '1');
            assert.strictEqual(json.body.password, '1');
            assert.strictEqual(json.body.email, 'none@example.com');
            assert.strictEqual(json.body.textarea, '1');
            assert.deepEqual(json.body.checkbox, ['1']);
            assert.strictEqual(json.body.radio, '1');
            assert.strictEqual(json.body.select, '2');
            if (cap.getBrowserName() !== Browser.SAFARI) { // safari not support file upload
                assert.strictEqual(json.files[0].originalname, 'file1.dat');
                assert.strictEqual(json.files[0].size, 5);
            }
        });

        it('Check from other form', async function() {
            let testFile = path.resolve(__dirname, '../test-data/file1.dat');
            await driver.get('http://localhost:3003/other-form');
            await driver.findElement(By.css('input[type="file"]')).sendKeys(testFile);
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.body.hidden, '1');
            assert.strictEqual(json.body.text, '1');
            assert.strictEqual(json.body.password, '1');
            assert.strictEqual(json.body.email, 'none@example.com');
            assert.strictEqual(json.body.textarea, '1');
            assert.deepEqual(json.body.checkbox, ['1']);
            assert.strictEqual(json.body.radio, '1');
            assert.strictEqual(json.body.select, '2');
            if (cap.getBrowserName() !== Browser.SAFARI) { // safari not support file upload
                assert.strictEqual(json.files[0].originalname, 'file1.dat');
                assert.strictEqual(json.files[0].size, 5);
            }
        });

        it('Check inside form', async function() {
            let testFile = path.resolve(__dirname, '../test-data/file1.dat');
            await driver.get('http://localhost:3003/inside-form');
            await driver.findElement(By.css('input[type="file"]')).sendKeys(testFile);
            await driver.findElement(By.css('button')).click();
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);

            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.isUndefined(json.body.hidden);
            assert.isUndefined(json.body.text);
            assert.isUndefined(json.body.password);
            assert.isUndefined(json.body.email);
            assert.isUndefined(json.body.textarea);
            assert.isUndefined(json.body.checkbox);
            assert.isUndefined(json.body.radio);
            assert.isUndefined(json.body.select);
            assert.isEmpty(json.files);
        });

        it('Check external buttons', async function() {
            let json;
            await driver.get('http://localhost:3003/btn-external');

            await asyncForEach(['button[type="reset"]', 'button[type="button"]'], async sel => {
                await driver.findElement(By.css(sel)).click();
                await driver.sleep(30);
                assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:3003/btn-external');
            });

            let list = [
                {sel: 'button[name="default"]', field: 'default'},
                {sel: 'button[type="submit"]',  field: 'submit'},
                {sel: 'input[type="submit"]',   field: 'input'},
                {sel: 'input[type="image"]',    field: 'image'},
            ];
            await asyncForEach(list, async data => {
                await driver.findElement(By.css(data.sel)).click();
                await driver.wait(until.urlContains('/response'), 1000);
                await driver.wait(until.elementLocated(By.css('code')), 300);
                json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
                json = JSON.parse(json);
                assert.strictEqual(json.body.text, '1');
                if (data.field === 'image') {
                    assert.exists(json.body['image.x']);
                    assert.exists(json.body['image.y']);
                } else {
                    assert.strictEqual(json.body[data.field], '1');
                    await driver.get('http://localhost:3003/btn-external');
                }
            });
        });

        it('Check buttons in another form', async function() {
            let json;
            await driver.get('http://localhost:3003/btn-other-form');

            await asyncForEach(['button[type="reset"]', 'button[type="button"]'], async sel => {
                await driver.findElement(By.css(sel)).click();
                await driver.sleep(30);
                assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:3003/btn-other-form');
            });

            let list = [
                {sel: 'button[name="default"]', field: 'default'},
                {sel: 'button[type="submit"]',  field: 'submit'},
                {sel: 'input[type="submit"]',   field: 'input'},
                {sel: 'input[type="image"]',    field: 'image'},
            ];
            await asyncForEach(list, async data => {
                await driver.findElement(By.css(data.sel)).click();
                await driver.wait(until.urlContains('/response'), 1000);
                json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
                json = JSON.parse(json);
                assert.strictEqual(json.body.text,        '1');
                if (data.field === 'image') {
                    assert.exists(json.body['image.x']);
                    assert.exists(json.body['image.y']);
                } else {
                    assert.strictEqual(json.body[data.field], '1');
                    await driver.get('http://localhost:3003/btn-other-form');
                }
            });
        });

        it('Check submit by enter external', async function() {
            await driver.get('http://localhost:3003/enter-external');
            await driver.findElement(By.css('input[type="text"]')).sendKeys(Key.RETURN);
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);
            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.body.text,   '1');
            assert.strictEqual(json.body.submit, '1');
        });

        it('Check submit by enter internal', async function() {
            await driver.get('http://localhost:3003/enter-internal');
            await driver.findElement(By.css('input[type="text"]')).sendKeys(Key.RETURN);
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);
            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.body.text,   '1');
            assert.strictEqual(json.body.submit, '1');
        });

        it('Check submit by enter and external button', async function() {
            await driver.get('http://localhost:3003/enter-external-button');
            await driver.findElement(By.css('input[type="text"]')).sendKeys(Key.RETURN);
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);
            let json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.strictEqual(json.body.text,   '1');
            assert.strictEqual(json.body.submit, '1');
        });

        it('Check not exists form', async function() {
            let json;
            await driver.get('http://localhost:3003/not-exists-form');
            await driver.findElement(By.id('btn2')).click();
            await driver.sleep(30);
            assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:3003/not-exists-form');

            await driver.findElement(By.css('input[type="text"]')).sendKeys(Key.RETURN);
            await driver.sleep(30);
            assert.strictEqual(await driver.getCurrentUrl(), 'http://localhost:3003/not-exists-form');

            await driver.findElement(By.id('btn1')).click();
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);
            json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.isUndefined(json.body.text);
        });

        it('Check order', async function() {
            let json;
            await driver.get('http://localhost:3003/order');

            let list = [
                {val: 1, result: ['1', '2', '5', '8']},
                {val: 3, result: ['2', '3', '5', '8']},
                {val: 4, result: ['2', '4', '5', '8']},
                {val: 6, result: ['2', '5', '6', '8']},
                {val: 7, result: ['2', '5', '7', '8']},
                {val: 9, result: ['2', '5', '8', '9']},
            ];
            await asyncForEach(list, async data => {
                await driver.findElement(By.css(`button[value="${data.val}"]`)).click();
                await driver.wait(until.urlContains('/response'), 1000);
                await driver.wait(until.elementLocated(By.css('code')), 300);
                json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
                json = JSON.parse(json);
                assert.deepEqual(json.body.list, data.result);
                await driver.get('http://localhost:3003/order');
            });

            await driver.findElement(By.css('input[value="2"]')).sendKeys(Key.RETURN);
            await driver.wait(until.urlContains('/response'), 1000);
            await driver.wait(until.elementLocated(By.css('code')), 300);
            json = await driver.findElement(By.css('code')).getAttribute('innerHTML');
            json = JSON.parse(json);
            assert.deepEqual(json.body.list, ['1', '2', '5', '8']);
        });
    });
});