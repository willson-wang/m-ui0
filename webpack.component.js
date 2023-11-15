const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const glob = require('glob'); //node自带的模块用于遍历
const list = {};
async function makeList(dirPath, list) {
    const files = glob.sync(`${dirPath}/**/index.js`); //console.log(files):'UI/packages/button/index.js'.'...'
    for (let file of files) {
        const component = file.split(/[/.]/)[2]; //取到组件name
        list[component] = `./${file}`; //添加到list对象
    }
}
makeList('UI/packages', list);
module.exports = {
    entry: list,
    mode: 'production',
    output: {
        filename: '[name].umd.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'mui',
        libraryTarget: 'umd'
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            minify: TerserPlugin.esbuildMinify,
            terserOptions: { // 指定esbuild的target为es5,注意一定确保babel-loader or swc-loader将代码转换成了es5，不然会报target environment ("es5") is not supported yet这样的错误
                target: 'es5'
            }
            // minify: TerserPlugin.terserMinify
        })],
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
            }]
        }, 
        {
            test: /\.m?(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: [{
                // loader: 'babel-loader',
                loader: 'swc-loader',
            }]
        }
    ]
    }
}