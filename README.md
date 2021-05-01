# MyStore APP


> This is for pratice only using next and diff backend like rails/java(might be) with graphql. I will also use this one on my sarisari store sales and invetory in future(I Hope I can continue this. ^_^)


I did follow a lot of tutorial specially on rails part and graphql side of things, then next will do testing with rspec and react testing library.

> Please do critic this work in all of its part, and point me to what I can improve more.

## Frontend ([Next JS](https://nextjs.org/))

> I've been using this ever since 2018 and never came back to CRA(create react app) maybe **Because I'm not confident with regards to routing/webpack configuration.**.

### Run by using the following commands

install the packages.
```
yarn install
```
Generate the graphql stuff + hooks
```
yarn codegen
```
Then run the developement part.

```
yarn dev
```

or run production.

```
yarn build

yarn start
```

### Tech Stack
1. [Chakra UI](https://chakra-ui.com/) - a css framework
2. [Apollo Client](https://www.apollographql.com/docs/react/) - for handling graphql
3. [Graphql Code Generator](https://www.graphql-code-generator.com/) - can't explain :D
4. [Formik](https://formik.org/docs/overview) - a Form Library for react
5. [Yup](https://github.com/jquense/yup) - for input validation
6. [React Icons](https://react-icons.github.io/react-icons) - for additional icons
7. of course NextJS - react js framework.
8. [React testing library](https://testing-library.com/docs/react-testing-library/intro/) - didn't use this one yet but its there waiting.
9. Eslint - im not sure why its not working, I even tried putting a root on it, but still it didn't work.

### Navigation

to navigate the code just go to `pages` first, its like the routes.
`pages/_app.tsx` this one is like the App.js you can see in CRA(create react app)

## Backend (rails)

If you know how to use docker this will be easy, just `cd to the root dir` and do the following.

#### Run the api
```
docker-compose up -d
```
#### for rails and bundle command
```
docker-compose run --rm mystore_api rails g [some commands here]
```
```
docker-componse run --rm mystore_api bundle [either install or add gem_name]
```

> mystore_api is the name of the rails api container, check docker-compose.yml to change this or check the other containers. `--rm` this flag is for the docker-compose to exit after exicuting its command.


If you just use rails serve, please change the port to 3001 like:
```zsh
cd backend

rails s -p 3001
```

> I used 3001 in the fontend code Im not sure why `.yml` don't read my `.env`. im not also sure if the `next.config.js` do read my `.env`

### Tech stask
1. [rails](http://rubyonrails.org/) - do follow the docs for model/migration generators.
2. [graphql-ruby](https://graphql-ruby.org/) - do follow the doc for its generator(object and mutation)
3. Check the Gemfile I enable some of the commented gem like bcrypt and rack-cors
4. [Graphql Device](https://github.com/graphql-devise/graphql_devise) - This a authentication gem that uses device and device token auth. I don't recomend this one cause there might be a more greater gem for JWT authentication
5. rspec - soon.


## VSCODE Extensions
> if you have this extensions it will help you code to be much clearner and to make sure to follow the best practices.

1. eslint
2. tslint
3. prettier
4. ruby-rubocop - for ruby

## For Review
1. Authentication(Login, Registration, Logout)
2. Profile (Account Info. Change Password)

## TODO
1. products
2. I don't know yet
