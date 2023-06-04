'use client'

import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiForestCamp, GiCactus } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is located near the beach'
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills'
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has pool'
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to a lake'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities'
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is in a castle'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping activities'
  },
  {
    label: 'Snow',
    icon: BsSnow,
    description: 'This property is close to snow'
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious'
  }
]

const Categories = () => {

  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className={`flex flex-row items-center pt-4 justify-between overflow-x-auto 
      `}>
        {
          categories.map((item) => (
            <CategoryBox 
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))
        }
      </div>
    </Container>
  )
}

export default Categories;