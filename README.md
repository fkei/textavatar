# textavatar

Text Avatar(one or twe word) Generation Web Server. (NodeJS)

![textavatar](art/kei.topaz@gmail.png)

# Features

- [x] cli, library and web server support
- [x] one or twe word
- [x] Uppercase conversion
- [x] In case of error, return empty image
- [x] cache support
- [x] 20 patterns of predictable background color
- [x] 100% Pure Javascript


# QuickStart

```
$ npm install
```

# Server start :)

```
$ npm start # production
$ npm run debug # development(nodemon)
```

# Access URL pattern

pattern) `https://localhost:3000/{one or twe word}?size={image size}`

### ex
- `https://localhost:3000/kei.topaz@gmail.com` # default size = 200
- `https://localhost:3000/kei.topaz@gmail.com?size=250` # output word = `KE` and size = 250