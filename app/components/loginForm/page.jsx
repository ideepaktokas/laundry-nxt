import React from 'react'
import Link from 'next/link';

const LoginForm = () => {
    return (
        <section className='login_section registration_section'>
            <h3 className='block_title text-center'>Welcome back</h3>
            <p className='text-center block_sub_title'>Login to continue</p>
            <div className='card'>
                <div className='card-body'>
                    <form>
                        <div className='mb-3'>
                            <input className='form-control'
                                type='email'
                                placeholder='Email'
                            />
                        </div>
                        <div className='mb-3'>
                            <input className='form-control'
                                type='text'
                                placeholder='password'
                            />
                        </div>
                        <div className='d-flex justify-between align-items-center mb-3'>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div>
                                <Link href="#" title="Forget Password">Forget Password</Link>
                            </div>
                        </div>
                        <div className='mb-3 text-center'>
                            <button type='submit' className='btn btn-default'>Submit</button>
                        </div>
                        <div className='text-center'>
                            Don't have account <Link href="#" title="Signup">Signup</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginForm;
