export default function UpdateProfile(){
    return(
        <form action="" className="bg-slate-50 rounded py-10 rounded-xl shadow shadow-xl text-black">
            <div className="flex flex-col justify-center items-center gap-5 w-100">
                <div className=" flex flex-col gap-2 w-80">
                    <p className="font-bold text-xl" >
                        Username
                    </p>
                    <input type="text" placeholder="username" className="bg-gray-200 px-6 py-3 rounded-full"/>
                </div>

                <div className=" flex flex-col gap-2 w-80">
                    <p className="font-bold text-xl" >
                        Email
                    </p>
                    <input type="text" placeholder="Email" className="bg-gray-200 px-6 py-3 rounded-full"/>
                </div>


                <div className=" flex flex-col gap-2 w-80">
                    <p className="font-bold text-xl" >
                        Password
                    </p>
                    <input type="text" placeholder="Password" className="bg-gray-200 px-6 py-3 rounded-full"/>
                </div>


                <div>
                    <button className="bg-neutral-900 text-white px-20 py-3 w-80 rounded-full">
                        Update
                    </button>
                </div>
            </div>
        </form>
    )
}