import { MouseEventHandler, ReactNode } from "react";

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

export interface CarProps {
    city_mpg: number;
    // class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
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
    session?: any;
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
    username: string;
    email: string;
    password: string;
    coverImage: string,
    image: String
  }