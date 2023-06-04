'use client';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues, SubmitHandler, set } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const { isOpen, onClose, onOpen } = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const login = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            console.log(login);


            if (login?.ok) {
                setIsLoading(false);
                toast.success('Logged in successfully!');
                router.refresh();
                loginModal.onClose();
            }


        } catch (error) {
            setIsLoading(false);
            toast.error('error');
            router.push('/');
        }
    }

    const doYouHaveAnAccount = useCallback(() => {
        loginModal.onClose();
        onOpen();
    }, [loginModal, onOpen]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back' subtitle='Login to your account!' />
            <Input 
                id='email'
                label='Email'
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
                    First time using our web? <span className='text-neutral-800 font-semibold'>Create an account</span> 
                </p>
            </div>
        </div>
    )
    

  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal;