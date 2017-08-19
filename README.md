# vuejs-typescript-webpack2-sample
A minimal example of integrating TypeScript and Vue.js using Webpack 2


## Ultra-quick start if you're super-impatient regarding set-up and configuration chores:
If you just want to get a Typescript+Vue.js project up and running as fast as possible and don't feel the need to understand the individual steps, simply do the following (assuming that you already have *git* and *npm* installed on your system):

    git clone https://github.com/sebastian-bechtold/vuejs-typescript-webpack2-sample.git
    npm install
    npm run dev
    
Your Typescript+Vue.js sample web app is now ready for viewing at `http://localhost:8080`

If you want to understand a little more about what's going on here, read on. The following sections describe the individual project set-up steps in some more detail (work in progress!):

## Set up a npm project:

    npm init -y

This command will create a file named 'package.json' in your project folder. package.json is the central configuration and "housekeeping" file of npm.

Open your newly created package.json with your text editor and add the following property to the "scripts" section:

    "dev" : "webpack-dev-server"

Afterwards, your package.json should look like this:

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

## Installing required packages:

    npm install webpack webpack-dev-server css-loader typescript ts-loader vue vue-loader vue-class-component vue-template-compiler

## Setting up Webpack:

webpack.config.js:

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


## Setting up TypeScript:

tsconfig.json:

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


## Creating src folder and initial sample files:

    mkdir src
    mkdir src/components

index.html:

    <!doctype html>
    <html>
    <body>
        <div id="app"></div>
    </body>
    <script src="./dist/build.js"></script>
    </html>
    
src/index.ts:

    import Vue from 'vue'
    import App from './components/App.vue'

    new Vue({
      el: '#app',
      render: h => h(App, {
        props: { msg: 'Hello World!' }
      })
    })


src/vue-shim.d.ts:

    declare module "*.vue" {
        import Vue from "vue";
        export default Vue;
    }

src/components/App.vue:

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


