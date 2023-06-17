import { Range } from "react-date-range";
import Calendar from "../Inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    value: Range;
    onChange: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation = ({
    price,
    totalPrice,
    value: dateRange,
    onChange,
    onSubmit,
    disabled,
    disabledDates,
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <div className="flex flex-row items-center gap-1 p-4">
            <p className="text-2xl font-semibold">
                ${price}
            </p>
            <p className="font-light text-neutral-600">
                / night
            </p>
        </div>
        <Calendar 
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value: any) => onChange(value.selection)}
        />
        <hr />
        <div className="p-4">
            <Button
                disabled={disabled}
                label="Reserve"
                onClick={onSubmit}
            />
        </div>
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
            <h4>
                Total
            </h4>
            <p>
                $ {totalPrice}
            </p>
        </div>
    </div>
  )
}

export default ListingReservation;