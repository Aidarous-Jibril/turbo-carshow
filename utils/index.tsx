import axios from 'axios'

import { CarProps, FilterDataProps } from '@/types';


// export const fetchCarData = async ( filterData: FilterDataProps ) => {
  export async function fetchCarData(filters: FilterDataProps) {
    const { make, year, model, limit, fuel } = filters;
  
    const  headers = {
        'X-RapidAPI-Key': 'f342a7608bmsheef88df8f316611p1d3424jsnf82dc554ca3e',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
      }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,  {headers: headers})

    const result = await response.json()
    return result 
  };


    // calculate Car rent per day funt
    export const calculateCarRent = (city_mpg: number, year: number) => {
      const basePricePerDay = 50; // Base rental price per day in dollars
      const mileageFactor = 0.1; // Additional rate per mile driven
      const ageFactor = 0.05; // Additional rate per year of vehicle age
    
      // Calculate additional rate based on mileage and age
      const mileageRate = city_mpg * mileageFactor;
      const ageRate = (new Date().getFullYear() - year) * ageFactor;
    
      // Calculate total rental rate per day
      const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
    
      return rentalRatePerDay.toFixed(0);
    };

    // generate car images from third party website
    export const generateCarImageUrl = ( car: CarProps, angle?: string) => {
      const url = new URL("https://cdn.imagin.studio/getimage");
      const { make, model, year } = car;  

      url.searchParams.append('customer', 'haadweb');
      url.searchParams.append('make' ,make);
      url.searchParams.append('modelFamily', model.split(' ')[0]);
      url.searchParams.append('modelYear', `${year}`);
      // url.searchParams.append('zoomLevel', `${zoomLevel}`);
      url.searchParams.append('angle', `${angle}`);

      return `${url}`;
    }

//tobe re-used func
  export const updateSearchParams = ( title: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    searchParams.set(title, value)

    const pathName = `${window.location.pathname}?${searchParams.toString()}`
 
    return pathName
  }