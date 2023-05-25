import React, { Fragment } from 'react';

const ContactItem = (props) => {
    return (
        <Fragment>
            <div className={props.selector === props.contact ? 'transition tracking-wider py-3 bg-gray-400/60 text-black hover:bg-gray-400/20 hover:delay-100' : 'transition tracking-wider py-3 text-black hover:bg-gray-400/50 hover:delay-100'}>
                <div className={props.selector === props.contact ? 'text-black' : undefined} onClick={props.set}>
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