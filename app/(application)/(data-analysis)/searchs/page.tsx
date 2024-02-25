import { db } from '@/lib/db'
import React from 'react'
import { TBarCharData } from '../_components/barcharts';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const DynamicBarchar = dynamic(
  () => import('../_components/barcharts'),
  {
    loading: () => <Skeleton className="h-full w-full">Cargando grafico...</Skeleton>,
    ssr: false
  }
)

export default async function SearchsPage() {


  const scrappings = await db.user.findMany({
    select: {
      amazonHistory: { select: { list: true } },
      bookStoreHistory: { select: { list: true } },
      instagramHistory: { select: { list: true } },
      mercadoLibreHistory: { select: { list: true } },
    }
  })


  // ===INSTAGRAM COUNT===
  const instagramLists = scrappings.flatMap(scrape => scrape.instagramHistory?.list ?? []);

  // counting map
  const countMapInstagram: { [key: string]: number } = {};

  // counting by frequency
  instagramLists.forEach(item => {
    countMapInstagram[item] = (countMapInstagram[item] || 0) + 1;
  });

  // Convert matrix to key-value
  const frequencyArrayInstagram = Object.entries(countMapInstagram);

  // Order to descending
  const sortedFrequencyInstagram = frequencyArrayInstagram.sort((a, b) => b[1] - a[1]);
  const maxCountingInstagram = sortedFrequencyInstagram[0]
  const minCountingInstagram = sortedFrequencyInstagram[sortedFrequencyInstagram.length - 1]




  // ===AMAZON COUNT===
  const amazonLists = scrappings.flatMap(scrape => scrape.amazonHistory?.list ?? []);

  // counting map
  const countMapAmazon: { [key: string]: number } = {};

  // counting by frequency
  amazonLists.forEach(item => {
    countMapAmazon[item] = (countMapAmazon[item] || 0) + 1;
  });

  // Convert matrix to key-value
  const frequencyArrayAmazon = Object.entries(countMapAmazon);

  // Order to descending
  const sortedFrequencyAmazon = frequencyArrayAmazon.sort((a, b) => b[1] - a[1]);
  const maxCountingAmazon = sortedFrequencyAmazon[0]
  const minCountingAmazon = sortedFrequencyAmazon[sortedFrequencyAmazon.length - 1]



  // ===MERCADO LIBRE COUNT===
  const mercadoLibreLists = scrappings.flatMap(scrape => scrape.mercadoLibreHistory?.list ?? []);

  // counting map
  const countMapMercadoLibre: { [key: string]: number } = {};
  // counting by frequency
  mercadoLibreLists.forEach(item => {
    countMapMercadoLibre[item] = (countMapMercadoLibre[item] || 0) + 1;
  });

  // Convert matrix to key-value
  const frequencyArrayMercadoLibre = Object.entries(countMapMercadoLibre);

  // Order to descending
  const sortedFrequencyMercadoLibre = frequencyArrayMercadoLibre.sort((a, b) => b[1] - a[1]);
  const maxCountingMercadoLibre = sortedFrequencyMercadoLibre[0]
  const minCountingMercadoLibre = sortedFrequencyMercadoLibre[sortedFrequencyMercadoLibre.length - 1]



  // ===BOOK STORE COUNT===
  const bookStoreLists = scrappings.flatMap(scrape => scrape.bookStoreHistory?.list ?? []);

  // counting map
  const countMapBookStore: { [key: string]: number } = {};

  /**Docs: padStart example:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
   */

  bookStoreLists.forEach(item => {
    const date = new Date(item);

    // Check if date is valid String
    if (!isNaN(date.getTime())) {
      const month = date.getMonth() + 1;
      countMapBookStore[`${date.getFullYear()}-${month.toString().padStart(2, '0')}`] =
        (countMapBookStore[`${date.getFullYear()}-${month.toString().padStart(2, '0')}`] || 0) + 1;
    }
  });

  // Convert year-month to array
  const yearMonthArray = Object.keys(countMapBookStore);

  // year-month high frequency
  const mostFrequentYearMonth = yearMonthArray.reduce((maxYearMonth, currentYearMonth) => {
    return countMapBookStore[currentYearMonth] > countMapBookStore[maxYearMonth] ? currentYearMonth : maxYearMonth;
  }, yearMonthArray[0]);

  // year-month low frequency
  const leastFrequentYearMonth = yearMonthArray.reduce((minYearMonth, currentYearMonth) => {
    return countMapBookStore[currentYearMonth] < countMapBookStore[minYearMonth] ? currentYearMonth : minYearMonth;
  }, yearMonthArray[0]);

  // example print
  // console.log(`Año-mes más frecuente: ${mostFrequentYearMonth}, Repeticiones: ${countMapBookStore[mostFrequentYearMonth]}`);
  // console.log(`Año-mes menos frecuente: ${leastFrequentYearMonth}, Repeticiones: ${countMapBookStore[leastFrequentYearMonth]}`);

  const monthsArray = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  function getMonthFromString(dateStr: string) {
    return monthsArray[new Date(dateStr).getMonth()]
  };

  function getYearFromDate(dateStr: string): number | null {
    const date = new Date(dateStr);

    if (!isNaN(date.getTime())) {
      return date.getFullYear();
    }
    // if string is not valid
    return null;
  }

  // console.log(`mes más frecuente: ${getMonthFromString(mostFrequentYearMonth)}, Repeticiones: ${countMapBookStore[mostFrequentYearMonth]}`);
  // console.log(`mes menos frecuente: ${getMonthFromString(leastFrequentYearMonth)}, Repeticiones: ${countMapBookStore[leastFrequentYearMonth]}`);

  // console.log(`Año más frecuente: ${getYearFromDate(mostFrequentYearMonth)}, Repeticiones: ${countMapBookStore[mostFrequentYearMonth]}`);
  // console.log(`Año menos frecuente: ${getYearFromDate(leastFrequentYearMonth)}, Repeticiones: ${countMapBookStore[leastFrequentYearMonth]}`);




  // CLEAN DATA TO CHAR

  // properties like
  // const maxCountingInstagram: [string, number]
  const [maxStringInstagram, maxInstagram] = maxCountingInstagram
  const [minStringInstagram, minInstagram] = minCountingInstagram

  const [maxStringAmazon, maxAmazon] = maxCountingAmazon
  const [minStringAmazon, minAmazon] = minCountingAmazon

  const [maxStringML, maxMercadoLibre] = maxCountingMercadoLibre
  const [minStringML, minMercadoLibre] = minCountingMercadoLibre

  const [maxStringBookStore, maxBookStore] = [mostFrequentYearMonth, countMapBookStore[mostFrequentYearMonth]]
  const [minStringBookStore, minBookStore] = [leastFrequentYearMonth, countMapBookStore[leastFrequentYearMonth]]

  const cleanData: TBarCharData[] = [
    {
      name: 'Instagram',
      extraName: `(${maxStringInstagram}, ${minStringInstagram})`,
      max: maxInstagram,
      min: minInstagram,
    },
    {
      name: `Amazon`,
      extraName: `(${maxStringAmazon}, ${minStringAmazon})`,
      max: maxAmazon,
      min: minAmazon,
    },
    {
      name: `MercadoLibre`,
      extraName: `(${maxStringML}, ${minStringML})`,
      max: maxMercadoLibre,
      min: minMercadoLibre,
    },
    {
      name: `TiendadeLibro`,
      extraName: `(${maxStringBookStore}, ${minStringBookStore})`,
      max: maxBookStore,
      min: minBookStore,
    },
  ]

  return (
    <>
      <DynamicBarchar data={cleanData} />
      <div className='flex flex-col justify-center items-center md:items-start'>

        <p><span className='font-semibold'>Instagram: </span>
          {minInstagram} de <span className='text-[#82ca9d]'>{minStringInstagram} (Min)</span>
          &nbsp;|&nbsp;
          {maxInstagram} de <span className='text-[#8884d8]'>{maxStringInstagram} (Max)</span>
        </p>

        <p><span className='font-semibold'>Amazon: </span>
          {minAmazon} de <span className='text-[#82ca9d]'>{minStringAmazon} (Min)</span>
          &nbsp;|&nbsp;
          {maxAmazon} de <span className='text-[#8884d8]'>{maxStringAmazon} (Max)</span>
        </p>

        <p><span className='font-semibold'>Mercado Libre: </span>
          {minMercadoLibre} de <span className='text-[#82ca9d]'>{minStringML} (Min)</span>
          &nbsp;|&nbsp;
          {maxMercadoLibre} de <span className='text-[#8884d8]'>{maxStringML} (Max)</span>
        </p>

        <p><span className='font-semibold'>Tienda de Libros (Año-mes): </span>
          {minBookStore} <span className='text-[#82ca9d]'>{minStringBookStore} (Min)</span>
          &nbsp;|&nbsp;
          {maxBookStore} <span className='text-[#8884d8]'>{maxStringBookStore} (Max)</span>
        </p>

      </div>
    </>
  )
}
{/* <Bar dataKey="min" fill="#82ca9d" />
<Bar dataKey="max" fill="#8884d8" /> */}