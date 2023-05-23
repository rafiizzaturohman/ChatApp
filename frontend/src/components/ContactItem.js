import React, { Fragment } from 'react';

const ContactItem = (props) => {
    return (
        <Fragment>
            <div className={props.selector === props.contact ? 'transition tracking-wider py-2 bg-blue-400 text-white hover:bg-transparent hover:text-black hover:delay-100' : 'transition tracking-wider py-2 text-black hover:bg-blue-400 hover:text-white hover:delay-100'}>
                <div className={props.selector === props.contact ? 'px-3 text-white' : 'px-3'} onClick={props.set}>
                    <div className='px-3'>
                        <div>
                            <span className='tracking-wider'>{props.contact}</span>
                        </div>

                        <div>
                            {props.count > 0 &&
                                <span className='flex justify-center w-7 font-bold bg-red-500 text-white rounded-full'>{props.count}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ContactItem;