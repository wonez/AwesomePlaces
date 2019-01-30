import { Navigation } from 'react-native-navigation';
import { configureStore } from '../store/configureStore';

import { Provider } from 'react-redux';

import Auth from './Auth/Auth';
import FindPlace from './FindPlace/FindPlace';
import SharePlace from './SharePlace/SharePlace';
import PlaceDetail from './PlaceDetail/PlaceDetail';
import SideMenu from './SideMenu/SideMenu';

const store = configureStore();

export function registerScreens(){
    Navigation.registerComponentWithRedux("AuthScreen", () => Auth, Provider, store);
    Navigation.registerComponentWithRedux("PlaceDetail", () => PlaceDetail, Provider, store);
    Navigation.registerComponentWithRedux("FindPlace", () => FindPlace, Provider, store);
    Navigation.registerComponentWithRedux("SharePlace", () => SharePlace, Provider, store);
    Navigation.registerComponentWithRedux('SideMenu', () => SideMenu, Provider, store);
}