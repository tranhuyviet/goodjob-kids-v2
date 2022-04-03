import mongoose from 'mongoose';

// isConnected
// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting
let isConnected = 0;

const connect = async () => {
	try {
		if (isConnected === 1) {
			// eslint-disable-next-line no-console
			console.log('Already Connected to Database');
			return;
		}

		if (mongoose.connections.length > 0) {
			isConnected = mongoose.connections[0].readyState;
			if (isConnected === 1) {
				// eslint-disable-next-line no-console
				console.log('Use Previous Connection');
				return;
			}
			await mongoose.disconnect();
		}

		// create new connection to database
		await mongoose.connect(process.env.MONGODB_URI as string);
		// eslint-disable-next-line no-console
		console.log('Connect Database Successfully');
		isConnected = mongoose.connections[0].readyState;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Connect to Database Error');
		// eslint-disable-next-line no-console
		console.log(error);
		process.exit(1);
	}
};

const disconnect = async () => {
	try {
		if (isConnected === 1) {
			if (process.env.NODE_ENV === 'production') {
				await mongoose.disconnect();
				isConnected = 0;
			} else {
				// eslint-disable-next-line no-console
				console.log('Development - Not Disconnected Database');
			}
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Disconnect Error');
		// eslint-disable-next-line no-console
		console.log(error);
		process.exit(1);
	}
};

const db = { connect, disconnect };
export default db;
