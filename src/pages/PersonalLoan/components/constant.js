export const formStateInit = {
  // type for long application will be 0 and for quick will be 1
  // 1 from short application for inhouse
  // 2 from short application for dealers
  loan_amount:"",
  type_of_loan: "",
  employement_status: '',
  //  monthly income can be a range as well
  monthly_income: '',
  employer_name: "",
  employment_designation: "",
  street_address: "",
  unit_number:"",
  city: "",
  province: "",
  province_full:"",
  postal_code: "",
  country: "Canada",
  // address yr can be in range
  // -1 , 1-3 , 3-5 , 5+
  month: "",
  day: "",
  year: "",
  dob: null,
  first_name: "",
  last_name: "",
  telephone: "",
  applicant_email: "",
  bankRuptcy:'',
  existingLoan:"",
  sub_type_of_loan:""
  // values that is required on backend
};

export const existingLoans = [
  { img: "/assets/image/easyFinancial.svg", name: "Easy Financial" },
  { img: "/assets/image/landCare.svg", name: "LendCare" },
  { img: "", name: "No, I don't" },
];

export const bankRuptcy = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

// export const typeOfLoan = [
//   {  img: "/assets/image/personalLoan/bill.svg", activeImage:"/assets/image/personalLoan/billActive.svg", name: "Bills and Expenses" },
//   {  img: "/assets/image/personalLoan/Medical.svg", activeImage:"/assets/image/personalLoan/carRepairActive.svg", name: "Car Repair" },
//   {  img: "/assets/image/personalLoan/itempurchase.svg", activeImage:"/assets/image/personalLoan/itemPurchaseActive.svg" ,name: "Item Purchase" },
//   {  img: "/assets/image/personalLoan/debt-consolidation.svg",activeImage:"/assets/image/personalLoan/debt-consolidation-active.svg",  name: "Debt Consolidation" },
//   { img: "/assets/image/personalLoan/education.svg", activeImage:"/assets/image/personalLoan/graduated-active.svg",  name: "Education" },
//   {
//     img: "/assets/image/personalLoan/healthCare.svg",
//     activeImage:"/assets/image/personalLoan/healthCareActive.svg",
//     name: "Healthcare",
//   },
//   {
//     img: "/assets/image/personalLoan/home-repair.svg",
//     activeImage:"/assets/image/personalLoan/home-repair-active.svg",
//     name: "Home Repair",
//   },
//   {
//     img: "/assets/image/personalLoan/carPurchase.svg",
//     activeImage:"/assets/image/personalLoan/new-car-active.svg",
//     name: "Car Purchase",
//   },
//   {
//     img: "/assets/image/personalLoan/other.svg",
//     activeImage:"/assets/image/personalLoan/hand-active.svg",
//     name: "Other",
//   },
// ];

export const typeOfLoan = [
  {  img: "/assets/image/personalLoan/bill.svg", activeImage:"/assets/image/personalLoan/billActive.svg", name: "Personal Loans" },
  {  img: "/assets/image/personalLoan/Medical.svg", activeImage:"/assets/image/personalLoan/Medical.svg", name: "Medical Procedure" },
  {  img: "/assets/image/personalLoan/Home.svg", activeImage:"/assets/image/personalLoan/Home.svg" ,name: "Home Renovation" },
  {  img: "/assets/image/personalLoan/itempurchase.svg",activeImage:"/assets/image/personalLoan/itemPurchaseActive.svg",  name: "Retail Purchase" },
  { img: "/assets/image/personalLoan/carrepair  .svg", activeImage:"/assets/image/personalLoan/carRepairActive.svg",  name: "Automotive" },
  // { img: "/assets/image/personalLoan/Medical.svg", activeImage:"/assets/image/personalLoan/Medical.svg",  name: "Veterinary Care" }
  {  img: "/assets/image/personalLoan/pet1.svg", activeImage:"/assets/image/personalLoan/pet1Active.svg" ,name: "Veterinary Care" },
];

export const newPersonalLoanType=[
  {label:"Bills & Expenses", value:"Bills & Expenses"},
  {label:"Debt Consolidation", value:"Debt Consolidation"},
  {label:"Education", value:"Education"},
  {label:"Other", value:"Other"}
]

export const medicalProcedure = [{value:"Medical Treatment", label:"Medical Treatment"},{value:"Optometry", label:"Optometry"},{value:"Medical Surgery", label:"Medical Surgery"},{value:"Cosmetic Surgery", label:"Cosmetic Surgery"},{value:"Dental", label:"Dental"},{value:"Medical Devices", label:"Medical Devices"},{value:"Vision", label:"Vision"},{value:"Cosmetics", label:"Cosmetics"},{value:"Other", label:"Other"}]

export const homeRenovation = [{value:"Water Systems", label:"Water Systems"},{value:"Hot Tubs", label:"Hot Tubs"},{value:"Pools", label:"Pools"},{value:"Soffit and Facia", label:"Soffit and Facia"},{value:"Renovation", label:"Renovation"},{value:"Alarm Systems", label:"Alarm Systems"},{value:"HVAC Equipment", label:"HVAC Equipment"},{value:"Roofing", label:"Roofing"},{value:"Windows & Doors", label:"Windows & Doors"},{value:"Other", label:"Other"}]

export const retailPurchase = [{value:"E-Bikes", label:"E-Bikes"},{value:"Vacuums", label:"Vacuums"},{value:"Food", label:"Food"},{value:"Vacation", label:"Vacation"},{value:"Air Purifier", label:"Air Purifier"},{value:"Cookware", label:"Cookware"},{value:"Drone", label:"Drone"},{value:"Travel", label:"Travel"},{value:"Jewelry", label:"Jewelry"},{value:"Electronics", label:"Electronics"},{value:"Furniture", label:"Furniture"},{value:"Appliances", label:"Appliances"},{value:"Instruments", label:"Instruments"},{value:"Miscellaneous", label:"Miscellaneous"}]

export const autoMotive = [{value:"Repair", label:"Repair"},{value:"Accessories", label:"Accessories"},{value:"Tires", label:"Tires"},{value:"Other", label:"Other"}]


export const monthlyBudgetOptions = [
  { label: "Under $250/month", value: "250" },
  { label: "$250 - 350/month", value: "250-350" },
  { label: "$350 - 500/month", value: "350-500" },
  { label: "Over $500/month", value: "500" },
];
export const booleanOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const employmentStatusOptions = [
  {label:"Full time", value:"Full time"},
  {label:"Part time", value:"Part time"},
  { label: "Self-Employed", value: "Self-Employed" },
  {label:"Seasonal (EI)", value:"Seasonal (EI)"},
  { label: "Retired", value: "Retired" },
  {label:"Maternity leave", value:"Maternity leave"},
  { label: "Disability", value: "Disability" },
  { label: "Social assistance", value: "Social assistance" },
  { label: "Unemployed", value: "Unemployed" },
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
