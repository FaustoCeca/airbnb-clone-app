'use client';

import { useRentModal } from "@/app/hooks";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum Steps {
  Category = 0,
  Location = 1,
  Info = 2,
  Images = 3,
  Description = 4,
  Price = 5,
}


const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(Steps.Category);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      category: '' as string,
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import('../Map')), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  const handleBack = () => {
    setStep((step) => step - 1);
  }

  const handleNext = () => {
    setStep((step) => step + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== Steps.Price) {
      handleNext();
      return;
    }
    
    setIsLoading(true);
    axios.post('/api/listings', data)
      .then(() => {
        rentModal.onClose();
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(Steps.Category);
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const actionLabel = useMemo(() => {
    if (step === Steps.Price) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.Category) {
      return 'Cancel'
    }

    return 'Back'
  }, [step]);


  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading 
        title="Which of these best describes your place?"
        subtitle="You can always change this later."
      />
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div className="col-span-1" key={item.label}>
            <CategoryInput 
              onClick={(category) => setCustomValue('category', category)}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === Steps.Location) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect 
          onChange={(value) => setCustomValue('location', value)}
          value={location}
        />
        <Map
          center={location?.latlng}
        />
      </div>
    )
  }

  if (step === Steps.Info) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests can your place accommodate?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms can guests use?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms can guests use?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    )
  }

  if (step === Steps.Images) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Add some photos of your place"
          subtitle="Guests love photos!"
        />
        <ImageUpload 
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    )
  }

  if (step === Steps.Description) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Describe your place to guests"
          subtitle="Tell guests what you love about your place."
        />
        <Input 
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input 
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === Steps.Price) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Now, set your price"
          subtitle="How much do you want to charge?"
        />
        <Input 
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
          type="number"
        />
      </div>
    )
  }
    

  return (
    <Modal 
      title='Airbnb your Home'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={step === Steps.Category ? rentModal.onClose : handleBack}
      body={bodyContent}
    />
  )
}

export default RentModal;