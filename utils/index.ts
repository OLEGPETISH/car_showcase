export async function fetchCars() {
    const headers = {
        'X-API-Key': 'ZsPvqS1fRiUOsHqiFqTt1A==vmr97VRDl6bSAOOw',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    
    const response = await fetch('https://api.api-ninjas.com/v1/cars?model=camry',{ headers: headers});

    const result = await response.json();
    return result;
}
export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
    return rentalRatePerDay.toFixed(0);
};
