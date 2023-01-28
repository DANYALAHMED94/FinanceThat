export const VehicleTypeImages = (item) => {
    return (
        <span className="icon-holder">{item.name.toUpperCase() === ('AUTOMOTIVE').toUpperCase() || item.name.toUpperCase() === ('AUTOS').toUpperCase() || item.name.toUpperCase() === ('AUTO').toUpperCase() ? <img src="/assets/image/automotive.svg" alt={item.name} /> :
        item.name.toUpperCase() === ('MOTORCYCLE').toUpperCase() || item.name.toUpperCase() === ('MOTORCYCLES').toUpperCase() ? <img src="/assets/image/motorcycle.svg" alt={item.name} /> :
            item.name.toUpperCase() === ('RV').toUpperCase() || item.name.toUpperCase() === ('RVS').toUpperCase() ? <img src="/assets/image/rv.svg" alt={item.name} /> :
                (item.name.toUpperCase() === ('Boat').toUpperCase() || item.name.toUpperCase() === ('Boats').toUpperCase() || item.name.toUpperCase() === ('Marine').toUpperCase()) ? <img src="/assets/image/boat.svg" alt={item.name} /> :
                    item.name.toUpperCase() === ('Trailer').toUpperCase() || item.name.toUpperCase() === ('Trailers').toUpperCase() ? <img src="/assets/image/trailer.svg" alt={item.name} /> :
                        item.name.toUpperCase() === ("Powersport").toUpperCase() || item.name.toUpperCase() === ("Powersports").toUpperCase() ? <img src="/assets/image/power-sport.svg" alt={item.name} /> :
                            (item.name.toUpperCase() === ("Small Equipment").toUpperCase() || item.name.toUpperCase() === ("Small Equipments").toUpperCase() || item.name.toUpperCase() === ("Lawn Tractor").toUpperCase()) ? <img src="/assets/image/small-epuipment.svg" alt={item.name} /> :item.name == "Construction" ? (
                              <img
                                src="/assets/image/skidSteer2.svg"
                                alt={item.name}
                                width="100px"
                                height="69px"
                              />
                            ) : ''}
    </span>
    )
}

export const SubVehicleTypeImages = (subItem) => {
return (
<span className="icon-holder">
{(subItem.name.toUpperCase() === ('ATV/UTV').toUpperCase() || subItem.name.toUpperCase() === ('ATVS/UTVS').toUpperCase()) || (subItem.name.toUpperCase() === ('ATV').toUpperCase() || subItem.name.toUpperCase() === ('UTV').toUpperCase()) ? <img src="/assets/image/ATVUTV.svg" alt={subItem.name} /> :  (subItem.name.toUpperCase() === ('Dirt Bike').toUpperCase()) ? <img src="/assets/image/DirtBike.svg" alt={subItem.name} width="100px"/> : (subItem.name.toUpperCase() === ('Watercraft').toUpperCase() || subItem.name.toUpperCase() === ('Watercrafts').toUpperCase()) || (subItem.name.toUpperCase() === ('Personal Watercarft').toUpperCase()) ? <img src="/assets/image/Watercraft.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('Snowmobile').toUpperCase() || subItem.name.toUpperCase() === ('Snowmobiles').toUpperCase() ? <img src="/assets/image/snowmobile.svg" alt={subItem.name} /> : (subItem.name.toUpperCase() === ('Boat').toUpperCase() || subItem.name.toUpperCase() === ('Boats').toUpperCase() ) ? <img src="/assets/image/boat.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('MOTORCYCLE').toUpperCase() || subItem.name.toUpperCase() === ('MOTOR CYCLE').toUpperCase() ? <img src="/assets/image/motorcycle.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('Truck').toUpperCase() || subItem.name.toUpperCase() === ('Pickup Truck').toUpperCase() ? <img src="/assets/image/bt-pickup-truck.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('Cars').toUpperCase() || subItem.name.toUpperCase() === ('Car').toUpperCase() ? <img src="/assets/image/bt-sport-car-icon.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('SUVs').toUpperCase() || subItem.name.toUpperCase() === ('SUV').toUpperCase() ? <img src="/assets/image/bt-suv-icon.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('Vans').toUpperCase() || subItem.name.toUpperCase() === ('Van').toUpperCase() ? <img src="/assets/image/bt-minivan-icon.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('Travel Trailer').toUpperCase() ? <img src="/assets/image/TravelTralier.svg" alt={subItem.name} width="100px"/> : subItem.name.toUpperCase() === ('Motor Home').toUpperCase() ? <img src="/assets/image/MotorHome.svg" alt={subItem.name} width="100px"/>:  subItem.name.toUpperCase() ==="E-Scooter".toUpperCase() || subItem.name.toUpperCase() === "E-Scooters".toUpperCase() ? ( <img src="/assets/image/scooter.svg" alt={subItem.name} width="100px" height="69px" />): ""}
</span>
)
}
export const SubVehicleConstruction = subItem => {
  return (
   <span className="icon-holder">
{subItem.name.toUpperCase() === ('Skid Steer').toUpperCase() ? <img src="/assets/image/skidSteer2.svg" alt={subItem.name} width="100px" height="69px"/> : subItem.name.toUpperCase() === ('Backhoe').toUpperCase()  ? <img src="/assets/image/backHoe2.svg" alt={subItem.name} width="100px" height="69px"/> : subItem.name.toUpperCase() === ('Mini Excavator').toUpperCase() ? <img src="/assets/image/miniExcavator2.svg" alt={subItem.name} width="100px" height="69px"/> : subItem.name.toUpperCase() === ("Loader").toUpperCase() ? <img src="/assets/image/loader2.svg" alt={subItem.name} width="100px" height="69px"/> :subItem.name.toUpperCase() === ("Farm Tractor").toUpperCase() ? <img src="/assets/image/farmTractor2.svg" alt={subItem.name} width="100px" height="69px"/>:subItem.name.toUpperCase() === ("Small Construction").toUpperCase() ? <img src="/assets/image/compactor2.svg" alt={subItem.name} width="100px" height="69px"/>: ''}
</span>
  )
}