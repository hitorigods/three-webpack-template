module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: `${__dirname}/dist`,
		filename: 'bundle.js',
	},
	devServer: {
		static: './dist',
	},
	resolve: {
		extensions: ['.js', '.glsl', 'vs', 'fs'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				// node_modulesは対象外
				exclude: /node_modules/,
				//トランスコンパイラ
				use: ['babel-loader'],
			},
			{
				test: /\.(glsl|vs|fs|vert|frag)$/,
				type: 'asset/source',
				generator: {
					filename: 'assets/images/[hash][ext]',
				},
			},
			{
				test: /\.(jpg|jpeg|png|gif|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[hash][ext]',
				},
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
