export const transmissions = [
    { name: 'Automatic' },
    { name: 'Manual' }]
export const colors = [
    { name: 'Green', classname: 'ColorGreen' },
    { name: 'Yellow', classname: 'ColorYellow' },
    { name: 'Orange', classname: 'ColorOrange' },
    { name: 'Purple', classname: 'ColorPurple' },
    { name: 'Blue', classname: 'ColorBlue' },
    { name: 'Silver', classname: 'ColorSilver' },
    { name: 'Black', classname: 'ColorBlack' },
    { name: 'Red', classname: 'ColorRed' },
    { name: 'Gold', classname: 'ColorGold' },
    { name: 'Grey', classname: 'ColorGrey' },
    { name: 'Biege', classname: 'ColorBiege' },
    { name: 'Brown', classname: 'ColorBrown' },
]
export const steeringTypes = [
    { name: 'Tille' },
    { name: 'Wheel' }]
export const seatings = [{ value: '2', label: '2' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '8', label: '8' }, { value: '10', label: '10+' }]
export const passengers = [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' }, { value: '8', label: '8' }, { value: '9', label: '9' }, { value: '10', label: '10+' }]
export const conditions = [{ name: 'New' }, { name: 'Used' }]
export const owners = [{ name: '1 Owner', value: 1 }, { name: '2 Owner', value: 2 }, { name: '2+ Owner', value: 3 }]
export const accidents = [{ name: 'No Accidents', value: 0 }, { name: '1 Accident', value: 1 }, { name: '2+ Accidents', value: 2 }]
export const cylinders = [{ value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }, { value: '8' }, { value: '12' }]
let currentYear = new Date().getFullYear();
let earliestYear = 1900;
export let years = []
while (currentYear >= earliestYear) {
    years.push({ label: `${currentYear}`, value: currentYear })
    currentYear -= 1;
}
export var sideBarFilters = [{
    id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
    kilometer: true,
    condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false, length: false, hull_material: false, weight: false, engineName: ''
},
{
    id: 9, name: "Powersport", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: true,
    condition: true, transmission: true, fuel_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: true, hours: true, passengers: false, steering_types: false, length: false, hull_material: false, weight: false, engineName: 'Engine CC'
},
{
    id: 2, name: "Motorcycle", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: true,
    condition: true, transmission: false, fuel_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: true, hours: false, passengers: false, steering_types: false, length: false, hull_material: false, weight: false, engineName: 'Engine CC'
},
{
    id: 3, name: "Boat", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: false,
    condition: true, transmission: false, fuel_type: true, passenger: true, steering_type: true, drive_train: false, cylinder: false, seating: false, color: false, seller_type: true, accident: true, owners: true, features: true, vin: false, engineCC: true, hours: true, passengers: true, steering_types: true, length: true, hull_material: true, weight: false, engineName: 'Engine Horsepower'
},
{
    id: 6, name: "RV", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: true,
    condition: true, transmission: false, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: false, seller_type: true, accident: true, owners: true, features: true, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false, length: true, hull_material: false, weight: true, engineName: 'Engine CC'
},
{
    id: 8, name: "Small Equipment", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: false,
    condition: true, transmission: false, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: false, seller_type: true, accident: true, owners: true, features: false, vin: false, engineCC: true, hours: true, passengers: false, steering_types: false, length: false, hull_material: false, weight: false, engineName: 'Engine CC'
},
{
    id: 1, name: "Trailer", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: true,
    condition: true, transmission: false, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: false, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false, length: false, hull_material: false, weight: false, engineName: 'Engine CC'
},
{
    id: 19, name: "Construction", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: true,
    condition: true, transmission: true, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: false, seller_type: true, accident: false, owners: true, features: false, vin: true, engineCC: true, hours: false, passengers: false, steering_types: false, length: false, hull_material: false, weight: false, engineName: 'Engine CC'
}

];
export var sortData = [{
    name: '', value: '', label: 'ALL'
}, {
    name: 'Price Lowest First', value: 'price_lowest_first', label: 'Price Lowest First'
}, {
    name: 'Price Highest First', value: 'price_highest_first', label: 'Price Highest First'
}, {
    name: 'Listings Newest', value: 'listings_newest', label: 'Listings Newest'
}, {
    name: 'Listings Oldest', value: 'listings_oldest', label: 'Listings Oldest'
}, {
    name: 'Distance Nearest', value: 'distance_nearest', label: 'Distance Nearest'
}, {
    name: 'Distance Farthest', value: 'distance_farthest', label: 'Distance Farthest'
}, {
    name: 'Year Nearest', value: 'year_nearest', label: 'Year Nearest'
}, {
    name: 'Year Lowest', value: 'year_lowest', label: 'Year Lowest'
}, {
    name: 'Mileage Lowest', value: 'mileage_lowest', label: 'Mileage Lowest'
}, {
    name: 'Mileage Highest', value: 'mileage_highest', label: 'Mileage Highest'
}];
const filters = [{
    id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
    kilometer: true,
    condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false, length: false, hull_material: false, weight: false
},
{
    id: 9, name: "Powersport", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: true,
    condition: true, transmission: true, fuel_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: true, hours: true, passengers: false, steering_types: false, length: false, hull_material: false, weight: false
},
{
    id: 2, name: "Motorcycle", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: true,
    condition: true, transmission: false, fuel_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: true, hours: false, passengers: false, steering_types: false, length: false, hull_material: false, weight: false
},
{
    id: 3, name: "Boat", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: false,
    condition: true, transmission: false, fuel_type: true, passenger: true, steering_type: true, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, vin: false, engineCC: true, hours: true, passengers: true, steering_types: true, length: true, hull_material: true, weight: false
},
{
    id: 6, name: "RV", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: true,
    condition: true, transmission: false, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false, length: true, hull_material: false, weight: true
},
{
    id: 8, name: "Small Equipment", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: false,
    condition: true, transmission: false, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: false, seller_type: true, accident: true, owners: true, features: false, vin: false, engineCC: true, hours: true, passengers: false, steering_types: false, length: false, hull_material: false, weight: false
},
{
    id: 1, name: "Trailer", make: true, model: true, trim: false, year: true, body_type: false, price: true,
    kilometer: true,
    condition: true, transmission: false, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: false, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false, length: false, hull_material: false, weight: false
}
]