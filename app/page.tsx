import { CarCard, CustomFilters, Hero, SearchBar } from '@/components'
import LatestAddedCars from '@/components/LatestAddedCars'
import ShowMore from '@/components/ShowMore'
import { fuels, yearsOfProduction } from '@/constants'
import { CarProps, HomeProps } from '@/types'
import { fetchCarData } from '@/utils'



export default async function Home({ searchParams }: HomeProps ) {
  const allCars = await fetchCarData({
    make: searchParams.make || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",

  })

  return (
    <main className="overflow-hidden mt-4">
     <Hero />

     <div className='mt-12 padding-x padding-y max-width' id='discover'>
      
        <div className='flex flex-col items-start justify-start gap-y-2.5 text-black-100'>
          <h1 className='text-4xl font-extrabold'>Explore Our Vehicles' Catalogue</h1>
          <p className='text-gray-500 dark:text-gray-400'>Find the car you might like!</p>
        </div>

        <div className='mt-12 w-full flex-between items-center flex-wrap gap-5'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilters title="fuel" options={fuels} />
            <CustomFilters title="year" options={yearsOfProduction} />
          </div>
        <div>

        {/* <LatestAddedCars /> */}
        </div>
        </div>
          {allCars.length > 0 ? (
            <section>
              <div className='home__cars-wrapper'>
                {allCars?.map((car: CarProps) => (
                  <>
                    <CarCard car={car} />
                  </>
                ))}
              </div>
              <ShowMore
                pageNumber={(searchParams.limit || 10) / 10 }
                isNextPage={(searchParams.limit || 10) > allCars.length}
                />
            </section>
          ) :  (
            <div className='mt-16 flex justify-center items-center flex-col gap-2' >
              <h2 className='text-black text-lg '>Oops, There is no result</h2>
              <p>{allCars?.message}</p>
            </div>
          )}
      </div>
    </main>
  )

}