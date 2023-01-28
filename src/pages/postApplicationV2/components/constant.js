export const formStateInit = {
  // type for long application will be 0 and for quick will be 1
  // 1 from short application for inhouse
  // 2 from short application for dealers
  application_type: 1,
  vehicle_type: "",
  // subVehicalType can be null also
  // dealer: 2963, JSON.parse(localStorage.getItem('user')).id

  sub_vehicle_type: "",
  monthly_budget: "",
  trade_in: '',
  looking_for_private_seller: '',
  employement_status: '',
  //  monthly income can be a range as well
  monthly_income: '',
  employer_name: "",
  business_name:"",
  employment_designation: "",
  street_address: "",
  city: "",
  province: "",
  postal_code: "",
  country: "Canada",
  // address yr can be in range
  // -1 , 1-3 , 3-5 , 5+
  duration_address_yr: "",
  duration_address_mn: "0",
  month: "",
  day: "",
  year: "",
  dob: null,
  first_name: "",
  last_name: "",
  valid_driver_license: '',
  telephone: "",
  applicant_email: "",
  gross_income:"",
  down_payment:"",
  occupation:"",
  // values that is required on backend
  vehicle: [{
    type_of_vehicle:"",
    type_of_vehicle_name:"",
    sub_type_of_vehicle:"",
    sub_type_of_vehicle_name:"",
    year:"",
    make:"",
    model:"",
    vin: "",
    price:0,
    condition:"",
    trim:"",
    kilometer:"",
    stock_id: "",
    trade_in:"",
    client_budget:"",
    }],  additional_item: [],
  seller: {},
  co_applicant: {},
  required_documents: [],
  ...( JSON.parse(localStorage.getItem('user'))?.id && {dealer:  JSON.parse(localStorage.getItem('user')).id})
};

export const vehicalTypesData = [
  { id: 7, img: "/assets/image/postAppCar.svg", name: "Automotive" },
  { id: 6, img: "/assets/image/postAppRV.svg", name: "RV" },
  { id: 9, img: "/assets/image/postAppPowerSport.svg", name: "Powersport" },
  { id: 1, img: "/assets/image/postAppTrailer.svg", name: "Trailer" },
  { id:3, img: "/assets/image/postAppMarine.svg", name: "Marine" },
  {
    id:8,
    img: "/assets/image/postAppTractor.svg",
    name: "Lawn Tractor",
  },
  {
    img: "/assets/image/construction.svg",
    name: "Construction",
    id:19
  },
];

export const vehicalSubTypes = [
  {
    name: "Automotive",
    options: [
      {
        img: "/assets/image/postAppCar.svg",
        name: "Cars",
        id:4,
      },
      {
        img: "/assets/image/postAppTruck.svg",
        name: "Truck",
        height:'60px',
        id:5,
      },
      {
        img: "/assets/image/postAppSUV.png",
        name: "SUV",
        height:'60px',
        id:6,
      },

      {
        img: "/assets/image/postAppVan.png",
        name: "Van",
        height:'63px',
        id:7,
      },
    ],
  },
  {
    name: "Powersport",
    options: [
      {
        img: "/assets/image/postAppMotorcycle.png",
        name: "Motorcycle",
        height:"60px",
        margin:"15px",
        id:12,
      },

      {
        img: "/assets/image/pngfind 3.png",
        name: "ATV/UTV",
        height:"60px",
        id:3,
      },
      {
        img: "/assets/image/pngfind 6.png",
        name: "Dirt Bike",
        height:"60px",
        id:13
            },
      {
        img: "/assets/image/postAppSnowmobile.png",
        name: "Snowmobile",
        height:"60px",
        margin:"40px",
        id:1,
      },
      { img: "/assets/image/e-scooter.png",
      name: "E-Scooter",
      height:"60px",
      margin:"27px",
      id:10
      }
    ],
  },
  {
    name: "Marine",
    options: [
      {
        img: "/assets/image/postAppWatercraft.svg",
        name: "Personal Watercraft",
        id:10,
      },
      {
        img: "/assets/image/postAppBoat.svg",
        name: "Boat",
        id:11,
      },
    ],
  },
  {
    name: "RV",
    options: [
      {
        img: "/assets/image/postAppMotorHome.svg",
        name: "Motor Home",
        id:8,
      },
      {
        img: "/assets/image/postAppTravelTrailer.svg",
        name: "Travel Trailer",
        id:9,
      },
    ],
  },
  {
    name: "Construction",
    options: [
      {
        img: "/assets/image/skidSteer.svg",
        name: "Skid Steer",
        id:15
      },
      {
        img: "/assets/image/backHoe.png",
        name: "Backhoe",
        id:16
      },
      {
        img: "/assets/image/miniExcavator.svg",
        name: "Mini Excavator",
        id:17
      },
      {
        img: "/assets/image/loader.png",
        name: "Loader",
        height:"55px",
        id:18
      },
      {
        img: "/assets/image/farmTractor.svg",
        name: "Farm Tractor",
        id:19
      },
      {
        img: "/assets/image/smallConstruction.svg",
        name: "Small Construction",
        id:20
      },
    ],
  },
];

