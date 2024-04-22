import HtmlWebPackPlugin from "html-webpack-plugin";



export default {

  module: {

    rules: [

      {

        test: /\.m?js$/,

        exclude: /(node_modules|bower_components)/,

        use: {

          loader: "babel-loader",

        },

      },

    ],

  },

  plugins: [

    new HtmlWebPackPlugin({

      template: "./src/index.html",

      filename: "./index.html",

    }),

  ],

};