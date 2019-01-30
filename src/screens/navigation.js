import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export const goAuth = () => Navigation.setRoot({
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: 'AuthScreen',
                    }
                }
            ]
        }
    }
})

export const goHome = () => {

    Promise.all([
        Icon.getImageSource('md-map', 30),
        Icon.getImageSource('ios-share-alt', 30),
        Icon.getImageSource('ios-menu', 30),
    ]).then(icons => {

        return Navigation.setRoot({
            root: {
                sideMenu: {
                    left: {
                        component: {
                            name: 'SideMenu'
                        }
                    },
                    center: {
                        bottomTabs: {
                            id: 'BottomTabsId',
                            visible: true,
                            children: [
                                {
                                    stack: {
                                        children: [
                                            {
                                                component: {
                                                    name: 'FindPlace',
                                                    options: {
                                                        bottomTabs: {
                                                            backgroundColor: 'rebeccapurple',
                                                        },
                                                        bottomTab: {
                                                            fontSize: 12,
                                                            text: 'Find Place',
                                                            icon: icons[0],
                                                            iconColor: 'white',
                                                            textColor: 'white',
                                                            selectedIconColor: 'gold',
                                                            selectedTextColor: 'gold'
                                                        },
                                                        topBar: {
                                                            title: {
                                                                text: 'Find Place',
                                                                color: 'white'
                                                            },
                                                            background: {
                                                                color: 'rebeccapurple'
                                                            },
                                                            leftButtons: [{
                                                                id: 'MenuBtnFindPlace',
                                                                icon: icons[2],
                                                                color: 'gold',
                                                            }],
                                                            backButton: {
                                                                color: 'white',
                                                                title: ''
                                                            },
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    stack: {
                                        children: [
                                            {
                                                component: {
                                                    name: 'SharePlace',
                                                    options: {
                                                        bottomTabs: {
                                                            backgroundColor: 'rebeccapurple',
                                                        },
                                                        bottomTab: {
                                                            fontSize: 12,
                                                            text: 'Share Place',
                                                            icon: icons[1],
                                                            iconColor: 'white',
                                                            textColor: 'white',
                                                            selectedIconColor: 'gold',
                                                            selectedTextColor: 'gold'
                                                        },
                                                        topBar: {
                                                            title: {
                                                                text: 'Share Place',
                                                                color: 'white'
                                                            },
                                                            background: {
                                                                color: 'rebeccapurple'
                                                            },
                                                            leftButtons: [{
                                                                id: 'MenuBtnSharePlace',
                                                                icon: icons[2],
                                                                color: 'gold'
                                                            }]
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ],
                        }
                    }
                },
            }
        })
    })
}
