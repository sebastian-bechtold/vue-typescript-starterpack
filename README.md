# vuejs-typescript-webpack2-sample
A minimal example of integrating TypeScript and Vue.js using Webpack 2


## Ultra-quick start if you're super-impatient regarding set-up and configuration chores:
If you just want to get a Typescript+Vue.js project up and running as quickly as possible and don't feel the need to understand the individual steps, simply do the following (assuming that you already have *git* and *npm* installed on your system):

    git clone https://github.com/sebastian-bechtold/vuejs-typescript-webpack2-sample.git
    npm install
    npm run dev
    
Your Typescript+Vue.js sample web app is now ready for viewing at `http://localhost:8080`

If you want to understand a little more about what's going on here, read on. The following sections describe the individual project set-up steps in some more detail (work in progress!):

## Motivation

When I decided to start using Vue.js, it was clear for me from the first moment on that I wanted to use it together with TypeScript. I had used TypeScript for a while and was more than convinced by the amazing increase in productivity that TypeScript provides compared to plain JavaScript. So, I started to look for a tutorial about how to set up the two to work together. I googled for hours and while I found many articles and sample projects on the topic, none of them was fully functional. Sometimes, instructions were written for outdated versions of the involved software packages, sometimes a small but critical step was missing.

After many hours of googleing, reading, trial and error, I finally had a working project up and running. I'm sharing this project here with you in the hope to save you these hours if you're in a similar situation.

The instructions and sample code provided here worked on my system as of 2017-08-20 with the latest versions of the involved packages avialable on npm at this time. Since this might not mean much in the crazily fast-moving world of front-end web development - good luck!


## Set up a npm project:

    npm init -y

This command will create a file named 'package.json' in your project folder. package.json is the central configuration and "housekeeping" file of npm, the Node Package Manager. We'll use npm to download and manage all software packages required by this project.

Open your newly created package.json with your text editor and add the following property to the "scripts" section:

    "dev" : "webpack-dev-server"
    
This little line will later enable you to start the development server from your command line by typing `npm run dev` in your project directory.

Now, your package.json should look like this:

    {
      "name": "vue-ts-sample",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev" : "webpack-dev-server"
      },
      "keywords": [],
      "author": "",
      "license": "ISC"
    }

## Install required packages using npm:
    
    npm install css-loader node-sass sass-loader ts-loader typescript vue vue-class-component vue-loader vue-template-compiler webpack webpack-dev-server
    
Let's take a closer look at what we're downloading here:

- *typescript*: The TypeScript compiler.
- *vue*: The Vue.js library.
- *vue-class-component*: A TypeScript extension that allows you to write Vue.js components as TypeScript classes. Not absolutely necessary to combine TypeScript with Vue, but **HIGHLY** recommended for *much* cleaner and TypeScript-idiomatic code structure.
- *vue-template-compiler*: A module to compile Vue.js templates to JavaScript.
- *node-sass*: A module to compile SASS code (enhanced CSS) to browser-readable "classic" CSS.
- *webpack*: A build tool that compiles different types of source files into something that can be run by the browser.
- *css-loader*, *sass-loader*, *ts-loader* and *vue-loader*: These are plug-ins for Webpack that enable Webpack to compile CSS, SCSS/SASS, TypeScript and Vue component source files into a project.
- *webpack-dev-server*: A small web server that can be launched from the command line and makes your project accessible via http for development purposes. What makes it extremely helopful is that it automatically rebuilds and reloads you app when a source file has changed.

## Set up Webpack:

In your project root directory, create a file named `webpack.config.js` with the following content. This will be your Webpack configuration file:

    var path = require('path')
    var webpack = require('webpack')

    module.exports = {
      entry: './src/index.ts',
      output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {

              loaders: {
                'scss': 'vue-style-loader!css-loader!sass-loader',
                'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
              },

              esModule: true
            }
          },
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              appendTsSuffixTo: [/\.vue$/],
            }
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        }
      },
      devServer: {
        historyApiFallback: true,
        noInfo: true
      },
      performance: {
        hints: false
      },
      devtool: '#eval-source-map'
    }

    if (process.env.NODE_ENV === 'production') {
      module.exports.devtool = '#source-map'
      // http://vue-loader.vuejs.org/en/workflow/production.html
      module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            warnings: false
          }
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        })
      ])
    }


## Set up TypeScript:

In your project root directory, create a file named `tsconfig.json` with the following content. This will be the configuration file for the TypeScript compiler:

    {
      "compilerOptions": {
        "allowSyntheticDefaultImports": true,
        "declaration": true,
        "experimentalDecorators": true,
        "lib": [
          "dom",
          "es5",
          "es2015.promise"
        ],
        "isolatedModules": false,
        "module": "es2015",
        "moduleResolution": "node",
        "noImplicitAny": true,
        "noImplicitThis": true,
        "outDir": "lib",
        "removeComments": true,
        "strictNullChecks": true,
        "suppressImplicitAnyIndexErrors": true,
        "target": "es5"
      },
      "include": [
        "src/**/*.ts"
      ]
    }


## Create source folder and initial sample files:

    mkdir src
    mkdir src/components

### index.html:

    <!doctype html>
    <html>
    <body>
        <div id="app"></div>
    </body>
    <script src="./dist/build.js"></script>
    </html>
    
### src/index.ts:

    import Vue from 'vue'
    import App from './components/App.vue'

    new Vue({
      el: '#app',
      render: h => h(App, {
        props: { msg: 'Hello World!' }
      })
    })


### src/vue-shim.d.ts:

This little file is critical! Without it, you won't be able to `import` Vue component files (.vue) in your TypeScript code.

    declare module "*.vue" {
        import Vue from "vue";
        export default Vue;
    }

### src/components/App.vue:

    <template>
      <div class="app">
        <p>The message: <input v-model="msg"/></p>

        <p>TypeScript and Vue say:</p>
        <h1>{{msg}}</h1>
      </div>
    </template>

    <script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component({
      props: {
        msg: String
      }
    })
    export default class App extends Vue {
      msg: string;
    }
    </script>

    <style>
    div.app h1 {
        font-family:sans-serif;
    }
    </style>

## Finally, start up the dev server:
    npm run dev
    
Now open the web browser of your choice and navigate to `http://localhost:8080`. If everything is set up correctly, you should see something like this:

![Screenshot](https://raw.githubusercontent.com/sebastian-bechtold/vuejs-typescript-webpack2-sample/master/hello-world.png "Sample Project Screenshot")


