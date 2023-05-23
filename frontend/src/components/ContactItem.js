import React, { Fragment } from 'react';

const ContactItem = (props) => {
    return (
        <Fragment>
            <div className={props.selector === props.contact ? 'py-2 bg-blue-400 text-white' : undefined}>
                <div className={props.selector === props.contact ? 'px-3 text-white' : undefined} onClick={props.set}>
                    <div className='flex justify-between px-3'>
                        <div className=''>
                            <span className=''>{props.contact}</span>
                        </div>

                        <div className="">
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