export const monthlyBudgetOptions = [
  { label: "Under $250/month", value: "250" },
  { label: "$250 - 350/month", value: "250-350" },
  { label: "$350 - 500/month", value: "350-500" },
  { label: "Over $500/month", value: "500+" },
];
export const booleanOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];
export const employmentStatusOptions = [
  { label: "Employed", value: "Employed" },
  { label: "Self-Employed", value: "Self-Employed" },
  { label: "Unemployed", value: "Unemployed" },
  { label: "Retired", value: "Retired" },
  { label: "Disability", value: "Disability" },
  { label: "Worker Compensation", value: "Worker Compensation" },
];
export const monthlyIncomeOptions = [
  { label: "Over $5000", value: "5000" },
  { label: "$2500 - 5000", value: "2500-5000" },
  { label: "$2000 - 2500", value: "2000-2500" },
  { label: "Under $2000", value: "2000" },
];
export const provincesOptions = [
  { value: "AB", label: "Alberta" },
  { value: "BC", label: "British Columbia" },
  { value: "MB", label: "Manitoba" },
  { value: "NB", label: "New Brunswick" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "NS", label: "Nova Scotia" },
  { value: "ON", label: "Ontario" },
  { value: "PE", label: "Prince Edward Island" },
  { value: "QC", label: "Quebec" },
  { value: "SK", label: "Saskatchewan" },
  { value: "NT", label: "Northwest Territories" },
  { value: "NU", label: "Nunavut" },
  { value: "YT", label: "Yukon" },
];

export const durationLivedOptions = [
  { label: "Less than 1 year", value: "-1" },
  { label: "1 - 3 years", value: "1-3" },
  { label: "3 - 5 years", value: "3-5" },
  { label: "5 or more years", value: "5+" },
];

export const monthOptions = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
export const dayOptions = [
  { value: "01", label: "1" },
  { value: "02", label: "2" },
  { value: "03", label: "3" },
  { value: "04", label: "4" },
  { value: "05", label: "5" },
  { value: "06", label: "6" },
  { value: "07", label: "7" },
  { value: "08", label: "8" },
  { value: "09", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
];
export const yearOptions = [
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
  { value: "2014", label: "2014" },
  { value: "2013", label: "2013" },
  { value: "2012", label: "2012" },
  { value: "2011", label: "2011" },
  { value: "2010", label: "2010" },
  { value: "2009", label: "2009" },
  { value: "2008", label: "2008" },
  { value: "2007", label: "2007" },
  { value: "2006", label: "2006" },
  { value: "2005", label: "2005" },
  { value: "2004", label: "2004" },
  { value: "2003", label: "2003" },
  { value: "2002", label: "2002" },
  { value: "2001", label: "2001" },
  { value: "2000", label: "2000" },
  { value: "1999", label: "1999" },
  { value: "1998", label: "1998" },
  { value: "1997", label: "1997" },
  { value: "1996", label: "1996" },
  { value: "1995", label: "1995" },
  { value: "1994", label: "1994" },
  { value: "1993", label: "1993" },
  { value: "1992", label: "1992" },
  { value: "1991", label: "1991" },
  { value: "1990", label: "1990" },
  { value: "1989", label: "1989" },
  { value: "1988", label: "1988" },
  { value: "1987", label: "1987" },
  { value: "1986", label: "1986" },
  { value: "1985", label: "1985" },
  { value: "1984", label: "1984" },
  { value: "1983", label: "1983" },
  { value: "1982", label: "1982" },
  { value: "1981", label: "1981" },
  { value: "1980", label: "1980" },
  { value: "1979", label: "1979" },
  { value: "1978", label: "1978" },
  { value: "1977", label: "1977" },
  { value: "1976", label: "1976" },
  { value: "1975", label: "1975" },
  { value: "1974", label: "1974" },
  { value: "1973", label: "1973" },
  { value: "1972", label: "1972" },
  { value: "1971", label: "1971" },
  { value: "1970", label: "1970" },
  { value: "1969", label: "1969" },
  { value: "1968", label: "1968" },
  { value: "1967", label: "1967" },
  { value: "1966", label: "1966" },
  { value: "1965", label: "1965" },
  { value: "1964", label: "1964" },
  { value: "1963", label: "1963" },
  { value: "1962", label: "1962" },
  { value: "1961", label: "1961" },
  { value: "1960", label: "1960" },
  { value: "1959", label: "1959" },
  { value: "1958", label: "1958" },
  { value: "1957", label: "1957" },
  { value: "1956", label: "1956" },
  { value: "1955", label: "1955" },
  { value: "1954", label: "1954" },
  { value: "1953", label: "1953" },
  { value: "1952", label: "1952" },
  { value: "1951", label: "1951" },
  { value: "1950", label: "1950" },
  { value: "1949", label: "1949" },
  { value: "1948", label: "1948" },
  { value: "1947", label: "1947" },
  { value: "1946", label: "1946" },
  { value: "1945", label: "1945" },
  { value: "1944", label: "1944" },
  { value: "1943", label: "1943" },
  { value: "1942", label: "1942" },
  { value: "1941", label: "1941" },
  { value: "1940", label: "1940" },
];
