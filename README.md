# textavatar

Text Avatar(one or twe word) Generation Web Server. (NodeJS)

![textavatar](art/kei.topaz@gmail.png)

## Features

- [x] cli, library and web server support
- [x] one or twe word
- [x] Uppercase conversion
- [x] In case of error, return empty image
- [x] cache support
- [x] 20 patterns of predictable background color
- [x] 100% Pure Javascript

## QuickStart (CLI)

```sh
npm install textavatar -g
```

```sh
textavatar -h

  Usage: textavatar [options]

  Text Avatar(one or twe word) Generation


  Options:

    -V, --version     output the version number
    -t --text <text>  one or twe word. ex) fk (default: )
    -o --out <out>    Write file path (default: output.png)
    -h, --help        output usage information
```

### test cli

```sh
node ./cli.js
```

## QuickStart (Web Server)

```sh
cd {project_dir}
npm install
```

## Server start :)

```sh
npm start # production
npm run debug # development(nodemon)
```

## Access URL pattern

pattern) `https://localhost:3000/{one or twe word}?size={image size}`

### ex

- `https://localhost:3000/kei.topaz@gmail.com` # default size = 200
- `https://localhost:3000/kei.topaz@gmail.com?size=250` # output word = `KE` and size = 250
