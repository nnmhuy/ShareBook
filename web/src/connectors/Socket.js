import openSocket from 'socket.io-client';
import { socketURL } from '../constants/constants'

const socket = openSocket(socketURL);
export default socket