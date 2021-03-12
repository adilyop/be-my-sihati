/**
 * Created by adil on 04/04/17.
 */
dev
"babel": "^6.23.0",
"babel-cli": "^6.24.1",
"babel-core": "6.18.0",
"babel-plugin-add-module-exports": "0.2.1",
"babel-preset-stage-2": "6.18.0",
gulp-babel


npm
"babel-polyfill": "^6.26.0",
"babel-preset-es2015": "^6.24.1",
"babel-regenerator-runtime": "^6.5.0",
"babel-register": "^6.26.0",
"babel-runtime": "^6.26.0",

const timeZones = [

  {
    prettyValue: '(GMT-12:00) International Date Line West',
    value: 'Etc/GMT+12',
    name: 'International Date Line West',
    time: '-12:00',
    gmtAdjustment: 'GMT-12:00',
    useDaylightTime: '0',
    valueNDST: '-12:00',
    valueDST: '-12:00'
  },
  {
    prettyValue: '(GMT-11:00) Midway Island, Samoa',
    value: 'Pacific/Midway',
    name: 'Midway Island, Samoa',
    time: '-11:00',
    gmtAdjustment: 'GMT-11:00',
    useDaylightTime: '0',
    valueNDST: '-11:00',
    valueDST: '-11:00'
  },
  {
    prettyValue: '(GMT-10:00) Hawaii',
    value: 'Pacific/Honolulu',
    name: 'Hawaii',
    time: '-10:00',
    gmtAdjustment: 'GMT-10:00',
    useDaylightTime: '0',
    valueNDST: '-10:00',
    valueDST: '-10:00'
  },
  {
    prettyValue: '(GMT-09:00) Alaska',
    value: 'America/Anchorage',
    name: 'Alaska',
    time: '-09:00',
    gmtAdjustment: 'GMT-09:00',
    useDaylightTime: '1',
    valueNDST: '-09:00',
    valueDST: '-08:00'
  },
  {
    prettyValue: '(GMT-08:00) Pacific Time (US &amp; Canada)',
    value: 'America/Los_Angeles',
    name: 'Pacific Time',
    time: '-08:00',
    gmtAdjustment: 'GMT-08:00',
    useDaylightTime: '0',
    valueNDST: '-08:00',
    valueDST: '-07:00'
  },
  {
    prettyValue: '(GMT-08:00) Tijuana, Baja California',
    value: 'America/Tijuana',
    name: 'Tijuana, Baja California',
    time: '-08:00',
    gmtAdjustment: 'GMT-08:00',
    useDaylightTime: '0',
    valueNDST: '-08:00',
    valueDST: '-08:00'
  },
  {
    prettyValue: '(GMT-07:00) Arizona',
    value: 'America/Phoenix',
    name: 'Arizona',
    time: '-07:00',
    gmtAdjustment: 'GMT-07:00',
    useDaylightTime: '0',
    valueNDST: '-07:00',
    valueDST: '-07:00'
  },
  {
    prettyValue: '(GMT-07:00) Chihuahua, La Paz, Mazatlan',
    value: 'America/Chihuahua',
    name: 'Chihuahua, La Paz, Mazatlan',
    time: '-07:00',
    gmtAdjustment: 'GMT-07:00',
    useDaylightTime: '0',
    valueNDST: '-07:00',
    valueDST: '-07:00'
  },
  {
    prettyValue: '(GMT-07:00) Mountain Time (US &amp; Canada)',
    value: 'America/Denver',
    name: 'Mountain Time',
    time: '-07:00',
    gmtAdjustment: 'GMT-07:00',
    useDaylightTime: '1',
    valueNDST: '-07:00',
    valueDST: '-06:00'
  },
  {
    prettyValue: '(GMT-06:00) Central America',
    value: 'America/Chicago',
    name: 'Central America',
    time: '-06:00',
    gmtAdjustment: 'GMT-06:00',
    useDaylightTime: '1',
    valueNDST: '-06:00',
    valueDST: '-05:00'
  },
  {
    prettyValue: '(GMT-06:00) Central Time (US &amp; Canada)',
    value: 'America/Chicago',
    name: 'Central Time',
    time: '-06:00',
    gmtAdjustment: 'GMT-06:00',
    useDaylightTime: '1',
    valueNDST: '-06:00',
    valueDST: '-05:00'
  },
  {
    prettyValue: '(GMT-06:00) Guadalajara, Mexico City, Monterrey',
    value: 'America/Monterrey',
    name: 'Guadalajara, Mexico City, Monterrey',
    time: '-06:00',
    gmtAdjustment: 'GMT-06:00',
    useDaylightTime: '0',
    valueNDST: '-06:00',
    valueDST: '-06:00'
  },
  {
    prettyValue: '(GMT-06:00) Saskatchewan',
    value: 'Canada/Saskatchewan',
    name: 'Saskatchewan',
    time: '-06:00',
    gmtAdjustment: 'GMT-06:00',
    useDaylightTime: '0',
    valueNDST: '-06:00',
    valueDST: '-06:00'
  },
  {
    prettyValue: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco',
    value: 'America/Lima',
    name: 'Bogota, Lima, Quito, Rio Branco',
    time: '-05:00',
    gmtAdjustment: 'GMT-05:00',
    useDaylightTime: '0',
    valueNDST: '-05:00',
    valueDST: '-05:00'
  },
  {
    prettyValue: '(GMT-05:00) Eastern Time (US &amp; Canada)',
    value: 'America/New_York',
    name: 'Eastern Time',
    time: '-05:00',
    gmtAdjustment: 'GMT-05:00',
    useDaylightTime: '1',
    valueNDST: '-05:00',
    valueDST: '-04:00'
  },
  {
    prettyValue: '(GMT-05:00) Indiana (East)',
    value: 'America/New_York',
    name: 'Indiana',
    time: '-05:00',
    gmtAdjustment: 'GMT-05:00',
    useDaylightTime: '1',
    valueNDST: '-05:00',
    valueDST: '-04:00'
  },
  {
    prettyValue: '(GMT-04:00) Atlantic Time (Canada)',
    value: 'America/Glace_Bay',
    name: 'Atlantic Time',
    time: '-04:00',
    gmtAdjustment: 'GMT-04:00',
    useDaylightTime: '1',
    valueNDST: '-04:00',
    valueDST: '-03:00'
  },
  {
    prettyValue: '(GMT-04:00) Caracas, La Paz',
    value: 'America/Caracas',
    name: 'Caracas, La Paz',
    time: '-04:00',
    gmtAdjustment: 'GMT-04:00',
    useDaylightTime: '0',
    valueNDST: '-04:00',
    valueDST: '-04:00'
  },
  {
    prettyValue: '(GMT-04:00) Manaus',
    value: 'America/Manaus',
    name: 'Manaus',
    time: '-04:00',
    gmtAdjustment: 'GMT-04:00',
    useDaylightTime: '0',
    valueNDST: '-04:00',
    valueDST: '-04:00'
  },
  {
    prettyValue: '(GMT-04:00) Santiago',
    value: 'America/Santiago ',
    name: 'Santiago',
    time: '-04:00',
    gmtAdjustment: 'GMT-04:00',
    useDaylightTime: '0',
    valueNDST: '-04:00',
    valueDST: '-04:00'
  },
  {
    prettyValue: '(GMT-03:30) Newfoundland',
    value: 'America/St_Johns',
    name: 'Newfoundland',
    time: '-03:30',
    gmtAdjustment: 'GMT-03:30',
    useDaylightTime: '0',
    valueNDST: '-03:30',
    valueDST: '-03:30'
  },
  {
    prettyValue: '(GMT-03:00) Brasilia',
    value: 'America/Sao_Paulo',
    name: 'Brasilia',
    time: '-03:00',
    gmtAdjustment: 'GMT-03:00',
    useDaylightTime: '0',
    valueNDST: '-03:00',
    valueDST: '-03:00'
  },
  {
    prettyValue: '(GMT-03:00) Buenos Aires, Georgetown',
    value: 'America/Argentina/Buenos_Aires',
    name: 'Buenos Aires, Georgetown',
    time: '-03:00',
    gmtAdjustment: 'GMT-03:00',
    useDaylightTime: '0',
    valueNDST: '-03:00',
    valueDST: '-03:00'
  },
  {
    prettyValue: '(GMT-03:00) Greenland',
    value: 'America/Godthab',
    name: 'Greenland',
    time: '-03:00',
    gmtAdjustment: 'GMT-03:00',
    useDaylightTime: '0',
    valueNDST: '-03:00',
    valueDST: '-03:00'
  },
  {
    prettyValue: '(GMT-03:00) Montevideo',
    value: 'America/Montevideo',
    name: 'Montevideo',
    time: '-03:00',
    gmtAdjustment: 'GMT-03:00',
    useDaylightTime: '0',
    valueNDST: '-03:00',
    valueDST: '-03:00'
  },
  {
    prettyValue: '(GMT-02:00) Mid-Atlantic',
    value: 'America/Noronha',
    name: 'Mid-Atlantic',
    time: '-02:00',
    gmtAdjustment: 'GMT-02:00',
    useDaylightTime: '0',
    valueNDST: '-02:00',
    valueDST: '-02:00'
  },
  {
    prettyValue: '(GMT-01:00) Cape Verde Is.',
    value: 'Atlantic/Cape_Verde',
    name: 'Cape Verde Is.',
    time: '-01:00',
    gmtAdjustment: 'GMT-01:00',
    useDaylightTime: '0',
    valueNDST: '-01:00',
    valueDST: '-01:00'
  },
  {
    prettyValue: '(GMT-01:00) Azores',
    value: 'Atlantic/Azores',
    name: 'Azores',
    time: '-01:00',
    gmtAdjustment: 'GMT-01:00',
    useDaylightTime: '0',
    valueNDST: '-01:00',
    valueDST: '-01:00'
  },
  {
    prettyValue: '(GMT+00:00) Casablanca, Monrovia, Reykjavik',
    value: 'Africa/Casablanca',
    name: 'Casablanca, Monrovia, Reykjavik',
    time: '+00:00',
    gmtAdjustment: 'GMT+00:00',
    useDaylightTime: '1',
    valueNDST: '+00:00',
    valueDST: '+01:00'
  },
  {
    prettyValue: '(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London',
    value: 'Europe/London',
    name: 'Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London',
    time: '+00:00',
    gmtAdjustment: 'GMT+00:00',
    useDaylightTime: '1',
    valueNDST: '+00:00',
    valueDST: '+01:00'
  },
  {
    prettyValue: '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
    value: 'Europe/Rome',
    name: 'Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
    time: '+01:00',
    gmtAdjustment: 'GMT+01:00',
    useDaylightTime: '0',
    valueNDST: '+01:00',
    valueDST: '+01:00'
  },
  {
    prettyValue: '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
    value: 'Europe/Belgrade',
    name: 'Belgrade, Bratislava, Budapest, Ljubljana, Prague',
    time: '+01:00',
    gmtAdjustment: 'GMT+01:00',
    useDaylightTime: '0',
    valueNDST: '+01:00',
    valueDST: '+01:00'
  },
  {
    prettyValue: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris',
    value: 'Europe/Madrid',
    name: 'Brussels, Copenhagen, Madrid, Paris',
    time: '+01:00',
    gmtAdjustment: 'GMT+01:00',
    useDaylightTime: '0',
    valueNDST: '+01:00',
    valueDST: '+01:00'
  },
  {
    prettyValue: '(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb',
    value: 'Europe/Belgrade',
    name: 'Sarajevo, Skopje, Warsaw, Zagreb',
    time: '+01:00',
    gmtAdjustment: 'GMT+01:00',
    useDaylightTime: '0',
    valueNDST: '+01:00',
    valueDST: '+01:00'
  },
  {
    prettyValue: '(GMT+01:00) West Central Africa',
    value: 'Africa/Lagos',
    name: 'West Central Africa',
    time: '+01:00',
    gmtAdjustment: 'GMT+01:00',
    useDaylightTime: '0',
    valueNDST: '+01:00',
    valueDST: '+01:00'
  },
  {
    prettyValue: '(GMT+02:00) Amman',
    value: 'Asia/Amman',
    name: 'Amman',
    time: '+02:00',
    gmtAdjustment: 'GMT+02:00',
    useDaylightTime: '0',
    valueNDST: '+02:00',
    valueDST: '+02:00'
  },
  {
    prettyValue: '(GMT+02:00) Athens, Bucharest, Istanbul',
    value: 'Europe/Athens',
    name: 'Athens, Bucharest, Istanbul',
    time: '+02:00',
    gmtAdjustment: 'GMT+02:00',
    useDaylightTime: '0',
    valueNDST: '+02:00',
    valueDST: '+02:00'
  },
  {
    prettyValue: '(GMT+02:00) Beirut',
    value: 'Asia/Beirut',
    name: 'Beirut',
    time: '+02:00',
    gmtAdjustment: 'GMT+02:00',
    useDaylightTime: '0',
    valueNDST: '+02:00',
    valueDST: '+02:00'
  },
  {
    prettyValue: '(GMT+02:00) Cairo',
    value: 'Africa/Cairo',
    name: 'Cairo',
    time: '+02:00',
    gmtAdjustment: 'GMT+02:00',
    useDaylightTime: '0',
    valueNDST: '+02:00',
    valueDST: '+02:00'
  },
  {
    prettyValue: '(GMT+02:00) Harare, Pretoria',
    value: 'Africa/Harare',
    name: 'Harare, Pretoria',
    time: '+02:00',
    gmtAdjustment: 'GMT+02:00',
    useDaylightTime: '0',
    valueNDST: '+02:00',
    valueDST: '+02:00'
  },
  {
    prettyValue: '(GMT+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius',
    value: 'Europe/Helsinki',
    name: 'Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
    time: '+02:00',
    gmtAdjustment: 'GMT+02:00',
    useDaylightTime: '0',
    valueNDST: '+02:00',
    valueDST: '+02:00'
  },
  {
    prettyValue: '(GMT+02:00) Jerusalem',
    value: 'Asia/Jerusalem',
    name: 'Jerusalem',
    time: '+02:00',
    gmtAdjustment: 'GMT+02:00',
    useDaylightTime: '0',
    valueNDST: '+02:00',
    valueDST: '+02:00'
  },
  {
    prettyValue: '(GMT+02:00) Minsk',
    value: 'Europe/Minsk',
    name: 'Minsk',
    time: '+02:00',
    gmtAdjustment: 'GMT+02:00',
    useDaylightTime: '0',
    valueNDST: '+02:00',
    valueDST: '+02:00'
  },
  {
    prettyValue: '(GMT+02:00) Windhoek',
    value: 'Africa/Windhoek',
    name: 'Windhoek',
    time: '+02:00',
    gmtAdjustment: 'GMT+02:00',
    useDaylightTime: '0',
    valueNDST: '+02:00',
    valueDST: '+02:00'
  },
  {
    prettyValue: '(GMT+03:00) Kuwait, Riyadh, Baghdad',
    value: 'Asia/Kuwait',
    name: 'Kuwait, Riyadh, Baghdad',
    time: '+03:00',
    gmtAdjustment: 'GMT+03:00',
    useDaylightTime: '0',
    valueNDST: '+03:00',
    valueDST: '+03:00'
  },
  {
    prettyValue: '(GMT+03:00) Moscow, St. Petersburg, Volgograd',
    value: 'Europe/Moscow',
    name: 'Moscow, St. Petersburg, Volgograd',
    time: '+03:00',
    gmtAdjustment: 'GMT+03:00',
    useDaylightTime: '0',
    valueNDST: '+03:00',
    valueDST: '+03:00'
  },
  {
    prettyValue: '(GMT+03:00) Nairobi',
    value: 'Africa/Nairobi',
    name: 'Nairobi',
    time: '+03:00',
    gmtAdjustment: 'GMT+03:00',
    useDaylightTime: '0',
    valueNDST: '+03:00',
    valueDST: '+03:00'
  },
  {
    prettyValue: '(GMT+03:00) Tbilisi',
    value: 'Asia/Tbilisi',
    name: 'Tbilisi',
    time: '+03:00',
    gmtAdjustment: 'GMT+03:00',
    useDaylightTime: '0',
    valueNDST: '+03:00',
    valueDST: '+03:00'
  },
  {
    prettyValue: '(GMT+03:30) Tehran',
    value: 'Asia/Tehran',
    name: 'Tehran',
    time: '+03:00',
    gmtAdjustment: 'GMT+03:00',
    useDaylightTime: '0',
    valueNDST: '+03:00',
    valueDST: '+03:00'
  },
  {
    prettyValue: '(GMT+04:00) Abu Dhabi, Muscat',
    value: 'Asia/Muscat',
    name: 'Abu Dhabi, Muscat',
    time: '+04:00',
    gmtAdjustment: 'GMT+04:00',
    useDaylightTime: '0',
    valueNDST: '+04:00',
    valueDST: '+04:00'
  },
  {
    prettyValue: '(GMT+04:00) Baku',
    value: 'Asia/Baku',
    name: 'Baku',
    time: '+04:00',
    gmtAdjustment: 'GMT+04:00',
    useDaylightTime: '0',
    valueNDST: '+04:00',
    valueDST: '+04:00'
  },
  {
    prettyValue: '(GMT+04:00) Yerevan',
    value: 'Asia/Yerevan',
    name: 'Yerevan',
    time: '+04:00',
    gmtAdjustment: 'GMT+04:00',
    useDaylightTime: '0',
    valueNDST: '+04:00',
    valueDST: '+04:00'
  },
  {
    prettyValue: '(GMT+04:30) Kabul',
    value: 'Asia/Kabul',
    name: 'Kabul',
    time: '+04:30',
    gmtAdjustment: 'GMT+04:30',
    useDaylightTime: '0',
    valueNDST: '+04:30',
    valueDST: '+04:30'
  },
  {
    prettyValue: '(GMT+05:00) Yekaterinburg',
    value: 'Asia/Yekaterinburg',
    name: 'Yekaterinburg',
    time: '+05:00',
    gmtAdjustment: '+05:00',
    useDaylightTime: '0',
    valueNDST: '+05:00',
    valueDST: '+05:00'
  },
  {
    prettyValue: '(GMT+05:00) Islamabad, Karachi, Tashkent',
    value: 'Asia/Tashkent',
    name: 'Islamabad, Karachi, Tashkent',
    time: '+05:00',
    gmtAdjustment: '+05:00',
    useDaylightTime: '0',
    valueNDST: '+05:00',
    valueDST: '+05:00'
  },
  {
    prettyValue: '(GMT+05:30) Sri Jayawardenapura',
    value: 'Asia/Colombo',
    name: 'Sri Jayawardenapura',
    time: '+05:30',
    gmtAdjustment: '+05:30',
    useDaylightTime: '0',
    valueNDST: '+05:30',
    valueDST: '+05:30'
  },
  {
    prettyValue: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    value: 'Asia/Kolkata',
    name: 'Chennai, Kolkata, Mumbai, New Delhi',
    time: '+05:30',
    gmtAdjustment: '+05:30',
    useDaylightTime: '0',
    valueNDST: '+05:30',
    valueDST: '+05:30'
  },
  {
    prettyValue: '(GMT+05:45) Kathmandu',
    value: 'Asia/Kathmandu',
    name: 'Kathmandu',
    time: '+05:45',
    gmtAdjustment: '+05:45',
    useDaylightTime: '0',
    valueNDST: '+05:45',
    valueDST: '+05:45'
  },
  {
    prettyValue: '(GMT+06:00) Almaty, Novosibirsk',
    value: 'Asia/Almaty',
    name: 'Almaty, Novosibirsk',
    time: '+06:00',
    gmtAdjustment: '+06:00',
    useDaylightTime: '0',
    valueNDST: '+06:00',
    valueDST: '+06:00'
  },
  {
    prettyValue: '(GMT+06:00) Astana, Dhaka',
    value: 'Asia/Dhaka',
    name: 'Astana, Dhaka',
    time: '+06:00',
    gmtAdjustment: '+06:00',
    useDaylightTime: '0',
    valueNDST: '+06:00',
    valueDST: '+06:00'
  },
  {
    prettyValue: '(GMT+06:30) Yangon (Rangoon)',
    value: 'Asia/Rangoon',
    name: 'Yangon (Rangoon)',
    time: '+06:30',
    gmtAdjustment: '+06:30',
    useDaylightTime: '0',
    valueNDST: '+06:30',
    valueDST: '+06:30'
  },
  {
    prettyValue: '(GMT+07:00) Bangkok, Hanoi, Jakarta',
    value: 'Asia/Bangkok',
    name: 'Bangkok, Hanoi, Jakarta',
    time: '+07:00',
    gmtAdjustment: '+07:00',
    useDaylightTime: '0',
    valueNDST: '+07:00',
    valueDST: '+07:00'
  },
  {
    prettyValue: '(GMT+07:00) Krasnoyarsk',
    value: 'Asia/Krasnoyarsk',
    name: 'Krasnoyarsk',
    time: '+07:00',
    gmtAdjustment: '+07:00',
    useDaylightTime: '0',
    valueNDST: '+07:00',
    valueDST: '+07:00'
  },
  {
    prettyValue: '(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
    value: 'Asia/Shanghai    ',
    name: 'Beijing, Chongqing, Hong Kong, Urumqi',
    time: '+08:00',
    gmtAdjustment: '+08:00',
    useDaylightTime: '0',
    valueNDST: '+08:00',
    valueDST: '+08:00'
  },
  {
    prettyValue: '(GMT+08:00) Kuala Lumpur, Singapore',
    value: 'Asia/Kuala_Lumpur',
    name: 'Kuala Lumpur, Singapore',
    time: '+08:00',
    gmtAdjustment: '+08:00',
    useDaylightTime: '0',
    valueNDST: '+08:00',
    valueDST: '+08:00'
  },
  {
    prettyValue: '(GMT+08:00) Irkutsk, Ulaan Bataar',
    value: 'Asia/Irkutsk',
    name: 'Irkutsk, Ulaan Bataar',
    time: '+08:00',
    gmtAdjustment: '+08:00',
    useDaylightTime: '0',
    valueNDST: '+08:00',
    valueDST: '+08:00'
  },
  {
    prettyValue: '(GMT+08:00) Perth',
    value: 'Australia/Perth',
    name: 'Perth',
    time: '+08:00',
    gmtAdjustment: '+08:00',
    useDaylightTime: '0',
    valueNDST: '+08:00',
    valueDST: '+08:00'
  },
  {
    prettyValue: '(GMT+08:00) Taipei',
    value: 'Asia/Taipei',
    name: 'Taipei',
    time: '+08:00',
    gmtAdjustment: '+08:00',
    useDaylightTime: '0',
    valueNDST: '+08:00',
    valueDST: '+08:00'
  },
  {
    prettyValue: '(GMT+09:00) Osaka, Sapporo, Tokyo',
    value: 'Asia/Tokyo',
    name: 'Osaka, Sapporo, Tokyo',
    time: '+09:00',
    gmtAdjustment: '+09:00',
    useDaylightTime: '0',
    valueNDST: '+09:00',
    valueDST: '+09:00'
  },
  {
    prettyValue: '(GMT+09:00) Seoul',
    value: 'Asia/Seoul',
    name: 'Seoul',
    time: '+09:00',
    gmtAdjustment: '+09:00',
    useDaylightTime: '0',
    valueNDST: '+09:00',
    valueDST: '+09:00'
  },
  {
    prettyValue: '(GMT+09:00) Yakutsk',
    value: 'Asia/Yakutsk',
    name: 'Yakutsk',
    time: '+09:00',
    gmtAdjustment: '+09:00',
    useDaylightTime: '0',
    valueNDST: '+09:00',
    valueDST: '+09:00'
  },
  {
    prettyValue: '(GMT+09:30) Adelaide',
    value: 'Australia/Adelaide',
    name: 'Adelaide',
    time: '+09:30',
    gmtAdjustment: '+09:30',
    useDaylightTime: '0',
    valueNDST: '+09:30',
    valueDST: '+09:30'
  },
  {
    prettyValue: '(GMT+09:30) Darwin',
    value: 'Australia/Darwin',
    name: 'Darwin',
    time: '+09:30',
    gmtAdjustment: '+09:30',
    useDaylightTime: '0',
    valueNDST: '+09:30',
    valueDST: '+09:30'
  },
  {
    prettyValue: '(GMT+10:00) Brisbane',
    value: 'Australia/Brisbane',
    name: 'Brisbane',
    time: '+10:00',
    gmtAdjustment: '+10:00',
    useDaylightTime: '0',
    valueNDST: '+10:00',
    valueDST: '+10:00'
  },
  {
    prettyValue: '(GMT+10:00) Canberra, Melbourne, Sydney',
    value: 'Australia/Sydney',
    name: 'Canberra, Melbourne, Sydney',
    time: '+10:00',
    gmtAdjustment: '+10:00',
    useDaylightTime: '1',
    valueNDST: '+10:00',
    valueDST: '+11:00'
  },
  {
    prettyValue: '(GMT+10:00) Hobart',
    value: 'Australia/Hobart',
    name: 'Hobart',
    time: '+10:00',
    gmtAdjustment: '+10:00',
    useDaylightTime: '0',
    valueNDST: '+10:00',
    valueDST: '+10:00'
  },
  {
    prettyValue: '(GMT+10:00) Guam, Port Moresby',
    value: 'Pacific/Guam',
    name: 'Guam, Port Moresby',
    time: '+10:00',
    gmtAdjustment: '+10:00',
    useDaylightTime: '0',
    valueNDST: '+10:00',
    valueDST: '+10:00'
  },
  {
    prettyValue: '(GMT+10:00) Vladivostok',
    value: 'Asia/Vladivostok',
    name: 'Vladivostok',
    time: '+10:00',
    gmtAdjustment: '+10:00',
    useDaylightTime: '0',
    valueNDST: '+10:00',
    valueDST: '+10:00'
  },
  {
    prettyValue: '(GMT+11:00) Magadan, Solomon Is., New Caledonia',
    value: 'Asia/Magadan',
    name: 'Magadan, Solomon Is., New Caledonia',
    time: '+11:00',
    gmtAdjustment: '+11:00',
    useDaylightTime: '0',
    valueNDST: '+11:00',
    valueDST: '+11:00'
  },
  {
    prettyValue: '(GMT+12:00) Auckland, Wellington',
    value: 'Pacific/Auckland',
    name: 'Auckland, Wellington',
    time: '+12:00',
    gmtAdjustment: '+12:00',
    useDaylightTime: '1',
    valueNDST: '12:00',
    valueDST: '13:00'
  },
  {
    prettyValue: '(GMT+12:00) Fiji, Kamchatka, Marshall Is.',
    value: 'Pacific/Fiji',
    name: 'Fiji, Kamchatka, Marshall Is.',
    time: '+12:00',
    gmtAdjustment: '+12:00',
    useDaylightTime: '0',
    valueNDST: '+12:00',
    valueDST: '+12:00'
  },
  {
    prettyValue: "(GMT+13:00) Nuku'alofa",
    value: 'Pacific/Tongatapu',
    name: "Nuku'alofa",
    time: '+13:00',
    gmtAdjustment: '+13:00',
    useDaylightTime: '0',
    valueNDST: '+13:00',
    valueDST: '+13:00'
  }
];

module.exports = timeZones;
