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
export const passengers = [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' }, { value: '8', label: '8' }, { value: '9', label: '9' }, { value: '10', label: '10' }, { value: '10', label: '10+' }]
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

