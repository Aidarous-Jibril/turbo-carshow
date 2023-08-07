import type { DefaultUser } from 'next-auth';

import { FormEvent, MouseEventHandler, ReactNode } from "react";

export interface CustomBtnProps {
    title: string,
    btnType?: string,
    optionStyles?: string,
    isDisabled?: boolean,
    icon?: string,
    handleClick?: MouseEventHandler<HTMLButtonElement>
}

export interface SearchManuFacturerProps {
    make: string,
    setMake: (make: string) => void;
}


export interface FilterDataProps {
  make?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface HomeProps {
  searchParams: FilterDataProps;
}


export interface OptionsProps {
  title: string,
  value: string
}

export interface CustomFilterProps {
  title: string,
  options: OptionsProps[]
}

export interface ShowMoreProps {
  pageNumber: number,
  isNextPage: boolean
}

export interface ProviderProps {
  children: ReactNode;
  session: any;
}

//Added this for signing session user id to mongo db _id
declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

//Formik validation
export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confpassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}


//   user mongoose model
export interface IUser {
  id?: string,
  username: string;
  email: string;
  password: string;
  coverImage: string,
  image: String
}

  export interface RequestBodyProps {
    username: string,
    email: String,
    password: String,
    coverImage?: String,
    image?: String
  }

  export interface CarProps {
    city_mpg: number;
    make: string;
    carTitle: string;
    location: string;
    rentPrice: number;
    fuelCapacity: number;
    capacity: number;
    shortDescription: string;
    typeOfclass: string;
    model: string;
    manufacturer: string;
    cylinders: number;
    cityMPG: number;
    combinationMPG: number;
    highwayMPG: number;
    year: number;
    transmission: string;
    fuelType: string;
    carType: string;
    drive: string;
    imageFiles: string[];
    creator?: CreatorProps;
    _id?: string;
  }
  
  export interface CarInfoProps extends CarProps {
    creator?: CreatorProps;
    _id?: string;
  }
    
  export interface CreatorProps {
    _id: string;
    email: string;
    username: string;
  }


  // Add car form props
  export interface FormProps {
    carInfo: CarInfoProps;
    setCarInfo: React.Dispatch<React.SetStateAction<CarInfoProps>>;
    submitBtnTitle: string;
    title: string;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isLoading?: boolean;
}

export interface CustomSelectProps {
  options: { value: string; title: string }[];
  label: string;
  containerStyle?: string;
  parentContainerStyle?: string;
  onChange: (value: string, name: string) => void;
  name: string;

}

export interface CustomInputProps {
  label: string,
  name: string,
  placeholder: string, 
  type?: 'text' | 'number' | 'radio' | 'number', 
  value: string | number,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ImageUploaderProps {
  handleDragDrop: (acceptedFiles: File[]) => void,
  files: File[],
  carInfo?: CarInfoProps
}


import NextAuth from 'next-auth';
