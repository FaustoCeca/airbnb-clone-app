'use client';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import { useLoginModal } from '@/app/hooks';

const RegisterModal = () => {
    const { isOpen, onClose, onOpen } = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const loginModal = useLoginModal();

    const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            name: '',
            password: '',
        }
    });

    const doYouHaveAnAccount = useCallback(() => {
        onClose();
        loginModal.onOpen();
    }, [loginModal, onClose]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const response = await axios.post('/api/register', data);

            onClose();
            setIsLoading(false);

            console.log(response);

            toast.success('Account created successfully!');
        } catch (error) {
            toast.error('Something went wrong, please try again later.');
        }
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
            <Input 
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                label='Continue with Github'
                disabled={isLoading}
                icon={AiFillGithub}
                outline
                onClick={() => signIn('github')}
            />
            <Button 
                label='Continue with Google'
                disabled={isLoading}
                icon={FcGoogle}
                outline
                onClick={() => {}}
            />
            <div className='flex flex-col md:flex-row justify-around items-center gap-2 text-neutral-500 text-center mt-4 font-light'>
                <p 
                    onClick={doYouHaveAnAccount}
                    className='text-neutral-600 cursor-pointer hover:underline'
                >
                    Already have an account? <span className='text-neutral-800 font-semibold'>Log in</span> 
                </p>
            </div>
        </div>
    )
    

  return (
    <Modal 
        disabled={isLoading}
        isOpen={isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal;