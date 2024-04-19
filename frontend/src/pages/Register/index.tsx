import { FormEvent, useContext, useLayoutEffect, useState } from 'react';
import { Form, Input, Button } from '../../components';
import { AUTH_TYPE, IPAYLOAD } from '../../@types';
import { validateEmail } from '../../utils';
import { AuthenticationContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import cogoToast from 'cogo-toast';
// import logo from '../../assets/logo.png';



export const Register = () => {
    const navigate = useNavigate();
    const {loading, onLogin } = useContext(AuthenticationContext) as AUTH_TYPE;
    const [state, setState] = useState<IPAYLOAD>({
        email: '',
        password: '',
    });
    const [verified, setVerified] = useState(false); // Track whether token and email are verified
    useLayoutEffect(() => {
        const verifyTokenAndEmail = async () => {
            if (
                !!sessionStorage.getItem("token") &&
                !!sessionStorage.getItem("email")
            ) {
                // Here you would typically verify the token and email on the server
                // For demonstration purposes, let's assume it's successful
                setVerified(true);
            } else {
                setVerified(false);
            }
        };
        verifyTokenAndEmail();
    }, []);
    // Redirect if token and email are verified
    useLayoutEffect(() => {
        if (verified) {
            navigate('/dashboard');
        }
    }, [verified, navigate]);
    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(state?.email)) {
          return cogoToast.error("Invalid email");
        }
        if (!state?.password || state?.password?.length < 7) {
          return cogoToast.error("Please provide password");
        }
        await onLogin(state);
    };
    const handleState = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setState({ ...state, [name]: value });
    
    };
 
    return (
        <div className="container bg-black text-white h-full flex flex-col-reverse md:flex-row w-full">
            
            <div className="w-full h-full flex items-center justify-center">
                
                <Form
                    className="flex flex-col items-center w-full max-w-md px-4"
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-col gap-2 w-full md:w-[50%]'>
                        <h2 className="text-red-500 font-extrabold text-xl underline underline-offset-4 ">
                        Sign Up!
                    </h2>
                        <div className="w-full m-auto flex flex-col gap-2 md:flex-row md:justify-between">
                            <Input
                                name="firstName"
                                placeholder='First Name'
                                handleChange={handleState}
                                type="firstName"
                                className={`bg-zinc-900 py-1 px-4 w-full shadow-xl  placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                                disabled={loading}
                            />
                            <Input
                                name="lastName"
                                placeholder='Last Name'
                                handleChange={handleState}
                                type="lastName"
                                className={`bg-zinc-900 py-1 px-4 w-full shadow-xl  placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                                disabled={loading}
                            />
                        </div>

                        <Input
                            name="email"
                            placeholder='Email'
                            handleChange={handleState}
                            type="text"
                            className={`bg-zinc-900 py-1 px-4 w-full shadow-xl  placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                            disabled={loading}
                        />
                        <Input
                            name="password"
                            placeholder='Password'
                            handleChange={handleState}
                            type="password"
                            className={`bg-zinc-900 py-1 px-4 w-full shadow-xl  placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                            disabled={loading}
                        />
                        <div className="w-full m-auto flex flex-col gap-2 md:flex-row md:justify-between">
                            <Button
                                title={loading ? 'Loading...' : 'Register'}
                                className={`bg-red-500 text-white hover:bg-orange-600 py-1 px-6 w-full `}
                                type="submit"
                                handleClick={() => navigate('/')}
                                disabled={loading}
                            />
                            <Button
                                title={'Back to Login'}
                                className={`bg-red-500 text-white hover:bg-orange-600 py-1 px-6 w-full `}
                                handleClick={() => navigate('/')}
                                disabled={loading}
                            />
                            
                        </div>
                    </div>
                </Form>
            </div>

        </div>


    );
}