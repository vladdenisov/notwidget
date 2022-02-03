import logger from './logger';
import checkMethod from './checkMethod';
import isAuthed from './isAuthed';
// The order of middlewares matter
export default {
    checkMethod,
    logger,
    isAuthed
};
