import { faGooglePlay } from '@fortawesome/free-brands-svg-icons'
import {
  faBaseball,
  faBed,
  faBell,
  faBlender,
  faBook,
  faBookOpen,
  faBucket,
  faBurger,
  faBusSimple,
  faCar,
  faCarRear,
  faCartShopping,
  faChampagneGlasses,
  faCheese,
  faChessKnight,
  faChurch,
  faClapperboard,
  faClock,
  faCoins,
  faCompactDisc,
  faComputer,
  faComputerMouse,
  faCouch,
  faCreditCard,
  faCube,
  faDesktop,
  faEgg,
  faEllipsisV,
  faEnvelope,
  faFan,
  faFilm,
  faFlag,
  faFloppyDisk,
  faFootball,
  faGamepad,
  faGasPump,
  faGift,
  faGifts,
  faGuitar,
  faHospital,
  faHotel,
  faHouse,
  faImages,
  faKeyboard,
  faLock,
  faMessage,
  faMobileScreen,
  faMoneyBill,
  faMotorcycle,
  faMusic,
  faNewspaper,
  faParachuteBox,
  faPencil,
  faRadio,
  faReceipt,
  faRoute,
  faSchool,
  faShirt,
  faSimCard,
  faSocks,
  faSquarePhone,
  faStamp,
  faStar,
  faSuitcase,
  faSyringe,
  faTablet,
  faTableTennisPaddleBall,
  faTabletScreenButton,
  faTaxi,
  faTemperatureHigh,
  faThermometer,
  faTicket,
  faTooth,
  faToriiGate,
  faTrain,
  faTree,
  faTruckMoving,
  faTv,
  faUmbrella,
  faVolleyball,
  faVrCardboard,
  faWallet,
  faWifi,
  faYinYang
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
  // {
  //   key: 'personal-finance',
  //   label: 'Personal Finance',
  //   path: '/personal-finance',
  //   icon: 'fa:money'
  // },
  {
    key: 'personal-finance',
    label: 'Personal Finance',
    path: '/',
    icon: 'fa:money'
  },
  {
    key: 'statistics',
    label: 'Statistics',
    path: '/statistics',
    icon: 'fa:bar-chart'
  },
  {
    key: 'groups',
    label: 'Groups',
    path: '/groups',
    icon: 'fa:group'
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
  },
  { name: 'shirt', icon: faShirt },
  { name: 'clock', icon: faClock },
  { name: 'pencil', icon: faPencil },
  { name: 'credit-card', icon: faCreditCard },
  { name: 'newspaper', icon: faNewspaper },
  { name: 'flag', icon: faFlag },
  { name: 'school', icon: faSchool },
  { name: 'desktop', icon: faDesktop },
  { name: 'hotel', icon: faHotel },
  { name: 'wallet', icon: faWallet },
  { name: 'motorcycle', icon: faMotorcycle },
  { name: 'train', icon: faTrain },
  { name: 'hospital', icon: faHospital },
  { name: 'google-play', icon: faGooglePlay },
  { name: 'cube', icon: faCube },
  { name: 'radio', icon: faRadio },
  { name: 'route', icon: faRoute },
  { name: 'church', icon: faChurch },
  { name: 'coins', icon: faCoins },
  { name: 'keyboard', icon: faKeyboard },
  { name: 'receipt', icon: faReceipt },
  { name: 'tablet', icon: faTablet },
  { name: 'images', icon: faImages },
  { name: 'stamp', icon: faStamp },
  { name: 'yin-yang', icon: faYinYang },
  { name: 'vr-cardboard', icon: faVrCardboard },
  { name: 'volleyball-ball', icon: faVolleyball },
  { name: 'umbrella', icon: faUmbrella },
  { name: 'tv', icon: faTv },
  { name: 'tree', icon: faTree },
  { name: 'tooth', icon: faTooth },
  { name: 'ticket', icon: faTicket },
  { name: 'table-tennis-paddle-ball', icon: faTableTennisPaddleBall },
  { name: 'truck-moving', icon: faTruckMoving },
  { name: 'torii-gate', icon: faToriiGate },
  { name: 'thermometer', icon: faThermometer },
  { name: 'temperature-high', icon: faTemperatureHigh },
  { name: 'taxi', icon: faTaxi },
  { name: 'tablet-screen-button', icon: faTabletScreenButton },
  { name: 'syringe', icon: faSyringe },
  { name: 'suitcase', icon: faSuitcase },
  { name: 'square-phone', icon: faSquarePhone },
  { name: 'socks', icon: faSocks },
  { name: 'sim-card', icon: faSimCard },
  { name: 'parachute-box', icon: faParachuteBox },
  { name: 'mobile-screen', icon: faMobileScreen },
  { name: 'message', icon: faMessage },
  { name: 'lock', icon: faLock },
  { name: 'guitar', icon: faGuitar },
  { name: 'gifts', icon: faGifts },
  { name: 'gas-pump', icon: faGasPump },
  { name: 'football', icon: faFootball },
  { name: 'floppy-disk', icon: faFloppyDisk },
  { name: 'fan', icon: faFan },
  { name: 'egg', icon: faEgg },
  { name: 'couch', icon: faCouch },
  { name: 'computer-mouse', icon: faComputerMouse },
  { name: 'computer', icon: faComputer },
  { name: 'compact-disc', icon: faCompactDisc },
  { name: 'clapperboard', icon: faClapperboard },
  { name: 'chess-knight', icon: faChessKnight },
  { name: 'cheese', icon: faCheese },
  { name: 'champaign-glasses', icon: faChampagneGlasses },
  { name: 'car-rear', icon: faCarRear },
  { name: 'bus-simple', icon: faBusSimple },
  { name: 'burger', icon: faBurger },
  { name: 'bucket', icon: faBucket },
  { name: 'book-open', icon: faBookOpen },
  { name: 'bed', icon: faBed },
  { name: 'blender', icon: faBlender },
  { name: 'bell', icon: faBell },
  { name: 'baseball', icon: faBaseball }
]

export const BANK_LIST = [
  {
    name: 'TMCP Công thương Việt Nam',
    shortName: 'VietinBank'
  },
  {
    name: 'TMCP Ngoại Thương Việt Nam',
    shortName: 'Vietcombank'
  },
  {
    name: 'TMCP Đầu tư và Phát triển Việt Nam',
    shortName: 'BIDV'
  },
  {
    name: 'Nông nghiệp và Phát triển Nông thôn Việt Nam',
    shortName: 'Agribank'
  },
  {
    name: 'TMCP Phương Đông',
    shortName: 'OCB'
  },
  {
    name: 'TMCP Quân đội',
    shortName: 'MBBank'
  },
  {
    name: 'TMCP Kỹ thương Việt Nam',
    shortName: 'Techcombank'
  },
  {
    name: 'TMCP Á Châu',
    shortName: 'ACB'
  },
  {
    name: 'TMCP Việt Nam Thịnh Vượng',
    shortName: 'VPBank'
  },
  {
    name: 'TMCP Tiên Phong',
    shortName: 'TPBank'
  },
  {
    name: 'TMCP Sài Gòn Thương Tín',
    shortName: 'Sacombank'
  }
]
