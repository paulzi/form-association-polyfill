const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

function template(body) {
    return `<!DOCTYPE html>
        <html lang="ru-RU">
        <head>
            <meta charset="UTF-8">
            <title>form-association-polyfill test</title>
        </head>
        <body>
            ${body}
            <script src="/form-association-polyfill-register-with-shims.js"></script>
        </body>
        </html>`;
}

function templateFields(form) {
    form = form ? `form=${form}` : '';
    return `
        <input type="hidden" name="hidden" value="1" ${form}>
        <input type="text" name="text" value="1" ${form}>
        <input type="password" name="password" value="1" ${form}>
        <input type="email" name="email" value="none@example.com" ${form}>
        <textarea name="textarea" ${form}>1</textarea>
        <input type="checkbox" name="checkbox[]" value="0" ${form}>
        <input type="checkbox" name="checkbox[]" value="1" checked ${form}>
        <input type="radio" name="radio" value="0" ${form}>
        <input type="radio" name="radio" value="1" checked ${form}>
        <select name="select" ${form}>
            <option value="1">1</option>
            <option value="2" selected>2</option>
        </select>
        <select name="selectMultiple[]" ${form} multiple>
            <option value="1">1</option>
            <option value="2" selected>2</option>
            <option selected>3</option>
        </select>
        <input type="file" name="file" ${form}>
    `;
}

function templateButtons(form) {
    form = form ? `form=${form}` : '';
    return `
        <button type="reset" name="reset" value="1" ${form}>reset</button>
        <button type="button" name="button" value="1" ${form}>No submit</button>
        <button name="default" value="1" ${form}>Submit default</button>
        <button type="submit" name="submit" value="1" ${form}>Submit</button>
        <input type="submit" name="input" value="1" ${form}>
        <input type="image" src="//placehold.it/100x50" alt="" name="image" ${form}>
    `;
}

app.get('/', (req, res) => {
    res.send('ok');
});

app.get('/external', (req, res) => {
    res.send(template(`
        <form action="/response" method="post" enctype="multipart/form-data" id="form1">
            <button>Submit</button>
        </form>
        ${templateFields('form1')}
    `));
});

app.get('/other-form', (req, res) => {
    res.send(template(`
        <form action="/response" method="post" enctype="multipart/form-data" id="form1">
            <button>Submit</button>
        </form>
        <form action="/fee-other-form" method="post" enctype="multipart/form-data" id="form2">
            ${templateFields('form1')}
        </form>
    `));
});

app.get('/inside-form', (req, res) => {
    res.send(template(`
        <form action="/response" method="post" enctype="multipart/form-data" id="form1">
            ${templateFields('form2')}
            <button>Submit</button>
        </form>
        <form action="/fee-other-form" method="post" enctype="multipart/form-data" id="form2">
        </form>
    `));
});

app.get('/btn-external', (req, res) => {
    res.send(template(`
        <form action="/response" method="post" id="form1">
            <input type="text" name="text" value="1">
        </form>
        ${templateButtons('form1')}
    `));
});

app.get('/btn-other-form', (req, res) => {
    res.send(template(`
        <form action="/response" method="post" id="form1">
            <input type="text" name="text" value="1">
        </form>
        <form action="/fee-btn-other-form" method="post" id="form2">
            ${templateButtons('form1')}
        </form>
    `));
});

app.get('/enter-external', (req, res) => {
    res.send(template(`
        <form action="/response" method="post" id="form1">
            <button type="button">Button</button>
            <button type="submit" name="submit" value="1">Submit</button>
        </form>
        <input type="text" name="text" value="1" form="form1">
    `));
});

app.get('/enter-internal', (req, res) => {
    res.send(template(`
        <form action="/response" method="post" id="form1">
            <button type="button">Button</button>
            <button type="submit" name="submit" value="1">Submit</button>
        </form>
        <form action="/fee-enter-internal" method="post" id="form2">
            <input type="text" name="text" value="1" form="form1">
            <button type="button">Button</button>
            <button type="submit">Submit</button>
        </form>
    `));
});

app.get('/enter-external-button', (req, res) => {
    res.send(template(`
        <form action="/response" method="post" id="form1">
            <input type="text" name="text" value="1">
            <button type="button">Button</button>
        </form>
        <button type="submit" name="submit" value="1" form="form1">Submit</button>
    `));
});

app.get('/not-exists-form', (req, res) => {
    res.send(template(`
        <form action="/response" method="post" id="form1">
            <input type="text" name="text" value="1" form="form2">
            <button id="btn1">Submit</button>
            <button id="btn2" form="form2">Submit</button>
        </form>
    `));
});

app.get('/order', (req, res) => {
    res.send(template(`
        <button name="list[]" value="1" form="form1">Submit 1</button>
        <input type="text" name="list[]" value="2" form="form1">
        <button name="list[]" value="3" form="form1">Submit 3</button>
        <form action="/response" method="post" id="form1">
            <button name="list[]" value="4">Submit 4</button>
            <input type="text" name="list[]" value="5">
            <button name="list[]" value="6">Submit 6</button>
        </form>
        <button name="list[]" value="7" form="form1">Submit 7</button>
        <input type="text" name="list[]" value="8" form="form1">
        <button name="list[]" value="9" form="form1">Submit 9</button>
    `));
});

app.all('/response', upload.any(), (req, res) => {
    let json = {
        query: req.query,
        body: req.body,
        files: req.files
    };
    res.send(`<!DOCTYPE html>
        <html lang="ru-RU">
        <head>
            <meta charset="UTF-8">
            <title>response</title>
        </head>
        <body>
            <code>${JSON.stringify(json)}</code>
        </body>
        </html>`);
});

app.listen(3003, () => console.log('Test server listening on port 3003!'));

