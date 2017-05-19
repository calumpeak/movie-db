'use strict';

const path      = require('path');
const webpack   = require('webpack');
const merge     = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');
const config = require('./config');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'client'),
    build: path.join(__dirname, 'dist')
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', ',jsx'],
        alias: {
            components: `${PATHS.app}/components`,
            containers: `${PATHS.app}/containers`,
            utils: `${PATHS.app}/utils`,
            constants: `${PATHS.app}/constants`
        }
    },
    output: {
        path: PATHS.build,
        filename: 'movie-db.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app
            }
        ]
    }
};


if (TARGET === 'dev' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,
            historyAPIFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,
            proxy: {
                '*': `http://localhost:${config.port}`
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new DashboardPlugin()
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        plugins:[
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                comments: false,
                compress: {
                    warnings: false
                }
            })
        ]
    });
}
