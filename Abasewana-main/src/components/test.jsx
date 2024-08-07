// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useAuth } from "../config/Context";
// import * as yup from "yup";
// import '../index.css'
// import { Link } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { MdAlternateEmail } from 'react-icons/md';
// import { BiSolidLockAlt } from 'react-icons/bi';
// import { GoAlertFill,GoVerified } from 'react-icons/go';
// import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser } from 'react-icons/ai';
// import Transition from '../components/Transition';
// import { useEffect } from 'react';

// const schema = yup.object({
//     firstName: yup.string().required(),
//     lastName: yup.string().required(),
//     email: yup.string().required(),
//     password: yup.string().required(),
// }).required();

// export default function Test() {
//     const { register, handleSubmit, formState:{ errors } } = useForm({
//         resolver: yupResolver(schema)
//     });

//     const [visible , setVisible] = useState(false);
//     const { handleSignUp, popup, handleSignInWithGoogle,user } = useAuth();

//     const handleVisibility = () =>{
//         setVisible(prevStat => !prevStat)
//     }
//     const [showTransition, setShowTransition] = useState(true);

//     useEffect(() => {
//         window.scrollTo(0, 0);

//         const timeout = setTimeout(() => {
//         setShowTransition(false);
//         }, 3000);
//         return () => {
//         clearTimeout(timeout);
//         };
//     }, []);

//     return (
//         <div className="Form-container">
//              {showTransition && <Transition />}
//         <form className="form" onSubmit={handleSubmit(handleSignUp)}>
//             <div className="flex-column">
//                 <label>First Name </label>
//             </div>
//             <div className="inputForm">
//                 <span>
//                     <AiOutlineUser />
//                 </span>
//                 <input {...register("firstName", { required: true })}
//                         aria-invalid={errors.firstName ? "true" : "false"}
//                         placeholder="Enter Your First Name"  className="input"
//                 />
//             </div>
//                 {errors.firstName?.type === 'required'  && <p className="alert"><GoAlertFill /> First Name is required <GoAlertFill /></p>}

//             <div className="flex-column">
//                 <label>Last Name </label>
//             </div>
//             <div className="inputForm">
//                 <span>
//                     <AiOutlineUser />
//                 </span>
//                 <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
//                     className="input" placeholder="Enter Your Last Name"
//                 />
//             </div>
//             {errors.lastName?.type === 'required'  && <p className="alert"><GoAlertFill /> Last Name is required <GoAlertFill /></p>}

//             <div className="flex-column">
//                 <label>Email </label>
//             </div>
//             <div className="inputForm">
//                 <span>
//                     <MdAlternateEmail />
//                 </span>
//                 <input  type="email"
//                     {...register("email", { required: "Email Address is required" })}
//                     aria-invalid={errors.email ? "true" : "false"}
//                     placeholder="Enter Your Email" className="input"
//                 />
//             </div>
//             {errors.email?.type === 'required'  && <p className="alert"><GoAlertFill /> Email is required <GoAlertFill /></p>}

//             <div className="flex-column">
//                 <label>Password </label>
//             </div>
//                 <div className="inputForm">
//                     <span>
//                         <BiSolidLockAlt />
//                     </span>
//                     <input
//                         type={visible? "text" : "password"}
//                         {...register("password", { required: "Password is required" })}
//                         aria-invalid={errors.password ? "true" : "false"}
//                         placeholder="Enter Your Password"
//                         className="input"
//                     />
//                     <span className="Eye" onClick={handleVisibility}>
//                         {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
//                             }
//                     </span>
//             </div>
//             {errors.password?.type === 'required'  && <p className="alert"><GoAlertFill /> Password is required <GoAlertFill /></p>}

//             <button className="button-submit" type="submit">Sign In</button>

//             <p className="p">Already have an account?
//                 <Link to='/login'>
//                     <span className="span">Login</span>
//                 </Link>
//             </p>
//             <p className="p line">Or</p>

//             <div className="flex-row">
//                 <button className="btn google" onClick={handleSignInWithGoogle}>
//                 <FcGoogle /> Sign In with Google
//                 </button>
//             </div>

//         </form>
//             {popup && (
//                 <div className="popup">
//                     <GoVerified /> <p> Welcome! You have successfully signed up</p>
//                 </div>
//             )}
//         </div>
//     );
// }
