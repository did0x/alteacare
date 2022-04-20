
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import main from './main';

const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: [''],
};

const mainPersistConfig = {
    key: 'main',
    storage: storage,
    whitelist: [''],
};

const rootReducer = combineReducers({
    main: persistReducer(mainPersistConfig, main),
});

export default persistReducer(rootPersistConfig, rootReducer);