'use client'
import { FormEvent, useState, useEffect } from 'react';
import Form from '@/components/Form';
import useWindowSize from '@/utils/useWindowSize';
import {  CarInfoProps } from '@/types';
import { useSession } from 'next-auth/react';

import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';



const AddCar = () => {
    const router = useRouter()
    const { data: session } = useSession();
    // console.log(session)
    const { width, height } = useWindowSize();
    const [carInfo, setCarInfo] = useState<CarInfoProps>({
        carTitle: '',
        capacity: 0,
        carType: '',
        cityMPG: 0,
        highwayMPG: 0,
        combinationMPG: 0,
        cylinders: 0,
        fuelCapacity: 0,
        fuelType: '',
        imageFiles: [],
        location: '',
        manufacturer:'',
        model:'',
        rentPrice:1,
        shortDescription:'',
        transmission:'',
        typeOfclass:'',
        year: '',
        drive: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // check if there is a user
        if (!session?.user?.id) {
            router.push('/user/login')
            toast.error('Login/Signup to addd a car to ren.');
            return;
        };
        if (isSuccess) {
            setTimeout(() => {
                setIsSuccess(false);
                router.push('/')
            }, 5000);
        }
    }, [isSuccess, session]);

    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform any additional validation or data processing here
        // setIsLoadingk(true);
        
        toast.promise((async () => {
            try {
                const response = await fetch(`/api/car-route/user/${session?.user?.id}`, {
                    method: 'POST',
                    body: JSON.stringify(carInfo),
                });
                if (response.ok) {
                    setIsSuccess(true);
                    setIsLoading(true);
                    toast.success('Car has been registered successfully.');
                    // router.push('/')
                }
            } catch (error) {
                console.error(error);
                setIsSuccess(false);
            } finally {
                setIsLoading(false);
            }
        })(), {
            loading: 'Registering car...',
            success: 'Car registered successfully.',
            error: (err) => err.message,
        });
    };

    return (
        <section className='relative pt-16 md:pt-20 px-1 '>
            {isSuccess && <Confetti width={width - 100} height={height - 100} />}
            <Form
                carInfo={carInfo}
                setCarInfo={setCarInfo}
                submitBtnTitle='Add car'
                title='Add your car to rent'
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </section>
    )
}

export default AddCar
