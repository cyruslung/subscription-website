import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import * as AuthService from "@/services/auth.service";
import UService from "@/services/user.service";
import IUser from '@/types/userType';
import EventBus from "@/components/features/EventBus";
import router from 'next/router';


function Header() {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [isNavCollapsed, setIsNavCollapsed] = useState(false);
	const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
	const [firstLogin, setfirstLogin] = useState(false);

	const [data, setData] = useState([]);
	const [isreload, setisreload] = useState(true);

	const logOut = () => {
		AuthService.logout();
		setCurrentUser(undefined);
		router.push('/signin');
	};

	useEffect(() => {
		const user = AuthService.getCurrentUser();
		if (user) {
			setCurrentUser(user);
			setfirstLogin(true);
			// router.push('/myAccount');
		}
		EventBus.on("logout", logOut);
		return () => {
			EventBus.remove("logout", logOut);
		};
	}, [firstLogin]);

	useEffect(() => {
		const fetchData = async () => {
			const result: any = await UService.getMember();
			if (result.data.isSuccess) {
				setData(result.data.result);
				setisreload(false);
			}
			console.log(result.data.result)
		};
		fetchData();
	}, [isreload]);

	return (
		<header>
			<nav className="flex items-center justify-between flex-wrap p-6 md:p-3 bg-neutral-900">
				<div className="container flex flex-wrap items-center justify-between mx-auto z-40">
					<div className="flex items-center flex-shrink-0 text-white mr-12">
						<Link href="/precisionX1" >
							<a className="flex items-center">
								<img width="150" src="/images/demo_logo.png" alt="" />
								{/* <svg xmlns="https://www.w3.org/2000/svg" width="150" height="33.264" viewBox="0 0 165 33.264"><path d="M.873,26.919a2.54,2.54,0,0,1,3.413-3.762h0a18.277,18.277,0,0,0,1.52,1.24,18.927,18.927,0,0,0,1.661,1.063,19.557,19.557,0,0,0,9.738,2.6h.006a19.977,19.977,0,0,0,6.783-1.209c.342-.122.7-.263,1.056-.415a18.117,18.117,0,0,0,4.774-2.962A2.536,2.536,0,0,1,33.151,27.3a23.181,23.181,0,0,1-6.124,3.8c-.415.177-.855.354-1.313.519A25.049,25.049,0,0,1,17.2,33.142h.012A24.64,24.64,0,0,1,4.939,29.868a23.771,23.771,0,0,1-2.082-1.356A24.453,24.453,0,0,1,.9,26.955l-.024-.037Zm1.551-7.725a2.421,2.421,0,1,1,0-4.843H17.962a2.424,2.424,0,0,1,0,4.849H2.424Zm1.862-8.885A2.54,2.54,0,0,1,.873,6.547h0l.018-.018a23.159,23.159,0,0,1,1.96-1.557A22.893,22.893,0,0,1,4.933,3.615,24.634,24.634,0,0,1,17.211.348h.006a25.075,25.075,0,0,1,8.511,1.527c.458.165.891.336,1.313.519a23.181,23.181,0,0,1,6.124,3.8,2.536,2.536,0,0,1-3.327,3.829,18.336,18.336,0,0,0-4.774-2.968c-.36-.153-.714-.293-1.056-.415a20,20,0,0,0-6.783-1.209h-.006a19.54,19.54,0,0,0-9.738,2.6A18.927,18.927,0,0,0,5.818,9.087a15.857,15.857,0,0,0-1.532,1.221ZM41.815,4.733a2.418,2.418,0,1,1,4.28-2.253L58.3,25.643,70.5,2.479a2.418,2.418,0,1,1,4.28,2.253L60.436,31.957c0,.006-.006.012-.012.018a.128.128,0,0,1-.024.037c0,.006-.006.006-.006.012a.153.153,0,0,1-.024.043c0,.006-.006.006-.006.012s-.018.031-.024.043a.006.006,0,0,1-.006.006.341.341,0,0,0-.031.049v.006a.214.214,0,0,0-.031.049h0a.214.214,0,0,0-.031.049h0c-.012.018-.024.031-.037.049h0c-.012.012-.024.031-.037.043h0a.265.265,0,0,0-.037.043l-.006.006a.266.266,0,0,0-.037.043.006.006,0,0,1-.006.006l-.037.037-.006.006a.282.282,0,0,1-.043.043l-.037.037-.006.006-.037.037a.006.006,0,0,0-.006.006c-.031.024-.055.049-.085.073h-.006c-.012.012-.031.024-.043.037h0a.338.338,0,0,1-.049.037h0c-.018.012-.031.024-.049.037h0a.214.214,0,0,1-.049.031h-.006a.341.341,0,0,1-.049.031.006.006,0,0,0-.006.006l-.043.024-.006.006-.043.024c-.006,0-.006.006-.012.006a.128.128,0,0,0-.037.024c-.006.006-.012.006-.018.012a2.477,2.477,0,0,1-.4.165A.021.021,0,0,0,59,33.16c-.006,0-.006,0-.012.006-.067.018-.134.037-.208.055h-.006l-.1.018h-.024a.6.6,0,0,1-.1.012h-.006c-.067.006-.134.012-.208.012h-.1a1.793,1.793,0,0,1-.311-.031H57.9l-.1-.018h-.006c-.018-.006-.031-.006-.049-.012h-.012c-.018-.006-.031-.006-.049-.012h-.012c-.031-.006-.067-.018-.1-.024H57.56c-.006,0-.012-.006-.018-.006-.031-.012-.061-.018-.1-.031-.006,0-.012-.006-.018-.006a.087.087,0,0,0-.037-.012l-.055-.018h0c-.006-.006-.018-.006-.024-.012s-.018-.006-.031-.012a.183.183,0,0,1-.049-.024h-.006c-.012-.006-.018-.012-.031-.012s-.012-.006-.024-.012A.134.134,0,0,1,57.139,33c-.006-.006-.012-.006-.018-.012a.128.128,0,0,1-.037-.024c-.073-.043-.14-.085-.208-.128h0a.461.461,0,0,1-.085-.067.006.006,0,0,1-.006-.006h0c-.012-.012-.031-.024-.043-.037h-.006c-.012-.012-.031-.024-.043-.037l-.006-.006a.265.265,0,0,0-.043-.037.006.006,0,0,1-.006-.006L56.6,32.6,56.6,32.6l-.037-.037-.006-.006-.037-.037-.006-.006-.037-.037a.006.006,0,0,0-.006-.006.265.265,0,0,1-.037-.043l-.006-.006a.265.265,0,0,1-.037-.043h0c-.012-.012-.024-.031-.037-.043h0c-.012-.018-.024-.031-.037-.049s-.024-.031-.037-.049h0c-.012-.018-.018-.031-.031-.049v-.006a.341.341,0,0,1-.031-.049.006.006,0,0,0-.006-.006c-.006-.012-.018-.031-.024-.043s-.006-.006-.006-.012-.018-.031-.024-.043-.006-.006-.006-.012l-.018-.037c0-.006-.006-.012-.006-.018l-.006-.012L41.815,4.733Zm15.752,28.4-.1-.031a.87.87,0,0,1,.1.031Zm-.153-.055-.055-.018.055.018Zm-.1-.043a.183.183,0,0,1-.049-.024l.049.024Zm25.526-6.119a2.54,2.54,0,0,1,3.413-3.762h0a18.277,18.277,0,0,0,1.52,1.24,18.926,18.926,0,0,0,1.661,1.063,19.557,19.557,0,0,0,9.738,2.6h.006a19.951,19.951,0,0,0,6.783-1.209c.342-.122.7-.263,1.056-.415a18.265,18.265,0,0,0,4.017-2.345V19.2H98.514a2.424,2.424,0,0,1,0-4.849h14.543a2.807,2.807,0,0,1,.391-.031,2.428,2.428,0,0,1,2.424,2.394v.031h0v7.884a2.535,2.535,0,0,1-.757,2.663,23.379,23.379,0,0,1-6.124,3.8c-.415.177-.855.354-1.313.519a25.075,25.075,0,0,1-8.511,1.527h-.006a24.64,24.64,0,0,1-12.278-3.273A23.771,23.771,0,0,1,84.8,28.507a24.454,24.454,0,0,1-1.96-1.557l-.006-.031Zm3.413-16.611a2.54,2.54,0,0,1-3.413-3.762h0l.018-.018a23.159,23.159,0,0,1,1.96-1.557A22.892,22.892,0,0,1,86.9,3.615,24.634,24.634,0,0,1,99.173.348h.006a25.075,25.075,0,0,1,8.511,1.527c.458.165.891.336,1.313.519a23.181,23.181,0,0,1,6.124,3.8,2.538,2.538,0,0,1-3.333,3.829,18.336,18.336,0,0,0-4.774-2.968c-.36-.153-.714-.293-1.056-.415A19.977,19.977,0,0,0,99.18,5.429h-.006a19.54,19.54,0,0,0-9.738,2.6,18.927,18.927,0,0,0-1.661,1.063,16.634,16.634,0,0,0-1.526,1.221Zm53.793,9.917a2.815,2.815,0,1,1-2.815,2.815,2.82,2.82,0,0,1,2.815-2.815Zm16.484,8.287L142.02,1.032h0c-.012-.018-.024-.031-.037-.049h0c-.012-.018-.024-.031-.037-.049h0c-.012-.012-.024-.031-.037-.043h0a.266.266,0,0,1-.037-.043l-.006-.006A.266.266,0,0,1,141.831.8l-.006-.006-.037-.037-.006-.006-.037-.037-.006-.006L141.7.672,141.7.666,141.66.629a.006.006,0,0,1-.006-.006c0-.012-.012-.024-.024-.037L141.623.58c-.012-.012-.031-.024-.043-.037h-.006c-.012-.012-.031-.024-.043-.037h0L141.525.5a1.041,1.041,0,0,1-.085-.067h0a1.67,1.67,0,0,0-.263-.159h0a.133.133,0,0,1-.031-.018c-.006-.006-.012-.006-.024-.012s-.018-.012-.031-.012-.018-.006-.024-.012-.018-.006-.024-.012S141.025.2,141.013.2s-.018-.006-.024-.012-.018-.006-.031-.012-.012-.006-.018-.006A.087.087,0,0,0,140.9.153c-.006,0-.012-.006-.018-.006h-.006L140.83.128a.088.088,0,0,0-.043-.012c-.006,0-.012-.006-.018-.006s-.006,0-.012-.006-.031-.006-.043-.012a.388.388,0,0,1-.043-.012h-.012c-.018-.006-.031-.006-.049-.012H140.6c-.018-.006-.031-.006-.049-.012h-.012l-.092-.018h-.031a.534.534,0,0,0-.1-.012h-.006A.918.918,0,0,0,140.1,0H140c-.067,0-.134.006-.208.012h0c-.031.006-.067.006-.1.012h-.031l-.1.018h-.006c-.018.006-.031.006-.049.012s-.037.006-.055.012h-.012c-.031.006-.055.018-.085.024-.012.006-.024.006-.037.012-.031.012-.061.018-.085.031-.006,0-.012.006-.018.006a2.3,2.3,0,0,0-.281.122c-.006,0-.012.006-.018.012a.128.128,0,0,0-.037.024c-.006,0-.006.006-.012.006a.153.153,0,0,0-.043.024l-.006.006-.043.024a.006.006,0,0,0-.006.006L138.723.4h-.006a.213.213,0,0,1-.049.031h0c-.018.012-.031.024-.049.037h0a.266.266,0,0,0-.043.037h0c-.012.012-.031.024-.043.037h-.006c-.031.024-.055.049-.085.073a.006.006,0,0,0-.006.006L138.4.653l-.006.006L138.357.7a.282.282,0,0,1-.043.043l-.006.006-.037.037a.006.006,0,0,1-.006.006.266.266,0,0,0-.037.043l-.006.006a.266.266,0,0,0-.037.043h0c-.012.012-.024.031-.037.043h0c-.012.018-.024.031-.037.049h0c-.012.018-.024.031-.037.049h0a.214.214,0,0,0-.031.049v.006a.34.34,0,0,0-.031.049.006.006,0,0,1-.006.006c-.006.012-.018.031-.024.043s-.006.006-.006.012-.018.031-.024.043-.006.006-.006.012l-.018.037c0,.006-.006.012-.012.018L123.576,28.519a2.418,2.418,0,1,0,4.28,2.253l12.2-23.163,12.2,23.163a2.412,2.412,0,1,0,4.261-2.26ZM140.707.092c.012.006.031.006.043.012l-.043-.012Zm.11.037.049.018-.049-.018Zm1.27,1,14.439,27.389L142.209,1.337c-.037-.067-.073-.14-.122-.214Z" fill="#fff" /><path d="M264.8,49.725a2.387,2.387,0,1,1,2.387-2.387,2.386,2.386,0,0,1-2.387,2.387Zm0-4.136a1.75,1.75,0,1,0,1.706,1.749A1.674,1.674,0,0,0,264.8,45.588Z" transform="translate(-102.185 -17.529)" fill="#fff" fillRule="evenodd" /><path d="M266.068,49.3l-.374-.933h-.2V49.3h-.681V46.8h1.117a.8.8,0,0,1,.853.8.7.7,0,0,1-.405.644l.466,1.043h-.773Zm-.233-1.939h-.344v.5h.344a.248.248,0,0,0,.264-.252A.256.256,0,0,0,265.835,47.358Z" transform="translate(-103.112 -18.243)" fill="#fff" fillRule="evenodd" /></svg> */}
							</a>
						</Link>
					</div>
					<div className="block lg:hidden">
						<button onClick={() => setIsNavOpen(!isNavOpen)} className="flex items-center px-3 py-2 rounded bg-neutral-400" >
							<svg className={`fill-current h-3 w-3 ${isNavOpen ? "hidden" : "block"}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" > <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /> </svg>
							<svg className={`fill-current h-3 w-3 ${isNavOpen ? "block" : "hidden"}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" > <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" /> </svg>
						</button>
					</div>
					<div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isNavOpen ? "block" : "hidden"}`} >
						<div className="text-sm text-white lg:flex-grow">
							<ul className="flex flex-col mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-neutral-900 md:bg-transparent border-neutral-700">
								<li>
									<Link href="/precisionX1">
										<a className="w-full block py-2 pl-3 pr-4 text-white rounded md:p-2 text-left text-base md:text-white bg-violet-600 md:bg-transparent cursor-pointer" aria-current="page"> Home </a>
									</Link>
								</li>
								<li>
									<Link href="/pricing">
										<a className="w-full block py-2 pl-3 pr-4 rounded md:border-0 md:p-2 text-left text-base text-neutral-400 md:hover:text-white hover:bg-neutral-700 hover:text-white md:hover:bg-transparent cursor-pointer"> Pricing </a>
									</Link>
								</li>
								<li className="relative group">
									<button onClick={() => setIsNavCollapsed(!isNavCollapsed)} className="w-full block py-2 pl-3 pr-4 rounded md:border-0 md:p-2 text-left text-base text-neutral-400 md:hover:text-white hover:bg-neutral-700 hover:text-neutral-400 md:hover:bg-transparent relative cursor-pointer after:absolute after:w-2 after:h-2 after:border-b-2 after:border-r-2 after:border-current after:rotate-45 after:right-4 md:after:left-14 after:top-1/2 after:-translate-y-1/2 " > Pages </button>
									<div className={`md:w-[200px] block relative font-medium lg:absolute top-full lg:top-[110%] left-0 rounded-sm lg:shadow-lg p-4 lg:block lg:opacity-0 lg:invisible group-hover:opacity-100 lg:group-hover:visible lg:group-hover:top-full bg-white transition-[top] duration-300 ${isNavCollapsed ? "block" : "hidden"}`} >
										<Link href="/signin">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > signin </a>
										</Link>
										<Link href="/resetPassword">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > resetPassword </a>
										</Link>
										<Link href="/forgotPassword">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > forgotPassword </a>
										</Link>
										<Link href="/productDetails">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > productDetails </a>
										</Link>
										<Link href="/precisionX1">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > precisionX1 </a>
										</Link>
										<Link href="/myAccount">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > myAccount </a>
										</Link>
										<Link href="/activationEmail">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > activationEmail </a>
										</Link>
										<Link href="/privacyPolicy">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > PrivacyPolicy </a>
										</Link>
										<Link href="/legalNotice">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > legalNotice </a>
										</Link>
										<Link href="/termsOfService">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > termsOfService </a>
										</Link>
										<Link href="/pricing">
											<a className="w-full text-left block text-sm text-neutral-900 hover:text-violet-700 py-2 px-2" > pricing </a>
										</Link>
									</div>
								</li>
							</ul>
						</div>
						<div className="sm:flex hidden z-40">
							{currentUser ? (
								<div className="flex">
									<div className=" text-base font-medium text-white py-2 px-4 flex items-center" >
										<div className="relative group">
											<div className='flex items-center'>
												<UserIcon width={20} className="mr-1 lg:group-hover:opacity-70" />
												<a className=" text-base font-medium lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white group-hover:text-violet-700 py-2 lg:py-2 lg:inline-flex lg:pl-0 lg:pr-4 flex mx-8 lg:mr-0 lg:ml-1 xl:ml-2 relative after:absolute after:w-2 after:h-2 after:border-b-2 after:border-r-2 after:border-current after:rotate-45 lg:after:right-0 after:right-1 after:top-1/2 after:-translate-y-1/2 after:mt-[-2px] " > Hi, {(data as any).firstName} </a>
											</div>
											<div className=" hidden relative lg:absolute w-[140px] top-full lg:top-[110%] left-0 rounded-sm lg:shadow-lg p-4 lg:block lg:opacity-0 lg:invisible group-hover:opacity-100 lg:group-hover:visible lg:group-hover:top-full bg-white transition-[top] duration-300 " >
												<Link href="/myAccount">
													<a className=" block text-sm text-neutral-900 rounded hover:text-violet-700 py-2 px-4" > My account </a>
												</Link>
												<button onClick={() => { logOut(); }} className=" block text-sm text-neutral-900 rounded hover:text-violet-700 py-2 px-4 " >
													LogOut
												</button>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div className="flex">
									<Link href="/signin" >
										<a className=" text-neutral-300 hover:text-white duration-300 ease-in-out cursor-pointer " >
											<UserCircleIcon width={30} />
										</a>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default React.memo(Header);