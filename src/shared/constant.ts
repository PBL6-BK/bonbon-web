import {
  faBook,
  faCar,
  faCartShopping,
  faEllipsisV,
  faEnvelope,
  faFilm,
  faGamepad,
  faGift,
  faHouse,
  faMoneyBill,
  faMusic,
  faStar,
  faWifi
} from '@fortawesome/free-solid-svg-icons'

export const SECONDS_IN_DAY = 86400

export type UserOptions = {
  title: string
  icon: string
}

export const USER_DROPDOWN_OPTIONS: UserOptions[] = [
  {
    title: 'Settings',
    icon: 'fa:cog'
  },
  {
    title: 'Logout',
    icon: 'fa:sign-out'
  }
]

export type sidebarContent = {
  key: string
  label: string
  path: string
  icon: string
}

export const SIDEBAR_OPTIONS = [
  {
    key: 'personal-finance',
    label: 'Personal Finance',
    path: '/personal-finance',
    icon: 'fa:money'
  },
  {
    key: 'groups',
    label: 'Groups',
    path: '/groups',
    icon: 'fa:group'
  },
  {
    key: 'statistics',
    label: 'Statistics',
    path: '/statistics',
    icon: 'fa:bar-chart'
  }
]

export const CATEGORY_NAME = [
  'Credit Card Payment',
  'Paycheck',
  'Alcohol & Bars',
  'Auto Insurance',
  'Coffee Shops',
  'Electronics & Software',
  'Entertainment',
  'Fast Food',
  'Food & Dining',
  'Gas & Fuel',
  'Groceries',
  'Haircut',
  'Home Improvement',
  'Internet',
  'Mobile Phone',
  'Mortgage & Rent',
  'Movies & DVDs',
  'Music',
  'Restaurants',
  'Shopping',
  'Television',
  'Utilities'
]

export const CategoryIcon = [
  {
    name: 'house',
    icon: faHouse
  },
  {
    name: 'star',
    icon: faStar
  },
  {
    name: 'music',
    icon: faMusic
  },
  {
    name: 'envelope',
    icon: faEnvelope
  },
  {
    name: 'cart-shopping',
    icon: faCartShopping
  },
  {
    name: 'car',
    icon: faCar
  },
  {
    name: 'gift',
    icon: faGift
  },
  {
    name: 'film',
    icon: faFilm
  },
  {
    name: 'book',
    icon: faBook
  },
  {
    name: 'money-bill',
    icon: faMoneyBill
  },
  {
    name: 'wifi',
    icon: faWifi
  },
  {
    name: 'gamepad',
    icon: faGamepad
  }
]
// 'shirt': FontAwesomeIcons.shirt,
// 'clock': FontAwesomeIcons.clock,
// 'pencil': FontAwesomeIcons.pencil,
// 'credit-card': FontAwesomeIcons.creditCard,
// newspaper: FontAwesomeIcons.newspaper,
// flag: FontAwesomeIcons.flag,
// school: FontAwesomeIcons.school,
// desktop: FontAwesomeIcons.desktop,
// hotel: FontAwesomeIcons.hotel,
// wallet: FontAwesomeIcons.wallet,
// motorcycle: FontAwesomeIcons.motorcycle,
// train: FontAwesomeIcons.train,
// hospital: FontAwesomeIcons.hospital,
// 'google-play': FontAwesomeIcons.googlePlay,
// cube: FontAwesomeIcons.cube,
// radio: FontAwesomeIcons.radio,
// route: FontAwesomeIcons.route,
// church: FontAwesomeIcons.church,
// coins: FontAwesomeIcons.coins,
// keyboard: FontAwesomeIcons.keyboard,
// receipt: FontAwesomeIcons.receipt,
// tablet: FontAwesomeIcons.tablet,
// images: FontAwesomeIcons.images,
// stamp: FontAwesomeIcons.stamp,
// 'yin-yang': FontAwesomeIcons.yinYang,
// 'vr-cardboard': FontAwesomeIcons.vrCardboard,
// 'volleyball-ball': FontAwesomeIcons.volleyball,
// umbrella: FontAwesomeIcons.umbrella,
// tv: FontAwesomeIcons.tv,
// tree: FontAwesomeIcons.tree,
// tooth: FontAwesomeIcons.tooth,
// ticket: FontAwesomeIcons.ticket,
// 'table-tennis-paddle-ball': FontAwesomeIcons.tableTennisPaddleBall,
// 'truck-moving': FontAwesomeIcons.truckMoving,
// 'torii-gate': FontAwesomeIcons.toriiGate,
// thermometer: FontAwesomeIcons.thermometer,
// 'temperature-high': FontAwesomeIcons.temperatureHigh,
// taxi: FontAwesomeIcons.taxi,
// 'tablet-screen-button': FontAwesomeIcons.tabletScreenButton,
// syringe: FontAwesomeIcons.syringe,
// suitcase: FontAwesomeIcons.suitcase,
// 'square-phone': FontAwesomeIcons.squarePhone,
// socks: FontAwesomeIcons.socks,
// 'sim-card': FontAwesomeIcons.simCard,
// 'parachute-box': FontAwesomeIcons.parachuteBox,
// 'mobile-screen': FontAwesomeIcons.mobileScreen,
// message: FontAwesomeIcons.message,
// lock: FontAwesomeIcons.lock,
// guitar: FontAwesomeIcons.guitar,
// gifts: FontAwesomeIcons.gifts,
// 'gas-pump': FontAwesomeIcons.gasPump,
// football: FontAwesomeIcons.football,
// 'floppy-disk': FontAwesomeIcons.floppyDisk,
// fan: FontAwesomeIcons.fan,
// egg: FontAwesomeIcons.egg,
// couch: FontAwesomeIcons.couch,
// 'computer-mouse': FontAwesomeIcons.computerMouse,
// computer: FontAwesomeIcons.computer,
// 'compact-disc': FontAwesomeIcons.compactDisc,
// clapperboard: FontAwesomeIcons.clapperboard,
// 'chess-knight': FontAwesomeIcons.chessKnight,
// cheese: FontAwesomeIcons.cheese,
// 'champaign-glasses': FontAwesomeIcons.champagneGlasses,
// 'car-rear': FontAwesomeIcons.carRear,
// 'bus-simple': FontAwesomeIcons.busSimple,
// burger: FontAwesomeIcons.burger,
// bucket: FontAwesomeIcons.bucket,
// 'book-open': FontAwesomeIcons.bookOpen,
// bed: FontAwesomeIcons.bed,
// blender: FontAwesomeIcons.blender,
// bell: FontAwesomeIcons.bell,
// baseball: FontAwesomeIcons.baseball
